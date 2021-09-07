import React, { useState, useEffect } from 'react';
import { IonRow, IonCol, IonButton } from '@ionic/react';

import TimeLine from './TimeLine';
import { VerificationService } from 'src/services/verification.service';
import {
  ProfileService,
  defaultUserInfo,
  defaultFullProfile
} from 'src/services/profile.service';
import UsersView from './steps/step2';
import CredentialView from './steps/step1';
import style from './style.module.scss';
import shield from '../../../../../assets/icon/shield.png';
// VerificationService

interface Props {
  session: ISessionItem;
  targetUser: ISessionItem;
  onClose: () => void;
}

const NewVerificationModal: React.FC<Props> = ({
  session,
  onClose,
  targetUser
}: Props) => {
  const [step, setStep] = useState(1);
  const [categories, setCateogries] = useState<VerificationData[]>([]);
  const [credentials, setCredentials] = useState<VerificationData[]>([]);
  const [selectedDids, setSelectedDids] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (session && session.did) {
        setLoading(true);
        let profile = await ProfileService.getFullProfile(session.did, session);
        if (profile) {
          const vService = new VerificationService();
          const cates = vService.retrieveUsersVerificationCategories(
            profile,
            session
          );
          setCateogries(cates);
        }
        setLoading(false);
      }
    })();
  }, [session]);

  const renderRightContents = () => {
    if (categories.length === 0) {
      return <p>You have no credentials</p>;
    }
    if (step === 1) {
      return (
        <CredentialView
          session={session}
          categories={categories}
          credentials={credentials}
          setCredentials={setCredentials}
        />
      );
    }
    if (step === 2) {
      return (
        <UsersView
          session={session}
          selectedDids={selectedDids}
          updateSelectedUserDids={setSelectedDids}
        />
      );
    }
  };

  return (
    <div className={style['verification-modal']}>
      <IonRow>
        <IonCol size="5" className={style['col-left']}>
          <img alt="shield" src={shield} />
          <h2>New verification request</h2>
          <p>
            Get your credentials verified by experts, friends or individuals
          </p>
          <div className={style['verification-left-bottom']}>
            <TimeLine step={step} />
            <IonButton
              onClick={onClose}
              className={style['verification-quit-button']}
            >
              Close
            </IonButton>
          </div>
        </IonCol>
        <IonCol className={style['verification-col-right']} size="7">
          {loading && <p>Loading...</p>}
          {!loading && renderRightContents()}
        </IonCol>
      </IonRow>
    </div>
  );
};

export default NewVerificationModal;
