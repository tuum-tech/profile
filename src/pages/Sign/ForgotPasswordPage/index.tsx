/**
 * Page
 */

import React from 'react';

import {
  OnBoardLayout,
  OnBoardLayoutLeft,
  OnBoardLayoutLeftContent,
  OnBoardLayoutLeftContentTitle,
  OnBoardLayoutLeftContentDescription,
  OnBoardLayoutLeftContentIntro,
  OnBoardLayoutLogo,
  OnBoardLayoutRight,
  OnBoardLayoutRightContent,
  OnBoardLayoutRightContentTitle,
  WavingHandImg,
} from 'src/components/layouts/OnBoardLayout';
import ArrowButton from 'src/elements/buttons/ArrowButton';
import ButtonWithLogo from 'src/elements/buttons/ButtonWithLogo';

import whitelogo from '../../../assets/logo/whitetextlogo.png';
import weird from '../../../assets/icon/weird.png';

import style from './style.module.scss';

const CreateProfile: React.FC = () => {
  return (
    <OnBoardLayout className={style['associated-profile']}>
      <OnBoardLayoutLeft>
        <OnBoardLayoutLogo src={whitelogo} />
        <OnBoardLayoutLeftContent>
          <WavingHandImg src={weird} />
          <OnBoardLayoutLeftContentTitle className='mt-18px'>
            Forgot password?
          </OnBoardLayoutLeftContentTitle>
          <OnBoardLayoutLeftContentDescription className='mt-25px'>
            There is no way we can help. This is a decentralized platform and
            you need to be responsible for your password and security words.
          </OnBoardLayoutLeftContentDescription>
          <OnBoardLayoutLeftContentDescription className='mt-25px'>
            You have three options, go see if you can find your profile password
            and go back and enter the password, or sign in to profile as normal
            (if you know your main security passwords, or create a new profile.
          </OnBoardLayoutLeftContentDescription>
          <OnBoardLayoutLeftContentIntro className='my-25px'>
            Why has this happened? Help
          </OnBoardLayoutLeftContentIntro>
          <ArrowButton />
        </OnBoardLayoutLeftContent>
      </OnBoardLayoutLeft>
      <OnBoardLayoutRight>
        <OnBoardLayoutRightContent>
          <OnBoardLayoutRightContentTitle style={{ paddingTop: '110px' }}>
            Sign in
          </OnBoardLayoutRightContentTitle>
          <ButtonWithLogo
            mode='dark'
            mt={32}
            text='Sign in to profile'
            onClick={() => {}}
          />

          <OnBoardLayoutRightContentTitle style={{ marginTop: '96px' }}>
            Create new profile
          </OnBoardLayoutRightContentTitle>
          <ButtonWithLogo
            text='Create new profile'
            onClick={() => {}}
            mt={48}
          />
        </OnBoardLayoutRightContent>
      </OnBoardLayoutRight>
    </OnBoardLayout>
  );
};

export default CreateProfile;
