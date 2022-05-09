import React, { useState, useEffect } from 'react';
import { IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import Blockies from 'react-blockies';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { showNotify } from 'src/utils/notify';

import {
  CloseButton,
  ManagerButton,
  ManagerModal,
  ManagerModalTitle,
  ManagerModalFooter,
  MyGrid,
  CardOverview,
  LinkStyleSpan,
  CardHeaderContent,
  CardContentContainer,
  ProfileItem
} from '../common';
import { verifyWalletOwner } from './function';
import {
  VerifiableCredential,
  DIDDocument,
  DID
} from '@elastosfoundation/did-js-sdk/';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { BadgesAtom, DIDDocumentAtom, CallbackFromAtom } from 'src/Atoms/Atoms';
import { CredentialType, DidcredsService } from 'src/services/didcreds.service';
import { ProfileService } from 'src/services/profile.service';
import { shortenAddress } from 'src/utils/web3';
import { injected } from 'src/constant';
import style from './WalletCard.module.scss';

import defaultIcon from '../../../assets/icon/profile-bag-blue.svg';
import shieldIcon from '../../../assets/icon/shield.svg';
import copyIcon from '../../../assets/icon/copy-to-clipboard.svg';
import { UserService } from 'src/services/user.service';
import { DidService } from 'src/services/did.service.new';
import { VerificationService } from 'src/services/verification.service';

interface IWalletProps {
  setRequestEssentials: (item: boolean) => void;
  isEditable?: boolean;
  template?: string;
  userSession: ISessionItem;
}

const WalletCard: React.FC<IWalletProps> = ({
  setRequestEssentials,
  isEditable = false,
  template = 'default',
  userSession
}: IWalletProps) => {
  const { account, library, activate } = useWeb3React();

  ////////////////////////////// ***** ////////////////////////////////////
  const [adding, setAdding] = useState(false);
  const [selectedWalletType, setSelectedWalletType] = useState<CredentialType>(
    CredentialType.ETHAddress
  );
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isRemovingVc, setIsRemovingVc] = useState(false);
  const setBadges = useSetRecoilState(BadgesAtom);
  const [didDocument, setDidDocument] = useRecoilState(DIDDocumentAtom);
  const walletCredentials = [
    {
      name: 'escaddress',
      display: 'ESC Address',
      credential: undefined,
      icon: defaultIcon
    },
    {
      name: 'ethaddress',
      display: 'ETH Address',
      credential: undefined,
      icon: defaultIcon
    }
  ];
  const [credentials, setCredentials] = useState<
    {
      name: string;
      display: string;
      credential: VerifiableCredential | undefined;
      icon: string;
    }[]
  >(walletCredentials);

  useEffect(() => {
    (async () => {
      await getCredentials(userSession);
      let userService = new UserService(await DidService.getInstance());

      let user: ISessionItem = await userService.SearchUserWithDID(
        userSession.did
      );
      setBadges(user?.badges as IBadges);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didDocument]);

  const forceUpdateDidDocument = async () => {
    let updatedDidDocument: DIDDocument = (await DID.from(
      userSession.did
    )?.resolve(true)) as DIDDocument;
    setDidDocument(updatedDidDocument.toString());
  };

  const getCredentials = async (sessionItem: ISessionItem) => {
    let credsFromDidDocument: any[] = [];
    try {
      let allCreds = await DidcredsService.getAllCredentialsToVault(
        sessionItem
      );
      credsFromDidDocument = Array.from(allCreds.values());
      let newCredentials = credentials.map(item => {
        item.credential = credsFromDidDocument.find(
          cred => cred.id.getFragment() === item.name
        );
        return item;
      });
      setCredentials(newCredentials);
    } catch (error) {
      console.error('Error getting credentials from vault', error);
    }
  };

  ////////////////////////////// ***** ////////////////////////////////////
  useEffect(() => {
    if (account && adding) {
      (async () => {
        const web3 = new Web3(library);
        const verifyStatus = await verifyWalletOwner(web3, account);
        if (!verifyStatus) {
          showNotify('Wallet owner verification failed', 'error');
          return;
        }
        if (userSession.isEssentialUser) setRequestEssentials(true);
        let newVC = await DidcredsService.generateVerifiableCredential(
          userSession.did,
          selectedWalletType.toLowerCase(),
          account
        );
        if (userSession.isEssentialUser) {
          let vService = new VerificationService();
          await vService.importCredential(newVC);
        }
        try {
          await DidcredsService.addOrUpdateCredentialToVault(
            userSession,
            newVC
          );
        } catch (error) {
          console.error('Error getting credentials from vault', error);
        }
        if (userSession.isEssentialUser) setRequestEssentials(false);
        setAdding(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, adding]);

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const updateSession = async (key: string) => {
    try {
      await ProfileService.addActivity(
        {
          guid: '',
          did: userSession.did,
          message: `You updated ${key} wallet`,
          read: false,
          createdAt: 0,
          updatedAt: 0
        },
        userSession
      );
    } catch (err) {
      console.log('error======>', err);
    }
  };

  const addVc = async (type: CredentialType) => {
    setSelectedWalletType(type);
    setAdding(true);
    if (!account) {
      connectWallet();
    }
    var timer = setInterval(async function() {
      //clearInterval(timer);

      //if (sessionItem.isEssentialUser) await forceUpdateDidDocument();
      await getCredentials(userSession);
    }, 2000);
    updateSession(type);
  };

  const removeVc = async (key: string) => {
    setIsRemovingVc(true);

    var timer = setInterval(async function() {
      //clearInterval(timer);

      //if (sessionItem.isEssentialUser) await forceUpdateDidDocument();
      await getCredentials(userSession);
    }, 2000);

    let vcId = userSession.did + '#' + key.toLowerCase();
    if (userSession.isEssentialUser) {
      let vService = new VerificationService();
      await vService.deleteCredentials(vcId);
    }
    try {
      await DidcredsService.removeCredentialToVault(userSession, vcId);
    } catch (error) {
      console.error('Error getting credentials from vault', error);
    }

    setIsRemovingVc(false);
    updateSession(key);
  };

  const parseValueFromKey = (
    key: string,
    credential: VerifiableCredential
  ): string => {
    let value = credential.subject.getProperty(key);
    return value;
  };

  const walletEditItem = (type: CredentialType) => {
    let vc;
    credentials
      .filter(item => item.credential !== undefined)
      ?.map(credentialItem => {
        if (credentialItem.credential?.id.getFragment() === type.toLowerCase())
          vc = credentialItem.credential;
      });
    //vc = didDoc?.getCredential(type.toLowerCase());
    if (!vc) {
      return (
        <div className={style['manage-links-item']}>
          <Blockies seed={type} size={50} scale={1} />
          <div className={style['manage-links-header']}>{type}</div>
          <ManagerButton onClick={() => addVc(type)}>Add</ManagerButton>
        </div>
      );
    }
    const address = parseValueFromKey(type.toLowerCase(), vc);
    return (
      <div className={style['manage-links-item']}>
        <Blockies seed={type} size={50} scale={1} />
        <div className={style['manage-links-header']}>
          {type}
          <p className={style['manage-links-detail']}>
            {shortenAddress(address)}
            <CopyToClipboard text={address}>
              <img
                alt=""
                className={style['copy-to-clipboard']}
                src={copyIcon}
                width={15}
              />
            </CopyToClipboard>
          </p>
        </div>
        <ManagerButton disabled={isRemovingVc} onClick={() => removeVc(type)}>
          Remove
        </ManagerButton>
      </div>
    );
  };

  const containsVerifiedCredential = (key: string): boolean => {
    let vc;
    credentials
      .filter(item => item.credential !== undefined)
      ?.map(credentialItem => {
        if (credentialItem.credential?.id.getFragment() === key.toLowerCase())
          vc = credentialItem.credential;
      });
    //const vc = didDoc?.getCredential(key);
    return !!vc;
  };

  const walletViewItem = (type: CredentialType) => {
    let vc;
    credentials
      .filter(item => item.credential !== undefined)
      ?.map(credentialItem => {
        if (credentialItem.credential?.id.getFragment() === type.toLowerCase())
          vc = credentialItem.credential;
      });
    //let vc = didDoc?.getCredential(type.toLowerCase());
    if (!vc) return <></>;
    const address = parseValueFromKey(type.toLowerCase(), vc);
    return (
      <ProfileItem template={template}>
        <div className="left">
          <Blockies seed={type} size={50} scale={1} />
          {
            <img
              alt="shield icon"
              src={shieldIcon}
              className="social-profile-badge"
              height={15}
            />
          }
        </div>
        <div className="right">
          <p className="social-profile-network">{type}</p>
          <span className="social-profile-id">{shortenAddress(address)}</span>
          <CopyToClipboard text={address}>
            <img
              className="copy-to-clipboard"
              src={copyIcon}
              width={15}
              alt="copy to clipboard"
            />
          </CopyToClipboard>
        </div>
      </ProfileItem>
    );
  };

  return (
    <>
      <CardOverview template={template}>
        <CardHeaderContent>
          <IonGrid className="ion-no-padding">
            <IonRow className="ion-justify-content-between ion-no-padding">
              <IonCol className="ion-no-padding">
                <IonCardTitle>Wallets</IonCardTitle>
              </IonCol>
              {isEditable ? (
                <IonCol size="auto" className="ion-no-padding">
                  <LinkStyleSpan onClick={e => setIsManagerOpen(true)}>
                    Manage Wallets
                  </LinkStyleSpan>
                </IonCol>
              ) : (
                ''
              )}
            </IonRow>
          </IonGrid>
        </CardHeaderContent>
        <CardContentContainer>
          <IonGrid className="social-profile-grid">
            <IonRow>
              {containsVerifiedCredential(
                CredentialType.ETHAddress.toLowerCase()
              ) && (
                <IonCol size={isEditable ? '6' : '12'}>
                  {walletViewItem(CredentialType.ETHAddress)}
                </IonCol>
              )}
              {containsVerifiedCredential(
                CredentialType.EIDAddress.toLowerCase()
              ) && (
                <IonCol size={isEditable ? '6' : '12'}>
                  {walletViewItem(CredentialType.EIDAddress)}
                </IonCol>
              )}
              {containsVerifiedCredential(
                CredentialType.ESCAddress.toLowerCase()
              ) && (
                <IonCol size={isEditable ? '6' : '12'}>
                  {walletViewItem(CredentialType.ESCAddress)}
                </IonCol>
              )}
            </IonRow>
          </IonGrid>
        </CardContentContainer>
      </CardOverview>
      <ManagerModal
        isOpen={isManagerOpen}
        cssClass="my-custom-class"
        backdropDismiss={false}
      >
        <MyGrid class="ion-no-padding">
          <IonRow>
            <ManagerModalTitle>Manage Wallets</ManagerModalTitle>
          </IonRow>
          <IonRow no-padding>
            <IonCol class="ion-no-padding">
              {walletEditItem(CredentialType.EIDAddress)}
            </IonCol>
          </IonRow>
          <IonRow no-padding>
            <IonCol class="ion-no-padding">
              {walletEditItem(CredentialType.ESCAddress)}
            </IonCol>
          </IonRow>
          <IonRow no-padding>
            <IonCol class="ion-no-padding">
              {walletEditItem(CredentialType.ETHAddress)}
            </IonCol>
          </IonRow>
        </MyGrid>
        <ManagerModalFooter className="ion-no-border">
          <IonRow className="ion-justify-content-around">
            <IonCol size="auto">
              <CloseButton
                disabled={isRemovingVc}
                onClick={() => {
                  setIsManagerOpen(false);
                }}
              >
                Close
              </CloseButton>
            </IonCol>
          </IonRow>
        </ManagerModalFooter>
      </ManagerModal>
    </>
  );
};

export default WalletCard;
