import React, { useEffect, useState } from 'react';
import { IonContent, IonSearchbar, IonSpinner } from '@ionic/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';

import { FollowButton } from 'src/components/buttons';
import { FollowService } from 'src/services/follow.service';

import UserRow from './UserRow';
import style from './style.module.scss';

const Loading = styled.div`
  font-style: normal;
  font-weight: 500;

  display: flex;
  align-items: center;
  justify-content: center !important;
  margin: 10px auto;

  color: #4c7eff;
  width: 100%;

  line-height: 1rem;
  font-size: 1rem;
`;

const CloseButton = styled(FollowButton)`
  display: block;
  margin: 25px auto 0px;
`;

interface Props {
  isFollower: boolean;
  targetDid: string;
  onClose: () => void;
}

const ViewAllModal = ({ targetDid, isFollower, onClose }: Props) => {
  const [userDids, setUserDids] = useState<string[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    (async () => {
      let dids = [];
      if (isFollower) {
        dids = await FollowService.getFollowerDids(targetDid);
      } else {
        dids = await FollowService.getFollowingDids(targetDid);
      }
      setUserDids(dids);
      setUsers(
        await FollowService.invokeSearch(dids, '', pageSize, pageNumber)
      );
    })();
  }, [targetDid, isFollower]);

  return (
    <div className={style['modal']}>
      <div className={style['modal_container']}>
        <div className={style['modal_content']}>
          <p className={style['modal_title']}>{`${
            isFollower ? 'Followers' : 'Followings'
          } (${userDids.length})`}</p>
          <IonContent className={style['searchcomponent']}>
            <IonSearchbar
              value={searchQuery}
              onIonChange={async e => {
                setSearchQuery(e.detail.value!);
                const res = await FollowService.invokeSearch(
                  userDids,
                  e.detail.value!,
                  200,
                  1
                );
                setUsers(res);
              }}
              placeholder="Search people, pages by name or DID"
              className={style['search-input']}
            ></IonSearchbar>
          </IonContent>

          <div className={style['scrollableContent']} id="scrollableDiv">
            <InfiniteScroll
              dataLength={users.length}
              next={async () => {
                const newUsers = await FollowService.invokeSearch(
                  userDids,
                  '',
                  pageSize,
                  pageNumber + 1
                );

                if (newUsers.length > 0) {
                  setUsers(users.concat(newUsers));
                  setPageNumber(pageNumber + 1);
                } else {
                  setHasMore(false);
                }
              }}
              hasMore={hasMore}
              style={{
                width: '100%'
              }}
              loader={
                <Loading>
                  Loading &nbsp;
                  <IonSpinner
                    color="#4c7eff"
                    style={{
                      width: '1rem',
                      height: '1rem'
                    }}
                  />
                </Loading>
              }
              scrollableTarget="scrollableDiv"
            >
              {users.map((user: any) => (
                <UserRow
                  did={user.did}
                  name={user.name}
                  key={user.did}
                  isFollowing={isFollower}
                  followAction={() => {}}
                />
              ))}
            </InfiniteScroll>
          </div>

          <CloseButton onClick={onClose} width={100} height={35}>
            Close
          </CloseButton>
        </div>
      </div>
    </div>
  );
};

export default ViewAllModal;
