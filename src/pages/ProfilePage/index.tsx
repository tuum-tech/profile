/**
 * Page
 */
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from '@ionic/react';
import React, { memo, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injector from 'src/baseplate/injectorWrap';
import { makeSelectCounter, makeSelectAjaxMsg } from './selectors';
import { incrementAction, getSimpleAjax } from './actions';
import style from './style.module.scss';
import { NameSpace } from './constants';
import reducer from './reducer';
import saga from './saga';
import {
  InferMappedProps,
  ProfileResponse,
  SubState,
} from './types';
<<<<<<< HEAD
import { requestFullProfile, requestLinkedinProfile } from './fetchapi';
import FollowingList from 'src/components/FollowingList';
import Pages from 'src/components/Pages';
import ProfileHeader from 'src/components/ProfileHeader';
import ProfileCompletion from 'src/components/ProfileCompletion';
import ProfileComponent from 'src/components/ProfileComponent';
import PagesComponent from 'src/components/PagesComponent';
import { RouteComponentProps } from 'react-router';
import logo from '../../assets/Logo-Vertical.svg';
import home from '../../assets/home.svg';
import community from '../../assets/people-outline.svg';
import pages from '../../assets/person-search-outline.svg';
import messages from '../../assets/message-circle-outline.svg';
import photo from '../../assets/photo.png';
import StartServiceComponent from 'src/components/StartServiceComponent';
import ProfileTemplateManager from 'src/components/ProfileTemplateManager';
import { BackgroundService } from '../../services/background.service';
import { Link } from 'react-router-dom';
=======
import {
  // etchSimpleApi,
  requestLinkedinProfile,
} from './fetchapi';
import {
  ProfileHeader,
  // ProfileBanner,
  // ProfileCompletion,
  // ProfileComponent,
  // ProfileTemplateManager,
} from 'src/components/profile';
// import FollowingList from 'src/components/FollowingList';
// import Pages from 'src/components/Pages';
// import PagesComponent from 'src/components/PagesComponent';
// import logo from '../../assets/Logo-Vertical.svg';
// import home from '../../assets/home.svg';
// import community from '../../assets/people-outline.svg';
// import pages from '../../assets/person-search-outline.svg';
// import messages from '../../assets/message-circle-outline.svg';
// import photo from '../../assets/photo.png';
// import StartServiceComponent from 'src/components/StartServiceComponent';

// import { BackgroundService } from '../../services/background.service';
// import { Link } from 'react-router-dom';
>>>>>>> 5ee943f... architecture cleaned
import Logo from 'src/components/Logo';
import Navbar from 'src/components/Navbar';
import DashboardNav from 'src/components/DashboardNav';
import { EducationItem, ExperienceItem, ProfileDTO } from '../PublicPage/types';

const ProfilePage: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  /**
   * Direct method implementation without SAGA
   * This was to show you dont need to put everything to global state
   * incoming from Server API calls. Maintain a local state.
   */
  const [full_profile, setfull_profile] = useState({
    basicDTO:
    {
      isEnabled: false,
      first_name: "",
      last_name: "",
      did: "",
      title: "",
      about: "",
      address: { number: "", street_name: "", postal_code: "", state: "", country: "" }
    },
    educationDTO: {
      isEnabled: true,
      items: ([] as EducationItem[])
    },
    experienceDTO: {
      isEnabled: true,
      items: ([] as ExperienceItem[])
    }
  });

  // const [active, setActive] = useState('dashboard');

  const getProfile = async (token: string): Promise<ProfileResponse> => {
    return (await requestLinkedinProfile(token)) as ProfileResponse;
  };
  let token: string =
    new URLSearchParams(props.location.search).get('token') || '';

<<<<<<< HEAD
  const getFullProfile = async (did: string): Promise<any> => {
    return await requestFullProfile(did);
  };

  const getPublicUrl = (): string => {
    let item = window.sessionStorage.getItem('session_instance');
=======
  // const getPublicUrl = (): string => {
  //   let item = window.sessionStorage.getItem('session_instance');
>>>>>>> 5ee943f... architecture cleaned

  //   if (!item) {
  //     throw Error('Not logged in');
  //   }

  //   let instance = JSON.parse(item);

  //   return '/did/' + instance.did;
  // };

  useEffect(() => {
    (async () => {
      if (token != '') {
<<<<<<< HEAD
        let profile: ProfileDTO = await getFullProfile("did");
        setfull_profile(profile);
=======
        getProfile(token)
          .then((x: ProfileResponse) => {
            console.log('=====>', x.data);
            let p = x.data as ProfileContent;
            setProfile(p);
          })
          .catch((error) => {
            console.error(error);
            let fallback = {
              profile: { firstName: 'Jane', lastName: 'Fallback' },
            };
            setProfile(fallback);
          });
>>>>>>> 5ee943f... architecture cleaned
      }
    })();
  }, [token]);

  return (
    <IonPage>
      <IonContent className={style['profilepage']}>
        <IonGrid className={style['profilepagegrid']}>
          <IonRow className={style['profilecontent']}>
            <IonCol size='2' className={style['left-panel']}>
              <Logo />
              <Navbar />
            </IonCol>
            {/* <IonCol size='7' className={style['center-panel']}>              
              <ProfileComponent profile={profile} />
            </IonCol> */}
            <IonCol size='10' className={style['right-panel']}>
              <ProfileHeader profile={full_profile} />
              <DashboardNav />
              {/* <StartServiceComponent />
              <ProfileCompletion /> */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>

  );
};

/** @returns {object} Contains state props from selectors */
export const mapStateToProps = createStructuredSelector<SubState, SubState>({
  counter: makeSelectCounter(),
  msg: makeSelectAjaxMsg(),
});

/** @returns {object} Contains dispatchable props */
export function mapDispatchToProps(dispatch: any) {
  return {
    eProps: {
      // eProps - Emitter proptypes thats binds to dispatch
      /** dispatch for counter to increment */
      onCount: (count: { counter: number }) => dispatch(incrementAction(count)),
      onSimpleAjax: () => dispatch(getSimpleAjax()),
    },
  };
}

/**
 * Injects prop and saga bindings done via
 * useInjectReducer & useInjectSaga
 */
const withInjectedMode = injector(ProfilePage, {
  key: NameSpace,
  reducer,
  saga,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(withInjectedMode) as React.ComponentType<InferMappedProps>;

// export default Tab1;
