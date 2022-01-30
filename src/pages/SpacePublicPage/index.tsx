import { DIDDocument } from '@elastosfoundation/did-js-sdk/';
import { IonGrid, IonContent, IonCol } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import React, { useEffect, useRef, useState } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectSession } from 'src/store/users/selectors';
import { setSession } from 'src/store/users/actions';
import { InferMappedProps, SubState } from './types';

import {
  ProfileService,
  defaultUserInfo,
} from 'src/services/profile.service';
import { UserService } from 'src/services/user.service';
import { DidDocumentService } from 'src/services/diddocument.service';
import { DidService } from 'src/services/did.service.new';

import LoadingIndicator from 'src/elements/LoadingIndicator';
import ProfileComponent from './components/ProfileComponent';
import Navbar from './components/Navbar';

import { getDIDString } from 'src/utils/did';

import { ContentRow, Container, ProfileComponentContainer } from './layouts';
import { defaultSpace, SpaceService } from 'src/services/space.service';
import { SpaceSvg } from 'src/components/layouts/LeftSideMenu/components/icons';

interface MatchParams {
  did: string;
  name: string;
}
interface PageProps
  extends InferMappedProps,
    RouteComponentProps<MatchParams> {}

const PublicPage: React.FC<PageProps> = ({ eProps, ...props }: PageProps) => {
  let did: string = getDIDString(props.match.params.did, false);
  let spaceName: string = props.match.params.name;
  const [publicUser, setPublicUser] = useState(defaultUserInfo);
  const [spaceProfile, setSpaceProfile] = useState(defaultSpace);
  const [scrollTop, setScrollTop] = useState(0);
  const [loading, setLoading] = useState(false);

  const contentRef = useRef<HTMLIonContentElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  const scrollToElement = (cardName: string) => {
    let point: number = 0;
    let adjust = 0;
    if (scrollTop < 176) adjust = 292 - scrollTop;
    else {
      adjust = 260 - scrollTop;
    }

    if (cardName === 'about') {
      point = 0;
    }
    contentRef.current && contentRef.current.scrollToPoint(0, point, 200);
  };

  useEffect(() => {
    (async () => {
      let userService = new UserService(await DidService.getInstance());

      setLoading(true);

      let pUser = await userService.SearchUserWithDID(did);
      if (pUser && pUser.did) {
        setPublicUser(pUser as any);
        const spaces = await SpaceService.getSpaceByNames(pUser, [spaceName]);
        if (spaces.length > 0) {
          setSpaceProfile(spaces[0]);
        }
      }

      setLoading(false);
    })();
  }, [did, spaceName, props.session]);

  if (loading) {
    return <LoadingIndicator loadingText="Loading data..." />;
  }

  return (
    <Container>
      <IonGrid className="profilepagegrid ion-no-padding">
        <IonContent
          ref={contentRef}
          scrollEvents={true}
          onIonScroll={(e: any) => {
            setScrollTop(e.detail.scrollTop);
          }}
        >
          <Navbar signedIn={props.session && props.session.did !== ''} />
          <ContentRow
            className="ion-justify-content-around"
            template={publicUser.pageTemplate || 'default'}
          >
            <IonCol size="9" className="ion-no-padding">
              <ProfileComponentContainer>
                <ProfileComponent
                  scrollToElement={scrollToElement}
                  aboutRef={aboutRef}
                  publicUser={publicUser}
                  profile={spaceProfile}
                  loading={loading}
                />
              </ProfileComponentContainer>
            </IonCol>
          </ContentRow>
        </IonContent>
      </IonGrid>
    </Container>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicPage);
