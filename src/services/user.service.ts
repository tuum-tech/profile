import { alertError } from 'src/utils/notify';

import { AssistService } from './assist.service';
import { DidService, IDID, PublishRequestOperation } from './did.service';
import { DidDocumentService } from './diddocument.service';
import {
  TuumTechScriptService,
  UserVaultScriptService
} from './script.service';

const CryptoJS = require('crypto-js');

export enum AccountType {
  DID = 'DID',
  Linkedin = 'Linkedin',
  Facebook = 'Facebook',
  Google = 'Google',
  Twitter = 'Twitter',
  Email = 'Email'
}

export interface ISessionItem {
  hiveHost: string;
  userToken: string;
  accountType: AccountType;
  did: string;
  name: string;
  email?: string;
  isDIDPublished: boolean;
  mnemonics: string;
  passhash: string;
  onBoardingCompleted: boolean;
  avatar?: string;
  tutorialStep: number;
}

export interface ITemporaryDID {
  mnemonic: string;
  confirmationId: string;
}

export interface UserData {
  did: string;
  name: string;
  data: string;
}

export interface SignInDIDData {
  name: string;
  did: string;
  hiveHost: string;
  userToken: string;
  isDIDPublished: boolean;
}

export class UserService {
  private static key(did: string): string {
    return `user_${did.replace('did:elastos:', '')}`;
  }

  private static async generateTemporaryDID(
    service: AccountType,
    credential: string
  ): Promise<IDID> {
    let newDID = await DidService.generateNew();
    let temporaryDocument = await DidService.genereteNewDidDocument(newDID);
    DidService.sealDIDDocument(newDID, temporaryDocument);
    DidDocumentService.updateUserDocument(temporaryDocument);

    let requestPub = await DidService.generatePublishRequest(
      temporaryDocument,
      newDID,
      PublishRequestOperation.Create
    );
    await AssistService.publishDocument(newDID.did, requestPub);

    window.localStorage.setItem(
      `temporary_${newDID.did.replace('did:elastos:', '')}`,
      JSON.stringify({
        mnemonic: newDID.mnemonic
      })
    );

    return newDID;
  }

  private static lockUser(key: string, instance: ISessionItem) {
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(instance),
      instance.passhash
    ).toString();
    let localUserData: UserData = {
      name: instance.name,
      did: instance.did,
      data: encrypted
    };
    let json = JSON.stringify(localUserData, null, '');
    window.localStorage.setItem(key, json);
  }

  private static unlockUser(
    key: string,
    storePassword: string
  ): ISessionItem | undefined {
    let item = window.localStorage.getItem(key);
    if (!item) {
      alertError(null, 'User not found');
      return;
    }

    try {
      let did = `did:elastos:${key.replace('user_', '')}`;
      var passhash = CryptoJS.SHA256(did + storePassword).toString(
        CryptoJS.enc.Hex
      );
      let userData: UserData = JSON.parse(item);

      let decrypted = CryptoJS.AES.decrypt(userData.data, passhash);

      let instance = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

      if (instance && instance.userToken) {
        return instance;
      }
      alertError(null, 'Incorrect Password');
    } catch (error) {
      alertError(null, 'Incorrect Password');
    }
    return;
  }

  public static getSignedUsers(): string[] {
    let response: string[] = [];
    for (var i = 0, len = window.localStorage.length; i < len; ++i) {
      let key = window.localStorage.key(i);
      if (key && key.startsWith('user_')) {
        response.push(key.replace('user_', 'did:elastos:'));
      }
    }
    return response;
  }

  public static async LockWithDIDAndPwd(
    sessionItem: ISessionItem,
    password: string = ''
  ) {
    let newSessionItem = sessionItem;
    if (
      !newSessionItem.passhash ||
      newSessionItem.passhash.trim().length == 0
    ) {
      newSessionItem.passhash = CryptoJS.SHA256(
        newSessionItem.did + password
      ).toString(CryptoJS.enc.Hex);
    }

    const res = await this.SearchUserWithDID(sessionItem.did);
    if (res) {
      newSessionItem.onBoardingCompleted = res.onBoardingCompleted;
      newSessionItem.tutorialStep = res.tutorialStep;
    }

    this.lockUser(this.key(newSessionItem.did), newSessionItem);
    // SessionService.saveSessionItem(newSessionItem);
    window.localStorage.setItem(
      'session_instance',
      JSON.stringify(newSessionItem, null, '')
    );
    await UserVaultScriptService.register();
  }

  public static async SearchUserWithDID(did: string) {
    let response: any = await TuumTechScriptService.searchUserWithDID(did);
    const { data, meta } = response;
    if (meta.code === 200 && meta.message === 'OK') {
      const { get_user_by_did } = data;
      if (
        get_user_by_did &&
        get_user_by_did.items &&
        get_user_by_did.items.length > 0
      ) {
        const userData = get_user_by_did.items[0];
        const isDIDPublished = await DidService.isDIDPublished(userData.did);

        return {
          accountType: userData.accountType,
          did: userData.did,
          name: userData.name,
          hiveHost: userData.hiveHost,
          email: userData.email,
          userToken: userData.userToken,
          isDIDPublished: isDIDPublished ? isDIDPublished : false,
          onBoardingCompleted: userData.onBoardingCompleted,
          avatar: userData.avatar,
          tutorialStep: userData.tutorialStep
        };
      } else {
        return;
      }
    } else {
      alertError(null, 'Error while searching user by did');
      return;
    }
  }

  public static async CreateNewUser(
    name: string,
    token: string,
    service: AccountType,
    email: string,
    credential: string,
    storePassword: string,
    newDidStr: string,
    newMnemonicStr: string,
    hiveHostStr: string
  ) {
    let sessionItem: ISessionItem;

    let did = newDidStr;
    let mnemonic = newMnemonicStr;

    if (!did || did === '') {
      const newDid = await this.generateTemporaryDID(service, credential);
      did = newDid.did;
      mnemonic = newDid.mnemonic;
    }

    var passhash = CryptoJS.SHA256(did + storePassword).toString(
      CryptoJS.enc.Hex
    );

    const res = await this.SearchUserWithDID(did);

    sessionItem = {
      did: did,
      accountType: service,
      isDIDPublished: await DidService.isDIDPublished(did),
      name,
      hiveHost:
        hiveHostStr === ''
          ? `${process.env.REACT_APP_TUUM_TECH_HIVE}`
          : hiveHostStr,
      userToken: token,
      mnemonics: mnemonic,
      passhash: passhash,
      email: email,
      onBoardingCompleted: res ? res.onBoardingCompleted : false,
      tutorialStep: res ? res.tutorialStep : 1
    };

    // add new user to the tuum.tech vault
    if (service === AccountType.Email) {
      await TuumTechScriptService.updateUserDidInfo({
        email: email,
        code: credential,
        did: did,
        hiveHost: sessionItem.hiveHost,
        accountType: service,
        userToken: token,
        tutorialStep: sessionItem.tutorialStep,
        onBoardingCompleted: sessionItem.onBoardingCompleted
      });
    } else {
      await TuumTechScriptService.addUserToTuumTech({
        name,
        email: email,
        status: 'CONFIRMED',
        code: '1',
        did: did,
        hiveHost: sessionItem.hiveHost,
        accountType: service,
        userToken: token
      });
    }

    this.lockUser(this.key(did), sessionItem);
    // SessionService.saveSessionItem(sessionItem);
    window.localStorage.setItem(
      'session_instance',
      JSON.stringify(sessionItem, null, '')
    );
  }

  public static async updateSession(sessionItem: ISessionItem): Promise<void> {
    let userData = await TuumTechScriptService.searchUserWithDID(
      sessionItem.did
    );

    let code = userData.data['get_user_by_did']['items'][0].code;
    await TuumTechScriptService.updateUserDidInfo({
      email: sessionItem.email!,
      code: code,
      did: sessionItem.did,
      hiveHost: sessionItem.hiveHost,
      accountType: sessionItem.accountType,
      userToken: sessionItem.userToken,
      tutorialStep: sessionItem.tutorialStep,
      onBoardingCompleted: sessionItem.onBoardingCompleted
    });

    this.lockUser(this.key(sessionItem.did), sessionItem);

    // SessionService.saveSessionItem(sessionItem);
    window.localStorage.setItem(
      'session_instance',
      JSON.stringify(sessionItem, null, '')
    );
  }

  public static async UnLockWithDIDAndPwd(did: string, storePassword: string) {
    let instance = this.unlockUser(this.key(did), storePassword);
    const res = await this.SearchUserWithDID(did);
    if (!res) {
      alertError(null, 'User not find with this DID');
    } else if (instance) {
      instance.onBoardingCompleted = res.onBoardingCompleted;
      instance.tutorialStep = res.tutorialStep;
      this.lockUser(this.key(instance.did), instance);

      // SessionService.saveSessionItem(instance);
      window.localStorage.setItem(
        'session_instance',
        JSON.stringify(instance, null, '')
      );

      await UserVaultScriptService.register();
      return instance;
    }
    return null;
  }

  public static async logout() {
    // SessionService.Logout();
    window.sessionStorage.clear();
    window.localStorage.removeItem('session_instance');
    window.location.href = '/create-profile';
  }

  public static GetUserSession(): ISessionItem | undefined {
    // let item = window.sessionStorage.getItem('session_instance');
    // if (item) {
    //   return JSON.parse(item);
    // }
    let item = window.localStorage.getItem('session_instance');
    if (item) {
      return JSON.parse(item);
    }
    return;
  }

  // public static async DuplicateNewSession(did: string) {
  //   const newSession = (await this.SearchUserWithDID(did)) as ISessionItem;
  //   if (newSession && newSession && newSession.did) {
  //     SessionService.saveSessionItem(newSession);
  //     await UserVaultScriptService.register();
  //   }
  // }
}

//To be
// class SessionService {
//   static getSession(): ISessionItem | undefined {
//     let item = window.sessionStorage.getItem('session_instance');

//     if (!item) {
//       // alertError(null, 'Not logged in');
//       return;
//     }

//     let instance = JSON.parse(item);
//     return instance;
//   }

//   static saveSessionItem(item: ISessionItem) {
//     window.sessionStorage.setItem(
//       'session_instance',
//       JSON.stringify(item, null, '')
//     );
//   }

//   static Logout() {
//     window.sessionStorage.clear();
//     window.location.href = '/create-profile';
//   }
// }
