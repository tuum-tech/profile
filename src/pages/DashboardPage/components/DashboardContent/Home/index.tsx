import React, { useEffect, useState } from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';

import SpotlightCard from 'src/components/cards/SpotlightCard';
import BadgesCard from 'src/components/cards/BadgesCard';
import ButtonWhite from 'src/components/buttons/ButtonWhite';
import AboutCard from 'src/components/cards/AboutCard';
import ExperienceCard from 'src/components/cards/ExperienceCard';
import EducationCard from 'src/components/cards/EducationCard';
import ProfileCompletionCard from 'src/components/cards/ProfileCompletionCard';

import ManageProfile from './Left/ManageProfile';
import ExploreConnnections from './Left/ExploreConnnections';
import ManageLinks from './Left/ManageLinks';
import BeginnersTutorial from './Left/BeginnersTutorial';

import WhatIsProfile from './RightContent/WhatIsProfile';
import ConnectWithCommunity from './RightContent/ConnectWithCommunity';
import ProfileCompletion from './RightContent/ProfileCompletion';
import VerificationStatus from './RightContent/VerificationStatus';

import style from './style.module.scss';

export interface DashboardProps {
  onTutorialStart: () => void;
  profile: ProfileDTO;
  sessionItem: ISessionItem;
}

const DashboardHome: React.FC<DashboardProps> = ({
  onTutorialStart,
  profile,
  sessionItem
}) => {
  const [tutorialVisible, setTutorialVisible] = useState(true);

  useEffect(() => {
    setTutorialVisible(sessionItem.tutorialStep !== 4);
  }, [sessionItem]);

  const getTutorialButton = () => {
    return (
      <div>
        <br />{' '}
        <ButtonWhite onClick={() => onTutorialStart()}>
          {sessionItem.tutorialStep ? 'Continue' : 'Start'} beginners tutorial (
          {sessionItem.tutorialStep ? sessionItem.tutorialStep : 1} / 4)
        </ButtonWhite>
      </div>
    );
  };

  return (
    <IonGrid className={style['tab-grid']}>
      <IonRow>
        <IonCol size="8">
          {/* {profile && profile.basicDTO && (
            <AboutCard aboutText={profile.basicDTO.about || ''} />
          )}
          {profile && profile.experienceDTO && (
            <ExperienceCard experienceDTO={profile.experienceDTO} />
          )}
          {profile && profile.educationDTO && (
            <EducationCard educationDTO={profile.educationDTO} />
          )} */}
          {tutorialVisible && (
            <BeginnersTutorial
              onTutorialStart={onTutorialStart}
              tutorialStep={sessionItem.tutorialStep}
            />
          )}

          <ManageProfile />
          <ExploreConnnections />
          <ManageLinks />
        </IonCol>
        <IonCol size="4">
          <VerificationStatus />
          <ProfileCompletion />
          <WhatIsProfile />
          <ConnectWithCommunity />

          {/* {tutorialVisible && (
            <SpotlightCard
              title="Welcome to Profile"
              content="To get you familiar with the platform, you can start the tutorial that
        will take you through some basics of DID and Hive Vaults. You must complete this tutorial before your profile is ready."
              component={getTutorialButton()}
            />
          )} */}
          {/* <ProfileCompletionCard title="Profile Completion" />
          <BadgesCard title="Badges" /> */}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default DashboardHome;
