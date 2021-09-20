import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { SearchService } from 'src/services/search.service';
import { getItemsFromData } from 'src/utils/script';
import Avatar from 'src/components/Avatar';
import { timeSince } from 'src/utils/time';
import { SmallLightButton } from 'src/elements/buttons';

export const UserRow = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 3px 8px -1px rgba(50, 50, 71, 0.05);
  filter: drop-shadow(0px 0px 1px rgba(12, 26, 75, 0.24));

  margin-top: 30px;
  display: flex;
  align-items: center;
  padding: 14px;

  .left {
    display: block;
    margin-right: 20px;
  }

  .right {
    display: block;

    .top {
      font-size: 16px;
      line-height: 162.02%;
      color: #425466;
    }

    .bottom {
      font-weight: normal;
      font-size: 13px;
      line-height: 162.02%;
      color: #425466;
    }
  }
`;

export const getStatusColor = (status: string) => {
  let statusColor = '#FF5A5A';
  if (status === 'approved') {
    statusColor = '#2FD5DD';
  } else if (status === 'requested') {
    statusColor = '#FF9840';
  }
  return statusColor;
};
export interface Props {
  session: ISessionItem;
  verifications: VerificationRequest[];
  setSelectVerification: (v: any) => void;
}

const UserRows: React.FC<Props> = ({
  session,
  verifications,
  setSelectVerification
}: Props) => {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const searchServiceLocal = await SearchService.getSearchServiceAppOnlyInstance();
      let usersRes: any = await searchServiceLocal.getUsersByDIDs(
        verifications.map(v => v.to_did),
        verifications.length,
        0
      );
      setUsers(getItemsFromData(usersRes, 'get_users_by_dids'));
    })();
  }, [verifications]);

  const renderUserName = (user: ISessionItem, v: VerificationRequest) => {
    if (user && user.name) {
      return <Link to={'/did/' + user.did}>{user.name}</Link>;
    }
    return <Link to={'/did/' + v.to_did}>{v.to_did}</Link>;
  };

  const rednerUserRow = (v: VerificationRequest) => {
    const user = users.filter((user: any) => user.did === v.to_did)[0];

    return (
      <UserRow key={v.from_did + v.to_did + v.status + v.category}>
        <div className="left">
          <Avatar did={v.to_did} width="50px" />
        </div>
        <div className="right">
          <p className="top">
            {v.category} <span style={{ fontWeight: 'bold' }}>sent to </span>
            {renderUserName(user, v)}
          </p>
          <p className="bottom" style={{ display: 'flex' }}>
            {timeSince(new Date(v.updated_at))}
            <li
              style={{ color: getStatusColor(v.status), marginLeft: ' 20px' }}
            >
              {v.status}
            </li>
          </p>
        </div>
        <SmallLightButton
          style={{
            margin: '0 0 0 auto'
          }}
          onClick={() => {
            setSelectVerification({
              verification: v,
              user
            });
          }}
        >
          View Info
        </SmallLightButton>
      </UserRow>
    );
  };

  return <>{verifications.map(v => rednerUserRow(v))}</>;
};

export default UserRows;