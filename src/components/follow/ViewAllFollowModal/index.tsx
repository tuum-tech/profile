import React from 'react';

import FollowerAll from './FollowerAll';
import FollowingAll from './FollowingAll';
import style from './style.module.scss';

interface Props {
  isFollower: boolean;
  editable: boolean;
  onClose: () => void;
  followerDids: string[];
  followingDids: string[];
  setFollowerDids: (dids: string[]) => void;
  setFollowingDids: (dids: string[]) => void;
  showFollowerCard?: boolean;
  showFollowingCard?: boolean;
}

const ViewAllFollowModal = ({
  isFollower,
  editable,
  onClose,
  followerDids,
  followingDids,
  setFollowerDids,
  setFollowingDids,
  showFollowerCard = true,
  showFollowingCard = true
}: Props) => (
  <div className={style['modal']}>
    <div className={style['modal_container']}>
      <div className={style['modal_content']}>
        {isFollower ? (
          <FollowerAll
            followerDids={followerDids}
            followingDids={followingDids}
            editable={editable}
            onClose={onClose}
            setFollowingDids={setFollowingDids}
          />
        ) : (
          <FollowingAll
            followingDids={followingDids}
            onClose={onClose}
            editable={editable}
            setFollowingDids={setFollowingDids}
          />
        )}
      </div>
    </div>
  </div>
);

export default ViewAllFollowModal;
