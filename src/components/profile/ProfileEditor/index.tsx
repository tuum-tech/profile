import React, { useEffect, useState } from 'react';
import { IonContent, IonGrid, IonCol, IonRow } from '@ionic/react';
import { IRunScriptResponse } from '@elastos/elastos-hive-js-sdk/dist/Services/Scripting.Service';

import {
  AccountType,
  ISessionItem,
  UserService
} from 'src/services/user.service';
import { TuumTechScriptService } from 'src/services/script.service';
import {
  BasicDTO,
  EducationItem,
  ExperienceItem,
  ProfileDTO
} from 'src/pages/PublicPage/types';
import { ProfileResponse } from 'src/pages/ProfilePage/types';
import { ProfileService } from 'src/services/profile.service';

import TemplateManagerCard from '../../cards/TemplateManagerCard';
import EducationCard from '../../cards/EducationCard';
import ExperienceCard from '../../cards/ExperienceCard';
import AboutCard from '../../cards/AboutCard';
import BasicCard from '../../cards/BasicCard';

import style from './style.module.scss';

const ProfileEditor: React.FC = () => {
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState<ISessionItem>({
    hiveHost: '',
    userToken: '',
    accountType: AccountType.DID,
    did: '',
    email: '',
    name: '',
    isDIDPublished: false,
    mnemonics: '',
    passhash: '',
    onBoardingCompleted: false,
    tutorialCompleted: false
  });
  const [loaded, setloaded] = useState(false);
  const [full_profile, setfull_profile] = useState({
    basicDTO: {
      isEnabled: false,
      name: '',
      hiveHost: '',
      email: '',
      did: '',
      title: '',
      about: '',
      address: {
        number: '',
        street_name: '',
        postal_code: '',
        state: '',
        country: ''
      }
    },
    educationDTO: {
      isEnabled: true,
      items: [] as EducationItem[]
    },
    experienceDTO: {
      isEnabled: true,
      items: [] as ExperienceItem[]
    }
  });

  async function requestFullProfile(did: string): Promise<ProfileDTO> {
    let getFullProfileResponse: IRunScriptResponse<ProfileResponse> = {} as IRunScriptResponse<
      ProfileResponse
    >;

    getFullProfileResponse = await ProfileService.getFullProfile(did);

    return mapProfileResponseToProfileDTO(
      getFullProfileResponse.response as ProfileResponse
    );
  }

  const mapProfileResponseToProfileDTO = (
    fullProfileResponse: ProfileResponse
  ): ProfileDTO => {
    let basicProfile = fullProfileResponse.get_basic.items![0];
    let educationProfile = fullProfileResponse.get_education_profile;
    let experienceProfile = fullProfileResponse.get_experience_profile;

    return {
      basicDTO: basicProfile,
      educationDTO: educationProfile,
      experienceDTO: experienceProfile
    };
  };

  useEffect(() => {
    (async () => {
      let instance = UserService.GetUserSession();
      if (!instance || !instance.userToken) return;

      setUserInfo(instance);

      if (instance.tutorialCompleted) {
        try {
          let profile: ProfileDTO = await requestFullProfile(instance.did);

          profile.experienceDTO.isEnabled = true;
          profile.educationDTO.isEnabled = true;

          setfull_profile(profile);
        } catch (e) {
          setError(true);
        }
      }
      setloaded(true);
    })();
  }, []);

  return (
    <IonContent className={style['profileeditor']}>
      <IonGrid className={style['profileeditorgrid']}>
        <IonRow>
          <IonCol size="4">
            <TemplateManagerCard sessionItem={userInfo} />
          </IonCol>
          <IonCol size="8">
            {!error && loaded ? (
              <BasicCard
                sessionItem={userInfo}
                updateFunc={async (userInfo: ISessionItem) => {
                  await TuumTechScriptService.updateBasicProfile(userInfo);
                  UserService.updateSession(userInfo);
                }}
              ></BasicCard>
            ) : (
              ''
            )}
            {!error && loaded && userInfo.tutorialCompleted === true ? (
              <>
                <AboutCard
                  basicDTO={full_profile.basicDTO}
                  updateFunc={async (basicDTO: BasicDTO) => {
                    await ProfileService.updateAbout(basicDTO);
                  }}
                  mode="edit"
                ></AboutCard>
                <EducationCard
                  educationDTO={full_profile.educationDTO}
                  updateFunc={async (educationItem: EducationItem) => {
                    await ProfileService.updateEducationProfile(educationItem);
                  }}
                  removeFunc={async (educationItem: EducationItem) => {
                    await ProfileService.removeEducationItem(educationItem);
                  }}
                  mode="edit"
                ></EducationCard>
                <ExperienceCard
                  experienceDTO={full_profile.experienceDTO}
                  updateFunc={async (experienceItem: ExperienceItem) => {
                    await ProfileService.updateExperienceProfile(
                      experienceItem
                    );
                  }}
                  removeFunc={async (
                    experienceItem: ExperienceItem
                  ): Promise<any> => {
                    await ProfileService.removeExperienceItem(experienceItem);
                  }}
                  mode="edit"
                ></ExperienceCard>
              </>
            ) : (
              ''
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default ProfileEditor;
