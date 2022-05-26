import React, { useState, useEffect, useMemo } from 'react';
import { IonLabel, IonRow, IonSpinner } from '@ionic/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SmallLightButton } from 'src/elements/buttons';
import defaultAvatar from 'src/assets/icon/dp.png';

import { UserRow, getStatusColor } from '../MyRequests/UserRows';
import { getDIDString } from 'src/utils/did';
import { SearchService } from 'src/services/search.service';
import { getItemsFromData } from 'src/utils/script';
import { timeSince } from 'src/utils/time';
import style from './style.module.scss';
import { DefaultButton } from 'src/elements-v2/buttons';

export const SpaceAvatar = styled.div`
  width: 44px;
  height: 42px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 5.5em;
    border-radius: 46%;
    padding: 3px;
    background: linear-gradient(90deg, #995aff 0%, #dc59bf 100%);
  }
`;

interface Props {
  referrals: IReferral[];
  session: ISessionItem;
  sortBy: number;
  searchQuery: string;
}

const UserRows: React.FC<Props> = ({
  referrals,
  session,
  sortBy,
  searchQuery
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    users.sort((a, b) => {
      if (a.created?.$date > b.created?.$date) {
        return sortBy ? -1 : 1;
      } else if (a.created?.$date < b.created?.$date) {
        return sortBy ? 1 : -1;
      } else {
        return 0;
      }
    });
  }, [sortBy, users]);

  const filteredUsers = useMemo(() => {
    if (searchQuery) {
      return users.filter(
        v =>
          v.name.toLowerCase().includes(searchQuery) ||
          v.owner?.includes(searchQuery)
      );
    }
    return users;
  }, [searchQuery, users]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const searchServiceLocal = await SearchService.getSearchServiceAppOnlyInstance();
        let usersRes: any = await searchServiceLocal.getUsersByDIDs(
          referrals.map(v => v.did),
          referrals.length,
          0
        );
        setLoading(false);
        setUsers(getItemsFromData(usersRes, 'get_users_by_dids'));
      } catch (err) {
        setLoading(false);
      }
    })();
  }, [referrals]);

  const getLink = (did: string) => {
    return getDIDString('/did/' + did, true);
  };

  const getBadges = (badges: IBadges | undefined) => {
    let _completedBadgeCount = 0;
    if (!badges) return _completedBadgeCount;

    _completedBadgeCount += Object.keys(badges?.account).filter(
      key => (badges?.account as any)[key].archived
    ).length;
    _completedBadgeCount += Object.keys(badges?.socialVerify).filter(
      key => (badges?.socialVerify as any)[key].archived
    ).length;
    _completedBadgeCount += Object.keys(badges?.didPublishTimes).filter(
      key => (badges?.didPublishTimes as any)[key].archived
    ).length;
    _completedBadgeCount += Object.keys(badges?.dStorage).filter(
      key => (badges?.dStorage as any)[key].archived
    ).length;
    return _completedBadgeCount;
  };

  const rednerUserRow = (r: ISessionItem) => {
    return (
      <UserRow key={r.did} className={style['item-row']}>
        <div className="left">
          <SpaceAvatar>
            <img src={r.avatar || defaultAvatar} height="auto" alt="avatar" />
          </SpaceAvatar>
        </div>
        <div className="right">
          <Link to={getLink(r.did)} target="_blank">
            <IonLabel className={style['name']}>{r.name}</IonLabel>
          </Link>
          <p className="bottom">
            <IonRow class="ion-justify-content-start">
              <IonLabel className={style['date']}>
                {timeSince(r.created?.$date)}
              </IonLabel>
              <li
                style={{
                  color: getStatusColor(r?.status ?? ''),
                  marginLeft: '9px'
                }}
                className={style['date']}
              >
                {r?.status}
              </li>
              <li className={style['tab-label']} style={{ marginLeft: '9px' }}>
                Earned: {getBadges(r?.badges)} MTRL
              </li>
            </IonRow>
          </p>
        </div>
        <DefaultButton
          variant="outlined"
          size="large"
          btnColor="primary-gradient"
          className={style['button']}
        >
          <IonLabel className={style['tab-label']}>Send Reminder</IonLabel>
        </DefaultButton>
        <div style={{ margin: '0 0 0 auto' }}>
          {loading && (
            <SmallLightButton>
              <IonSpinner
                color="#007bff"
                style={{
                  width: '1rem',
                  height: '1rem'
                }}
              />
            </SmallLightButton>
          )}
        </div>
      </UserRow>
    );
  };

  return <>{filteredUsers.map(r => rednerUserRow(r))}</>;
};

export default UserRows;
