import { AnimationBuilder } from '@ionic/react';
import { CSSProperties, ReactNode } from 'react';
import { IonIconType } from '../icons/types';

export interface ButtonProps {
  size?: 'default' | 'large' | 'small' | undefined;
  btnColor?:
    | 'primary'
    | 'secondary'
    | 'white'
    | 'primary-gradient'
    | 'secondary-gradient';
  variant?: 'text' | 'outlined' | 'contained';
  textType?: 'normal' | 'gradient';
  bgColor?: string;
  borderRadius?: string;
  borderColor?: string;
  icon?: IonIconType | null;
  style?: CSSProperties;
  children: ReactNode;
}

export interface DefaultButtonProps {
  onClick?: () => void;
}

export interface LinkButtonProps {
  href?: string | undefined;
  target?: string | undefined;
  routerAnimation?: AnimationBuilder | undefined;
  rel?: string | undefined;
}
