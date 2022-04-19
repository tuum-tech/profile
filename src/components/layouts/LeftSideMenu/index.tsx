import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonList } from '@ionic/react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { down } from 'styled-breakpoints';

import { makeSelectSession } from 'src/store/users/selectors';
import { setSession } from 'src/store/users/actions';
import { InferMappedProps, SubState } from './types';

import { UserService } from 'src/services/user.service';

import Logo from 'src/elements/Logo';
import FooterLinks from './components/FooterLinks';
import ConnectionMenu from './components/ConnectionMenu';

import HelpModalContent, { HelpModal } from './modals/Help';
import ReportModalContent, { ReportModal } from './modals/Report';
import ContactModalContent, { ContactModal } from './modals/Contact';

import style from './style.module.scss';
import { TuumTechScriptService } from 'src/services/script.service';
import MenuItem from './components/MenuItem';
import Badge from 'src/elements-v2/Badge/index';

const Container = styled.div`
  ${down('sm')} {
    display: none;
  }
`;

const LeftSideMenu: React.FC<InferMappedProps> = ({
  eProps,
  ...props
}: InferMappedProps) => {
  const history = useHistory();
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [requestsCount, setRequestsCount] = useState(0);

  const toggleHelpSupport = () => {
    setShowSupportModal(!showSupportModal);
  };
  const toggleReportProblem = () => {
    setShowReportModal(!showReportModal);
  };
  const toggleContactUs = () => {
    setShowContactModal(!showContactModal);
  };

  useEffect(() => {
    (async () => {
      const fetchVerificationRequestsCount = async (): Promise<void> => {
        let requests: VerificationRequest[] = await TuumTechScriptService.getVerificationRequests(
          props.session.did,
          false
        );
        setRequestsCount(requests.filter(x => x.status === 'requested').length);
      };
      await fetchVerificationRequestsCount();
    })();
  }, [props.session.did]);

  return (
    <Container className={style['navbar']}>
      <Logo />
      <IonList>
        <MenuItem
          name="dashboard"
          title="Dashboard"
          active={history.location.pathname === '/profile'}
          handleClick={() => history.push('/profile')}
        />
        <MenuItem
          name="profile"
          title="Profile Manager"
          active={history.location.pathname === '/manager'}
          handleClick={() => history.push('/manager')}
        />

        <ConnectionMenu session={props.session} />
        {/* in a progress */}

        <MenuItem
          name="spaces"
          title="Spaces"
          active={history.location.pathname === '/spaces'}
          handleClick={() => history.push('/spaces')}
        />
        <MenuItem
          name="explore"
          title="Explore"
          active={history.location.pathname === '/explore'}
          handleClick={() => history.push('/explore')}
        />

        <hr className={style['divider']} />
        <MenuItem
          name="settings"
          title="Settings"
          active={history.location.pathname === '/settings'}
          handleClick={() => history.push('/settings')}
        />
        <MenuItem
          name="activities"
          title="Activities"
          rightContent={
            history.location.pathname === '/activities' &&
            requestsCount > 0 && <Badge>{requestsCount}</Badge>
          }
          active={history.location.pathname === '/activities'}
          handleClick={() => history.push('/activities')}
        />
        {/* <IonItem
          className={
            history.location.pathname === '/activities'
              ? style['item-active']
              : style['item-link']
          }
          onClick={async () => history.push('/activities')}
        >
          <MenuIcon name="activities" active />
          <IonLabel>
            <h3>
              Activities{' '}
              {requestsCount > 0 ? <IonBadge>{requestsCount}</IonBadge> : ''}
            </h3>
          </IonLabel>
        </IonItem> */}
        {/* <IonItem
            className={
              history.location.pathname === '/notifications'
                ? style['item-active']
                : style['item-link']
            }
            onClick={() => history.push('/notifications')} // should be fixed later
          >
            <IonIcon
              slot="start"
              src="../../assets/icon_notifications.svg"
              className={style['img']}
            ></IonIcon>
            <IonLabel>
              <h3>Notifications</h3>
            </IonLabel>
          </IonItem> */}
        {/* <IonItem
            className={
              history.location.pathname === '/support-forum'
                ? style['item-active']
                : style['item-link']
            }
            onClick={async () => history.push('/support-forum')}
          >
            <IonIcon
              slot="start"
              src="../../assets/icon_support_forum.svg"
              className={style['img']}
            ></IonIcon>
            <IonLabel>
              <h3>Support Forum</h3>
            </IonLabel>
          </IonItem> */}
        <MenuItem
          name="signout"
          title="Sign Out"
          active={false}
          handleClick={() => {
            UserService.logout();
          }}
        />
      </IonList>

      <FooterLinks
        session={props.session}
        toggleHelpSupport={toggleHelpSupport}
      />

      <HelpModal
        isOpen={showSupportModal}
        cssClass="my-custom-class"
        backdropDismiss={false}
      >
        <HelpModalContent
          session={props.session}
          toggleHelpSupport={toggleHelpSupport}
          toggleReportProblem={toggleReportProblem}
          toggleContactUs={toggleContactUs}
        />
      </HelpModal>

      <ReportModal
        isOpen={showReportModal}
        cssClass="my-custom-class"
        backdropDismiss={false}
      >
        <ReportModalContent
          session={props.session}
          toggleReportProblem={toggleReportProblem}
        />
      </ReportModal>

      <ContactModal
        isOpen={showContactModal}
        cssClass="my-custom-class"
        backdropDismiss={false}
      >
        <ContactModalContent
          session={props.session}
          toggleContactUs={toggleContactUs}
        />
      </ContactModal>
    </Container>
  );
};

export const mapStateToProps = createStructuredSelector<SubState, SubState>({
  session: makeSelectSession()
});

export function mapDispatchToProps(dispatch: any) {
  return {
    eProps: {
      setSession: (props: { session: ISessionItem }) =>
        dispatch(setSession(props))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideMenu);
