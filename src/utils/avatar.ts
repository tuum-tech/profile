import { UserService } from '../services/user.service';
import { DidDocumentService } from '../services/diddocument.service';

import defaultAvatar from '../assets/dp.jpeg';

export interface GetAvatarRes {
  didPublished: boolean;
  avatar: string;
}

export const getAvatarIfno = async (
  did: string
): Promise<GetAvatarRes | undefined> => {
  const tuumUser = await UserService.SearchUserWithDID(did);
  const didPublished = tuumUser && tuumUser.tutorialStep === 4;

  try {
    const userDoc = await DidDocumentService.getUserDocumentByDid(did);
    const vault_avatr = tuumUser.avatar || '';
    const doc_Avatar = '';

    if (doc_Avatar !== '') {
      // update userinfo on tuum.tech vault
      // await TuumTechScriptService.updateTuumUser({
      //   ...tuumUser,
      //   avatar: doc_Avatar
      // });
      // return {
      //   avatar: doc_Avatar,
      //   didPublished
      // };
    } else if (vault_avatr !== '') {
      return {
        avatar: vault_avatr,
        didPublished
      };
    }
  } catch (e) {}

  return {
    avatar: defaultAvatar,
    didPublished
  };
};
