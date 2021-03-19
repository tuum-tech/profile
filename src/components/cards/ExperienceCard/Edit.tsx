import React from 'react';
import {
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonLabel,
  IonRow
} from '@ionic/react';
import { ExperienceItem } from 'src/pages/PublicPage/types';

import SmallTextInput from '../../inputs/SmallTextInput';
import { MyGrid, MyTextarea } from './components';

interface ExperienceCardEditProps {
  experienceItem: ExperienceItem;
  handleChange: any;
  index: number;
  mode: string;
}

const ExperienceCardEdit: React.FC<ExperienceCardEditProps> = ({
  experienceItem,
  handleChange,
  index,
  mode
}: ExperienceCardEditProps) => {
  const handleChangeIndex = (evt: any) => {
    handleChange(evt, index);
  };

  return (
    <MyGrid>
      <IonRow>
        <IonCardTitle>
          {mode === 'edit' ? 'Edit Experience' : 'Add new Experience'}
        </IonCardTitle>
      </IonRow>
      <IonRow class="ion-justify-content-start">
        <IonCol size="5">
          <SmallTextInput
            placeholder="e.g. Blockchain developer"
            label="Title"
            name="title"
            value={experienceItem.title}
            onChange={handleChangeIndex}
          />
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-start">
        <IonCol size="8">
          <SmallTextInput
            placeholder="Google, Elastos Foundation, ..."
            label="Organization Name"
            name="institution"
            value={experienceItem.institution}
            onChange={handleChangeIndex}
          />
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-start">
        <IonCol size="4.5">
          <SmallTextInput
            placeholder="start"
            label="Duration"
            name="start"
            type="date"
            value={experienceItem.start}
            onChange={handleChangeIndex}
          />
        </IonCol>
        <IonCol size="4.5">
          <SmallTextInput
            placeholder="end"
            label="&nbsp;"
            name="end"
            type="date"
            value={experienceItem.end}
            onChange={handleChangeIndex}
          />
        </IonCol>
        <IonCol size="auto" class="ion-align-self-end">
          <IonCheckbox onIonChange={handleChangeIndex} />
        </IonCol>
      </IonRow>
      <IonRow class="ion-justify-content-start">
        <IonCol size="8">
          <IonLabel>Description</IonLabel>
          <MyTextarea
            placeholder="..."
            rows={3}
            name="description"
            value={experienceItem.description}
            onIonChange={handleChangeIndex}
          />
        </IonCol>
      </IonRow>
    </MyGrid>
  );
};

export default ExperienceCardEdit;
