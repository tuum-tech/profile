/**
 * Page
 */
import React, { useEffect, useState } from 'react';
import {
  Redirect,
  RouteComponentProps,
  useHistory,
  StaticContext
} from 'react-router';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectSession } from 'src/store/users/selectors';
import { setSession } from 'src/store/users/actions';
import { TokenResponse, LocationState, InferMappedProps } from './types';
import { SubState } from 'src/store/users/types';

import { AccountType, UserService } from 'src/services/user.service';
import LoadingIndicator from 'src/elements/LoadingIndicator';

import { requestGithubToken, getUsersWithRegisteredGithub } from './fetchapi';
import { DidService } from 'src/services/did.service.new';
import { ProfileService } from 'src/services/profile.service';
import { DidcredsService, CredentialType } from 'src/services/didcreds.service';
import { DID, DIDDocument } from '@elastosfoundation/did-js-sdk/';
import { EssentialsService } from 'src/services/essentials.service';

interface PageProps
  extends InferMappedProps,
    RouteComponentProps<{}, StaticContext, LocationState> {}

const GithubCallback: React.FC<PageProps> = ({
  eProps,
  ...props
}: PageProps) => {
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    name: '',
    loginCred: {
      github: ''
    }
  });
  const getToken = async (code: string): Promise<TokenResponse> => {
    return (await requestGithubToken(code)) as TokenResponse;
  };

  let code: string =
    new URLSearchParams(props.location.search).get('code') || '';

  useEffect(() => {
    (async () => {
      let didService = await DidService.getInstance();
      if (code !== '' && credentials.loginCred.github === '') {
        let t = await getToken(code);
        let github = t.data.login;

        if (props.session && props.session.did !== '') {
          let verifiableCredential = await DidcredsService.generateVerifiableCredential(
            props.session.did,
            CredentialType.Github,
            github
          );

          let didDocument: DIDDocument = await didService.getStoredDocument(
            new DID(props.session.did)
          );

          let documentWithGithubCredential: DIDDocument;

          if (props.session.mnemonics === '') {
            let essentialsService = new EssentialsService(didService);
            let isAdded = await essentialsService.addVerifiableCredentialEssentials(
              verifiableCredential
            );

            if (!isAdded) {
              window.close();
              return;
            }

            documentWithGithubCredential = await didService.getPublishedDocument(
              new DID(props.session.did)
            );
          } else {
            documentWithGithubCredential = await didService.addVerifiableCredentialToDIDDocument(
              didDocument,
              verifiableCredential
            );
          }

          await didService.storeDocument(documentWithGithubCredential);
          await DidcredsService.addOrUpdateCredentialToVault(
            props.session,
            verifiableCredential
          );

          let newSession = JSON.parse(JSON.stringify(props.session));
          newSession.loginCred!.github! = github;
          if (!newSession.badges!.socialVerify!.github.archived) {
            newSession.badges!.socialVerify!.github.archived = new Date().getTime();
            await ProfileService.addActivity(
              {
                guid: '',
                did: newSession.did,
                message: 'You received a Github verfication badge',
                read: false,
                createdAt: 0,
                updatedAt: 0
              },
              newSession.did
            );
          }
          let userService = new UserService(didService);
          eProps.setSession({
            session: await userService.updateSession(newSession)
          });

          window.close();
        } else {
          let prevUsers = await getUsersWithRegisteredGithub(github);
          if (prevUsers.length > 0) {
            history.push({
              pathname: '/associated-profile',
              state: {
                users: prevUsers,
                name: github,
                loginCred: {
                  github: github
                },
                service: AccountType.Github
              }
            });
          } else {
            setCredentials({
              name: github,
              loginCred: {
                github: github
              }
            });
          }
        }
      }
    })();
  });

  const getRedirect = () => {
    if (credentials.loginCred.github !== '') {
      return (
        <Redirect
          to={{
            pathname: '/generate-did',
            state: {
              name: credentials.name,
              service: AccountType.Github,
              loginCred: credentials.loginCred
            }
          }}
        />
      );
    }
    return <LoadingIndicator />;
  };
  return getRedirect();
};

export const mapStateToProps = createStructuredSelector<SubState, SubState>({
  session: makeSelectSession()
});

export function mapDispatchToProps(dispatch: any) {
  return {
    eProps: {
      setSession: (props: { session: ISessionItem }) =>
        dispatch(setSession(props))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GithubCallback);
