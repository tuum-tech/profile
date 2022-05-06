import React from 'react';

import useSession from 'src/hooks/useSession';
import FollowersSearch from './components/FollowersSearch';

const FollowersPage: React.FC = () => {
  const { session } = useSession();

  return <FollowersSearch userSession={session} />;
};

export default FollowersPage;
