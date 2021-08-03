/**
 * Page
 */

import React, { useState, useEffect } from 'react';
import { Redirect, RouteComponentProps, Link } from 'react-router-dom';

import {
  OnBoardLayout,
  OnBoardLayoutLeft,
  OnBoardLayoutLeftContent,
  OnBoardLayoutLeftContentTitle,
  OnBoardLayoutLeftContentDescription,
  OnBoardLayoutLeftContentIntro,
  OnBoardLayoutRight,
  OnBoardLayoutRightContent,
  OnBoardLayoutRightContentTitle
} from 'src/components/layouts/OnBoardLayout';
import { ArrowButton, ButtonLink, SignInButton } from 'src/elements/buttons';
import { Text16 } from 'src/elements/texts';
import { AccountType } from 'src/services/user.service';

import { requestEmailVerifyCode } from './fetchapi';
import style from './style.module.scss';

interface MatchParams {
  code: string;
}

const VerifyEmailPage: React.FC<RouteComponentProps<MatchParams>> = (
  props: RouteComponentProps<MatchParams>
) => {
  let code: string = props.match.params.code;
  const [status, setStatus] = useState('');
  const [credentials, setCredentials] = useState({
    loginCred: {
      email: ''
    },
    name: '',
    credential: ''
  });

  useEffect(() => {
    (async () => {
      let response = (await requestEmailVerifyCode(
        code
      )) as IVerifyCodeResponse;
      if (response.data.return_code === 'CODE_CONFIRMED') {
        const { name, email } = response.data;
        setCredentials({
          name,
          loginCred: {
            email
          },
          credential: code
        });
      }
      setStatus(response.data.return_code);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRedirect = () => {
    if (status === '') {
      return (
        <OnBoardLayout className={style['create-profile']}>
          <OnBoardLayoutLeft>
            <OnBoardLayoutLeftContent>
              <OnBoardLayoutLeftContentTitle className="mt-18px">
                Checking things...
              </OnBoardLayoutLeftContentTitle>
              <OnBoardLayoutLeftContentDescription className="mt-25px">
                Will take a moment
              </OnBoardLayoutLeftContentDescription>

              <ButtonLink width={26} to="/sign-did">
                <ArrowButton />
              </ButtonLink>
            </OnBoardLayoutLeftContent>
          </OnBoardLayoutLeft>
          <OnBoardLayoutRight>
            <OnBoardLayoutRightContent>Loading</OnBoardLayoutRightContent>
          </OnBoardLayoutRight>
        </OnBoardLayout>
      );
    }
    if (status === 'CODE_CONFIRMED') {
      return (
        <Redirect
          to={{
            pathname: '/generate-did',
            state: {
              name: credentials.name,
              loginCred: {
                email: credentials.loginCred.email
              },
              service: AccountType.Email,
              credential: credentials.credential
            }
          }}
        />
      );
    } else
      return (
        <OnBoardLayout className={style['create-profile']}>
          <OnBoardLayoutLeft>
            <OnBoardLayoutLeftContent>
              <OnBoardLayoutLeftContentTitle className="mt-18px">
                A better way to be online.
              </OnBoardLayoutLeftContentTitle>
              <OnBoardLayoutLeftContentDescription className="mt-25px">
                Having multiple profiles is messy. Your personal information is
                copied and stored on every app. Profile gives you total control
                of your digital world, in one place. Finally unlock the power of
                your content online.
              </OnBoardLayoutLeftContentDescription>
              <OnBoardLayoutLeftContentIntro className="mt-25px mb-0">
                Already have a profile?
              </OnBoardLayoutLeftContentIntro>
              <SignInButton width={120} to="/sign-did">
                Sign in Here
              </SignInButton>
            </OnBoardLayoutLeftContent>
          </OnBoardLayoutLeft>
          <OnBoardLayoutRight>
            <OnBoardLayoutRightContent>
              <OnBoardLayoutRightContentTitle>
                Something is wrong! {code}
              </OnBoardLayoutRightContentTitle>
              <Text16 style={{ marginBottom: '54px' }}>
                The verification code is not right or is expired. Let's try
                again <Link to="/create-profile">here</Link>
              </Text16>
            </OnBoardLayoutRightContent>
          </OnBoardLayoutRight>
        </OnBoardLayout>
      );
  };

  return getRedirect();
};

export default VerifyEmailPage;
