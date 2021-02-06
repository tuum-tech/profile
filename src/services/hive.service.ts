import { HiveClient, OptionsBuilder, IOptions } from "@elastos/elastos-hive-js-sdk"
import jwt_decode from 'jwt-decode';

import { DidService } from "./did.service"
import { AccountType, UserService } from "./user.service";
export interface IHiveChallenge {
    issuer: string,
    nonce: string
}
export class HiveService {
    static async getSessionInstance(): Promise<HiveClient | undefined> {
        let instance = await UserService.getLoggedUser()
        console.log('======>instance', instance)
        if (!instance.isDIDPublished || instance.accountType !== AccountType.DID) {
            console.log('======>  DID User is not published or AccountTYpe is not available type')
            return
        }
        let hiveClient = await HiveClient.createInstance(instance.userToken, instance.hiveHost)
        if (hiveClient.isConnected){
            await hiveClient.Payment.CreateFreeVault();
        }
        return hiveClient;
    }

    static async getToken(address: string): Promise<string> {
        let token = window.sessionStorage.getItem("app_token");
        if (!token) {
            let mnemonic = `${process.env.REACT_APP_TUUM_TECH_MNEMONICS}`
            let challenge = await HiveService.getHiveChallenge(address)
            let presentation = await DidService.generateVerifiablePresentationFromUserMnemonics(mnemonic, "", challenge.issuer, challenge.nonce)
            token = await HiveService.getUserHiveToken(address, presentation)
            window.sessionStorage.setItem("app_token", token);
        }
        return token || "";
    }

    static async getAppHiveClient(): Promise<HiveClient> {
        let host = `${process.env.REACT_APP_TUUM_TECH_HIVE}`
        let appToken = await HiveService.getToken(host);
        let hiveClient = await HiveClient.createInstance(appToken, host)
        await hiveClient.Payment.CreateFreeVault();
        return hiveClient;
    }



    private static async getHiveOptions(hiveHost: string,): Promise<IOptions> {
        //TODO: change to appInstance
        let mnemonic = `${process.env.REACT_APP_APPLICATION_MNEMONICS}`
        let appId = `${process.env.REACT_APP_APPLICATION_ID}`
        let appDid = await DidService.loadDid(mnemonic)
        let builder = new OptionsBuilder()
        await builder.setAppInstance(appId, appDid)
        builder.setHiveHost(hiveHost)
        return builder.build()
    }



    static async getHiveChallenge(hiveHost: string): Promise<IHiveChallenge> {
        let mnemonic = `${process.env.REACT_APP_APPLICATION_MNEMONICS}`
        let options = await this.getHiveOptions(hiveHost)
        let appDid = await DidService.loadDid(mnemonic)
        let appDocument = await DidService.getDidDocument(appDid.did)
        let response = await HiveClient.getApplicationChallenge(options, appDocument)

        let jwt = jwt_decode<any>(response.challenge);

        return {
            issuer: jwt.iss,
            nonce: jwt.nonce
        }
    }

    static async getUserHiveToken(hiveHost: string, presentation: any): Promise<string> {
        let options = await this.getHiveOptions(hiveHost)
        return await HiveClient.getAuthenticationToken(options, presentation)
    }


}