import React from 'react';

import {
  MainCard,
  CardText,
  CardTitle,
  CardImg,
  LinkButton
} from './ManageProfile';
import exploreCardImg from '../../../../../../assets/dashboard/explore.png';

const ExploreConnnections: React.FC = ({}) => {
  return (
    <MainCard>
      <CardTitle>Connect with friends, companies</CardTitle>
      <CardText>
        Search for like minded people and make valuable connections. explore
        your influnce circle
      </CardText>
      <LinkButton>Expolore connections ></LinkButton>
      <CardImg src={exploreCardImg} />
    </MainCard>
  );
};

export default ExploreConnnections;
