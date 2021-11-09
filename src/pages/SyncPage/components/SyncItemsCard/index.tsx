import React, { useState, useEffect } from 'react';
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import styled from 'styled-components';

import {
  CardContentContainer,
  CardOverview
} from 'src/components/cards/common';
import { DefaultButton } from 'src/elements/buttons';
import ProgressBar from 'src/elements/ProgressBar';
import { ISyncItem } from 'src/services/sync.service';
import SyncItemElement from '../SyncItemElement';

const TotalItemsText = styled.span<ThemeProps>`
  font-family: 'SF Pro Display';
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  text-align: left;
  color: #4c6fff;
`;

const SyncGroupHeader = styled.span`
  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: -0.005em;
  color: #27272e;
`;

const SyncGroupHeaderRow = styled(IonRow)`
  margin-top: 10px;
  --ion-background-color: #111d12 !important;
  background-color: #edf2f7 !important;
  font-family: 'SF Pro Display';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  font-feature-settings: 'salt' on;
  color: #425466;
  border-radius: 11px;
  padding: 5px 20px;
`;

const SyncGroupHeaderCol = styled(IonCol)`
  --ion-background-color: transparent !important;
  background-color: transparent !important;
`;

interface IProps {
  syncItems: ISyncItem[];
  template?: string;
  updateSyncItem: (syncItem: ISyncItem) => void;
}

const SyncItemsCard: React.FC<IProps> = ({
  syncItems = [],
  template = 'default',
  updateSyncItem = (syncItem: ISyncItem) => {}
}: IProps) => {
  return (
    <>
      <CardOverview template={template}>
        <CardContentContainer>
          <SyncGroupHeader>Personal Information</SyncGroupHeader>

          <IonGrid>
            <SyncGroupHeaderRow>
              <SyncGroupHeaderCol size="5">Current</SyncGroupHeaderCol>

              <SyncGroupHeaderCol size="5">Blockchain</SyncGroupHeaderCol>

              <SyncGroupHeaderCol size="2">
                Keep version from
              </SyncGroupHeaderCol>
            </SyncGroupHeaderRow>

            {syncItems.map(item => (
              <SyncItemElement
                key={item.Label}
                syncItem={item}
                updateSyncItem={updateSyncItem}
              ></SyncItemElement>
            ))}
          </IonGrid>
        </CardContentContainer>
      </CardOverview>
    </>
  );
};

export default SyncItemsCard;
