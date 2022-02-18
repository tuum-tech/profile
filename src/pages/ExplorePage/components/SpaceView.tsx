import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import WelcomeSpace from './WelcomeSpace';
import RequestCommunity from './RequestCommunity';

import { UserService } from 'src/services/user.service';
import { DidService } from 'src/services/did.service.new';
import { TuumTechScriptService } from 'src/services/script.service';
import { SpaceService } from 'src/services/space.service';

import LoadingIndicator from 'src/elements/LoadingIndicator';
import MySpaces from 'src/pages/SpacePage/components/MySpaces';

const SpaceView = () => {
  const [spaces, setSpaces] = useState<any[]>([]);
  const [loadingText, setLoadingText] = useState('');
  useEffect(() => {
    (async () => {
      setLoadingText('loading spaces...');
      await refreshSpaces();
      setLoadingText('');
    })();
    setTimerForSpaces();
  }, []);

  const setTimerForSpaces = () => {
    const timer = setTimeout(async () => {
      await refreshSpaces();
      setTimerForSpaces();
    }, 4000);
    return () => clearTimeout(timer);
  };

  const refreshSpaces = async () => {
    const spaces = await SpaceService.getAllSpaces();
    const community_spaces = await SpaceService.getCommunitySpaces();
    setSpaces(spaces.concat(community_spaces));
  };
  return (
    <>
      {loadingText && loadingText !== '' ? (
        <LoadingIndicator loadingText={loadingText} />
      ) : (
        <>
          {spaces.length > 0 ? (
            <>
              <RequestCommunity />
              <MySpaces spaces={spaces} explore={true} />
            </>
          ) : (
            <>
              <WelcomeSpace />
              <RequestCommunity />
            </>
          )}
        </>
      )}
    </>
  );
};

export default SpaceView;
