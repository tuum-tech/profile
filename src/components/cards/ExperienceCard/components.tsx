import { IonFooter, IonGrid, IonModal, IonTextarea } from '@ionic/react';
import styled from 'styled-components';

const Institution = styled.span`
  font-family: 'SF Pro Display';
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: left;
  color: #27272e;
`;

const Program = styled.span`
  font-family: 'SF Pro Display';
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.79;
  letter-spacing: normal;
  text-align: left;
  color: #27272e;
`;

const Period = styled.span`
  font-family: 'SF Pro Display';
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: normal;
  text-align: left;
  color: #27272e;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  text-align: center;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  background-color: #f7fafc;
`;

const LinkStyleSpan = styled.span`
  font-family: 'SF Pro Display';
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.07px;
  text-align: left;
  color: #4c6fff;
  cursor: default;
`;

const Description = styled.span`
  font-family: 'SF Pro Display';
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.62;
  letter-spacing: normal;
  text-align: left;
  color: rgba(66, 84, 102, 0.57);
`;

const MyModal = styled(IonModal)`
  --border-radius: 16px;
  --min-height: 200px;
  --height: 480px;
  --width: 560px;
`;

const TreeDotsButton = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  line-height: 0.5;
  margin: 1px 3px 2px 7px;
  padding: 5px 3px 5px 10px;
  border-radius: 22px;
  font-weight: bold;
  background-color: rgba(221, 221, 221, 0.24);
  color: #000;
  cursor: default;
`;

const PopoverMenuItem = styled.div`
  display: block;
  font-family: 'SF Pro Display';
  padding: 10px 10px 10px 20px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.07px;
  text-align: left;
  color: #000;
  cursor: pointer;
`;

const MyGrid = styled(IonGrid)`
  margin: 10px 20px 10px 20px;
  height: 100 %;
`;

const MyTextarea = styled(IonTextarea)`
  width: 90 %;
  margin-top: 8px;
  background: #edf2f7;
  box-shadow: 0px 1px 2px rgba(50, 50, 71, 0.08),
    0px 0px 1px rgba(50, 50, 71, 0.2);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.15;
  font-family: 'SF Pro Display';
  letter-spacing: normal;
  text-align: left;
  color: #6b829a;
  --padding-bottom: 8px;
  --padding-top: 9px;
  --padding-end: 16px;
  --padding-start: 16px;
  --placeholder-color: var(--input - muted - placeholder);
`;

const ModalFooter = styled(IonFooter)`
  padding: 12px;
`;

export {
  Institution,
  Program,
  Period,
  Divider,
  LinkStyleSpan,
  Description,
  MyModal,
  TreeDotsButton,
  PopoverMenuItem,
  MyGrid,
  ModalFooter,
  MyTextarea
};
