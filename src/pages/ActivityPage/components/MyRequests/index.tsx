import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IonModal } from '@ionic/react';
import { VerificationService } from 'src/services/verification.service';
import { TuumTechScriptService } from 'src/services/script.service';

import SelectedVerificationContent, {
  SelectedVerificationModal
} from './SelectedVerification';
import NewVerification from './NewVerification';
import SentModalContent, { SentModal } from './SentModal';
import UserRows from './UserRows';
import TopInfo from './TopInfo';

export const PageContainer = styled.div`
  padding: 0 20px 20px 20px;
`;

export const PageContent = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 1px rgba(12, 26, 75, 0.24),
    0px 3px 8px -1px rgba(50, 50, 71, 0.05);
  border-radius: 16px;
  padding: 17px 20px;
`;

const NewVerificationModal = styled(IonModal)`
  --border-radius: 16px;
  --width: 1100px;
  --height: 678px;
  :host(.modal-card) ion-header ion-toolbar:first-of-type {
    padding: 0px;
  }
`;

interface Props {
  session: ISessionItem;
  closeNewVerificationModal: () => void;
  showNewVerificationModal: boolean;
}

const MyRequests: React.FC<Props> = ({
  session,
  closeNewVerificationModal,
  showNewVerificationModal
}: Props) => {
  const [showSentModal, setShowSentModal] = useState(false);
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const [selectedVerification, setSelectVerification] = useState<any>(null);

  const sendReuqest = async (
    dids: string[],
    credentials: VerificationData[]
  ) => {
    const vService = new VerificationService();
    await vService.sendRequest(session.did, dids, credentials);
    closeNewVerificationModal();
    setShowSentModal(true);
  };

  useEffect(() => {
    (async () => {
      const requests_by_me: Verification[] = await TuumTechScriptService.getVerifications(
        session.did,
        true
      );
      setVerifications(requests_by_me);
    })();
  }, [session.did]);

  return (
    <PageContainer>
      <TopInfo verificationStatus={verifications.map((v: any) => v.status)} />

      <PageContent>
        <UserRows
          session={session}
          verifications={verifications}
          setSelectVerification={setSelectVerification}
        />
      </PageContent>
      <NewVerificationModal
        isOpen={showNewVerificationModal}
        cssClass="my-custom-class"
        backdropDismiss={false}
      >
        <NewVerification
          session={session}
          onClose={closeNewVerificationModal}
          targetUser={session}
          sendRequest={sendReuqest}
        />
      </NewVerificationModal>

      <SentModal
        isOpen={showSentModal}
        cssClass="my-custom-class"
        backdropDismiss={false}
      >
        <SentModalContent
          onClose={() => {
            setShowSentModal(false);
          }}
        />
      </SentModal>
      <SelectedVerificationModal
        isOpen={selectedVerification !== null}
        onDidDismiss={() => setSelectVerification(null)}
      >
        {selectedVerification !== null && (
          <SelectedVerificationContent
            verification={selectedVerification.verification}
            user={selectedVerification.user}
          />
        )}
      </SelectedVerificationModal>
    </PageContainer>
  );
};

export default MyRequests;
