import React, { useState, useMemo } from 'react';
import { IonRow } from '@ionic/react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSession } from 'src/store/users/selectors';
import { setSession } from 'src/store/users/actions';
import { InferMappedProps, SubState } from './types';

import { SpaceService } from 'src/services/space.service';
import { StyledButton } from 'src/elements/buttons';
import { DidSnippetSvg } from 'src/elements/DidSnippet';
import { SpaceAvatar } from 'src/components/Space/SpaceCard';
import { CardOverview, CardContent } from 'src/components/cards/common';
import defaultAvatar from 'src/assets/icon/dp.png';
import icon_shield from 'src/assets/icon/shield.svg';
import style from './About.module.scss';
import { showNotify } from 'src/utils/notify';

export const HorDOMSpace16 = styled(IonRow)`
  padding: 8px 0px;
`;
export const HorDOMSpace20 = styled(IonRow)`
  padding: 10px 0px;
`;

interface IProps extends InferMappedProps {
  space: any;
  template?: string;
}

const AboutSpace: React.FC<IProps> = ({
  space,
  session,
  template = 'default'
}: IProps) => {
  const [followers, setFollowers] = useState<string[]>(space.followers || []);
  const following = useMemo(() => followers.includes(session.did), [
    followers,
    session.did
  ]);
  const isOwner = space.owner && space.owner.includes(session.did);
  const isLoggedIn = window.localStorage.getItem('isLoggedIn');
  const auth = () => {
    if (!isLoggedIn) {
      showNotify('You should login', 'warning');
      return false;
    }
    return true;
  };
  const onFollow = async () => {
    if (!auth()) return;
    await SpaceService.follow(session, space);
    setFollowers([...new Set([...followers, session.did])]);
  };
  const onUnfollow = async () => {
    if (!auth()) return;
    await SpaceService.unfollow(session, space);
    setFollowers([
      ...new Set(
        followers.filter((follower: string) => follower !== session.did)
      )
    ]);
  };
  return (
    <CardOverview template={template}>
      <CardContent>
        <IonRow>
          <SpaceAvatar>
            <img src={space.avatar || defaultAvatar} height={79} alt="avatar" />
          </SpaceAvatar>
        </IonRow>
        <HorDOMSpace20 />
        <IonRow>
          <div className={style['name']}>
            <h1>
              {space.name}
              <img src={icon_shield} />
            </h1>
            <h2>
              <DidSnippetSvg /> DID:iYio2....LzNf &nbsp;&nbsp;&nbsp;by{' '}
              <span>Phantz</span>
            </h2>
          </div>
        </IonRow>
        <HorDOMSpace16 />
        <IonRow>
          <span>
            {space.description ||
              'From the jungle to your hood, Phantz are taking over. One dusty desert day, an elephant noticed something shiny sticking out of the sand-Wayfarer sunglasses. The second the elephant placed them'}
          </span>
        </IonRow>
        <HorDOMSpace16 />
        <IonRow>
          <span className={style['btn-expand']}> + Expand</span>
        </IonRow>
        <HorDOMSpace20 />
        <IonRow>
          {!isOwner && (
            <StyledButton
              width={'94px'}
              height={'43px'}
              bgColor={
                'linear-gradient(145.76deg, #995AFF 14.97%, #DC59BF 87.23%)'
              }
              className={'mr-3'}
              disabled={isOwner}
              onClick={following ? onUnfollow : onFollow}
            >
              {following ? `Unfollow` : `Follow`}
            </StyledButton>
          )}
          {/* <StyledButton
            width={'94px'}
            height={'43px'}
            bgColor={
              'linear-gradient(252.79deg, rgba(144, 75, 255, 0.084) -20.69%, rgba(190, 52, 160, 0.092) 151.16%);'
            }
            color={'#995AFF'}
            onClick={() => {}}
          >
            Share
          </StyledButton> */}
        </IonRow>
      </CardContent>
    </CardOverview>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutSpace);
