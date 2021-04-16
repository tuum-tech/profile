import React, { useState } from 'react';
import styled from 'styled-components';

import { MainCard, CardTitle } from './VerificationStatus';
import style from './style.module.scss';

const BadgeContainer = styled.div`
  display: flex;
`;

const Badge = styled.div`
  position: relative;
  width: 42px;
  height: 42px;
  display: block;
  margin-right: 10px;
`;

const ToolTip = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;

  color: #ffffff;

  padding: 5px 10px;
  background: #000000;

  box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.18), 0px 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 7px;
  margin-top: 10px;

  width: 120px;

  position: absolute;
  bottom: -40px;
  left: -20px;
`;

interface BadgeIconProps {
  children: any;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ children }) => (
  <svg
    width="19"
    height="15"
    viewBox="0 0 19 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={style['badge-icon']}
  >
    {children}
  </svg>
);

const BgImg = ({ bgColor = '#5C7DFF' }) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%'
    }}
  >
    <path
      d="M41.1757 24.5436L43.1492 22.0181L41.1757 19.4925L42.4314 16.5438L39.8746 14.6148L40.3206 11.4406L37.349 10.2399L36.9579 7.05817L33.7761 6.66709L32.5753 3.69556L29.4011 4.14155L27.4693 1.58194L24.5185 2.83476L21.993 0.861328L19.4674 2.83476L16.5128 1.58194L14.5839 4.13872L11.4096 3.6927L10.2799 6.48809L7.02705 7.05626L6.45887 10.309L3.66341 11.4388L4.08292 14.4245L1.55072 16.5438L2.62269 19.4708L0.830078 22.0209L2.62269 24.571L1.55072 27.4981L3.94277 29.4971L3.6653 32.6012L6.49296 33.9127L7.02799 36.9837L10.099 37.5187L11.4106 40.3463L14.5147 40.0688L16.5138 42.4608L19.4409 41.3889L21.9911 43.1814L24.5413 41.3889L27.4683 42.4608L29.4674 40.0688L32.5716 40.3463L33.9608 37.3511L36.9532 36.9837L37.3206 33.9913L40.3159 32.6021L40.0214 29.3134L42.4295 27.499L41.1757 24.5436Z"
      // fill="#5C7DFF"
      fill={bgColor}
    />
  </svg>
);

const Badges: React.FC = ({}) => {
  const [showBadgeNumber, setShowBadgeNumber] = useState(-1);

  const BadgeData = [
    {
      text: 'Beginners tutorial completed',
      completed: true
    },
    {
      text: 'Beginners tutorial completed',
      completed: false
    },
    {
      text: 'Beginners tutorial completed',
      completed: false
    },
    {
      text: 'Beginners tutorial completed',
      completed: false
    },
    {
      text: 'Beginners tutorial completed',
      completed: false
    }
  ];

  const rednerIcon = (index: number) => {
    if (index === 0) {
      return (
        <>
          <path
            d="M9.6509 7.85918C9.7768 7.90616 9.91542 7.90616 10.0413 7.85918L17.0613 5.22687V11.2953C17.4246 11.2006 17.8061 11.2006 18.1694 11.2953V4.81088L18.9563 4.52958C19.0616 4.48954 19.1524 4.41841 19.2164 4.32561C19.2804 4.23282 19.3147 4.12275 19.3147 4.01002C19.3147 3.89729 19.2804 3.78722 19.2164 3.69442C19.1524 3.60163 19.0616 3.53049 18.9563 3.49046L10.0413 0.160008C9.91537 0.113331 9.77686 0.113331 9.6509 0.160008L0.733416 3.48961C0.62803 3.52964 0.53731 3.60078 0.473296 3.69357C0.409282 3.78637 0.375 3.89643 0.375 4.00917C0.375 4.1219 0.409282 4.23197 0.473296 4.32476C0.53731 4.41756 0.62803 4.48869 0.733416 4.52872L9.6509 7.85918Z"
            fill="white"
          />
          <path
            d="M9.6509 7.85918C9.7768 7.90616 9.91542 7.90616 10.0413 7.85918L17.0613 5.22687V11.2953C17.4246 11.2006 17.8061 11.2006 18.1694 11.2953V4.81088L18.9563 4.52958C19.0616 4.48954 19.1524 4.41841 19.2164 4.32561C19.2804 4.23282 19.3147 4.12275 19.3147 4.01002C19.3147 3.89729 19.2804 3.78722 19.2164 3.69442C19.1524 3.60163 19.0616 3.53049 18.9563 3.49046L10.0413 0.160008C9.91537 0.113331 9.77686 0.113331 9.6509 0.160008L0.733416 3.48961C0.62803 3.52964 0.53731 3.60078 0.473296 3.69357C0.409282 3.78637 0.375 3.89643 0.375 4.00917C0.375 4.1219 0.409282 4.23197 0.473296 4.32476C0.53731 4.41756 0.62803 4.48869 0.733416 4.52872L9.6509 7.85918Z"
            fill="white"
          />
          <path
            d="M17.616 12.334C16.6672 12.334 15.9512 13.5274 15.9512 15.1087V16.2168C15.9512 16.2897 15.9655 16.3619 15.9934 16.4292C16.0213 16.4965 16.0622 16.5577 16.1137 16.6092C16.1652 16.6608 16.2264 16.7016 16.2937 16.7295C16.3611 16.7574 16.4332 16.7718 16.5061 16.7718H18.7225C18.8697 16.7718 19.0108 16.7133 19.1149 16.6092C19.219 16.5052 19.2774 16.364 19.2774 16.2168V15.1087C19.2808 13.5265 18.5656 12.334 17.616 12.334Z"
            fill="white"
          />
          <path
            d="M15.5869 6.96484L10.4313 8.89817C10.0552 9.03845 9.64118 9.03845 9.26512 8.89817L4.10779 6.96484C3.82833 7.99012 3.70532 9.05172 3.74294 10.1137C3.7438 10.2039 3.76661 10.2926 3.80939 10.372C3.85218 10.4514 3.91365 10.5193 3.98851 10.5696C4.06337 10.62 4.14936 10.6513 4.23905 10.661C4.32875 10.6707 4.41945 10.6584 4.50333 10.6252C5.32636 10.3165 6.19412 10.1438 7.07262 10.1137C7.95913 10.2091 8.80098 10.5517 9.5021 11.1026C9.60067 11.1808 9.7228 11.2233 9.84862 11.2233C9.97445 11.2233 10.0966 11.1808 10.1951 11.1026C10.8926 10.5466 11.7355 10.2033 12.6229 10.1137C13.5014 10.1437 14.3692 10.3165 15.1922 10.6252C15.2761 10.6584 15.3668 10.6707 15.4565 10.661C15.5462 10.6513 15.6322 10.62 15.707 10.5696C15.7819 10.5193 15.8434 10.4514 15.8861 10.372C15.9289 10.2926 15.9517 10.2039 15.9526 10.1137C15.9888 9.05172 15.8655 7.9903 15.5869 6.96484Z"
            fill="white"
          />
        </>
      );
    } else if (index === 1) {
      return (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.85714 12.9405C5.85714 12.5789 6.14296 12.2857 6.49554 12.2857H17.9866C18.3392 12.2857 18.625 12.5789 18.625 12.9405C18.625 13.3021 18.3392 13.5952 17.9866 13.5952H6.49554C6.14296 13.5952 5.85714 13.3021 5.85714 12.9405Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.85714 7.70238C5.85714 7.34077 6.14296 7.04762 6.49554 7.04762H17.9866C18.3392 7.04762 18.625 7.34077 18.625 7.70238C18.625 8.064 18.3392 8.35714 17.9866 8.35714H6.49554C6.14296 8.35714 5.85714 8.064 5.85714 7.70238Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.85714 2.46429C5.85714 2.10267 6.14296 1.80952 6.49554 1.80952H17.9866C18.3392 1.80952 18.625 2.10267 18.625 2.46429C18.625 2.8259 18.3392 3.11905 17.9866 3.11905H6.49554C6.14296 3.11905 5.85714 2.8259 5.85714 2.46429Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.39338 0.691775C4.64268 0.947476 4.64268 1.36205 4.39338 1.61775L2.4782 3.58203C2.22889 3.83773 1.82468 3.83773 1.57537 3.58203L0.936981 2.92727C0.687673 2.67157 0.687673 2.257 0.936981 2.0013C1.18629 1.7456 1.5905 1.7456 1.8398 2.0013L2.02679 2.19307L3.49055 0.691775C3.73986 0.436075 4.14407 0.436075 4.39338 0.691775Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.39338 5.92987C4.64268 6.18557 4.64268 6.60014 4.39338 6.85584L2.4782 8.82013C2.22889 9.07583 1.82468 9.07583 1.57537 8.82013L0.936981 8.16537C0.687673 7.90967 0.687673 7.4951 0.936981 7.23939C1.18629 6.98369 1.5905 6.98369 1.8398 7.23939L2.02679 7.43117L3.49055 5.92987C3.73986 5.67417 4.14407 5.67417 4.39338 5.92987Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.39338 11.168C4.64268 11.4237 4.64268 11.8382 4.39338 12.0939L2.4782 14.0582C2.22889 14.3139 1.82468 14.3139 1.57537 14.0582L0.936981 13.4035C0.687673 13.1478 0.687673 12.7332 0.936981 12.4775C1.18629 12.2218 1.5905 12.2218 1.8398 12.4775L2.02679 12.6693L3.49055 11.168C3.73986 10.9123 4.14407 10.9123 4.39338 11.168Z"
            fill="white"
          />
        </>
      );
    } else if (index === 2) {
      return (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.85714 12.9405C5.85714 12.5789 6.14296 12.2857 6.49554 12.2857H17.9866C18.3392 12.2857 18.625 12.5789 18.625 12.9405C18.625 13.3021 18.3392 13.5952 17.9866 13.5952H6.49554C6.14296 13.5952 5.85714 13.3021 5.85714 12.9405Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.85714 7.70238C5.85714 7.34077 6.14296 7.04762 6.49554 7.04762H17.9866C18.3392 7.04762 18.625 7.34077 18.625 7.70238C18.625 8.064 18.3392 8.35714 17.9866 8.35714H6.49554C6.14296 8.35714 5.85714 8.064 5.85714 7.70238Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.85714 2.46429C5.85714 2.10267 6.14296 1.80952 6.49554 1.80952H17.9866C18.3392 1.80952 18.625 2.10267 18.625 2.46429C18.625 2.8259 18.3392 3.11905 17.9866 3.11905H6.49554C6.14296 3.11905 5.85714 2.8259 5.85714 2.46429Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.39338 0.691775C4.64268 0.947476 4.64268 1.36205 4.39338 1.61775L2.4782 3.58203C2.22889 3.83773 1.82468 3.83773 1.57537 3.58203L0.936981 2.92727C0.687673 2.67157 0.687673 2.257 0.936981 2.0013C1.18629 1.7456 1.5905 1.7456 1.8398 2.0013L2.02679 2.19307L3.49055 0.691775C3.73986 0.436075 4.14407 0.436075 4.39338 0.691775Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.39338 5.92987C4.64268 6.18557 4.64268 6.60014 4.39338 6.85584L2.4782 8.82013C2.22889 9.07583 1.82468 9.07583 1.57537 8.82013L0.936981 8.16537C0.687673 7.90967 0.687673 7.4951 0.936981 7.23939C1.18629 6.98369 1.5905 6.98369 1.8398 7.23939L2.02679 7.43117L3.49055 5.92987C3.73986 5.67417 4.14407 5.67417 4.39338 5.92987Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.39338 11.168C4.64268 11.4237 4.64268 11.8382 4.39338 12.0939L2.4782 14.0582C2.22889 14.3139 1.82468 14.3139 1.57537 14.0582L0.936981 13.4035C0.687673 13.1478 0.687673 12.7332 0.936981 12.4775C1.18629 12.2218 1.5905 12.2218 1.8398 12.4775L2.02679 12.6693L3.49055 11.168C3.73986 10.9123 4.14407 10.9123 4.39338 11.168Z"
            fill="white"
          />
        </>
      );
    } else if (index === 3) {
      return (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.85714 12.9405C5.85714 12.5789 6.14296 12.2857 6.49554 12.2857H17.9866C18.3392 12.2857 18.625 12.5789 18.625 12.9405C18.625 13.3021 18.3392 13.5952 17.9866 13.5952H6.49554C6.14296 13.5952 5.85714 13.3021 5.85714 12.9405Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.85714 7.70238C5.85714 7.34077 6.14296 7.04762 6.49554 7.04762H17.9866C18.3392 7.04762 18.625 7.34077 18.625 7.70238C18.625 8.064 18.3392 8.35714 17.9866 8.35714H6.49554C6.14296 8.35714 5.85714 8.064 5.85714 7.70238Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.85714 2.46429C5.85714 2.10267 6.14296 1.80952 6.49554 1.80952H17.9866C18.3392 1.80952 18.625 2.10267 18.625 2.46429C18.625 2.8259 18.3392 3.11905 17.9866 3.11905H6.49554C6.14296 3.11905 5.85714 2.8259 5.85714 2.46429Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.39338 0.691775C4.64268 0.947476 4.64268 1.36205 4.39338 1.61775L2.4782 3.58203C2.22889 3.83773 1.82468 3.83773 1.57537 3.58203L0.936981 2.92727C0.687673 2.67157 0.687673 2.257 0.936981 2.0013C1.18629 1.7456 1.5905 1.7456 1.8398 2.0013L2.02679 2.19307L3.49055 0.691775C3.73986 0.436075 4.14407 0.436075 4.39338 0.691775Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.39338 5.92987C4.64268 6.18557 4.64268 6.60014 4.39338 6.85584L2.4782 8.82013C2.22889 9.07583 1.82468 9.07583 1.57537 8.82013L0.936981 8.16537C0.687673 7.90967 0.687673 7.4951 0.936981 7.23939C1.18629 6.98369 1.5905 6.98369 1.8398 7.23939L2.02679 7.43117L3.49055 5.92987C3.73986 5.67417 4.14407 5.67417 4.39338 5.92987Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.39338 11.168C4.64268 11.4237 4.64268 11.8382 4.39338 12.0939L2.4782 14.0582C2.22889 14.3139 1.82468 14.3139 1.57537 14.0582L0.936981 13.4035C0.687673 13.1478 0.687673 12.7332 0.936981 12.4775C1.18629 12.2218 1.5905 12.2218 1.8398 12.4775L2.02679 12.6693L3.49055 11.168C3.73986 10.9123 4.14407 10.9123 4.39338 11.168Z"
            fill="white"
          />
        </>
      );
    } else if (index === 4) {
      return (
        <>
          <g clipPath="url(#clip0)">
            <path
              d="M8.35 9.98214C8.35 9.67134 8.44677 9.36752 8.62808 9.1091C8.80938 8.85068 9.06707 8.64927 9.36857 8.53033C9.67007 8.41139 10.0018 8.38028 10.3219 8.44091C10.642 8.50154 10.936 8.65121 11.1667 8.87098C11.3975 9.09074 11.5546 9.37075 11.6183 9.67557C11.682 9.9804 11.6493 10.2964 11.5244 10.5835C11.3995 10.8706 11.188 11.1161 10.9167 11.2887C10.6453 11.4614 10.3263 11.5536 10 11.5536C9.56279 11.5523 9.14387 11.3864 8.83472 11.0919C8.52556 10.7975 8.35131 10.3985 8.35 9.98214ZM6.535 14.4607L5.2975 13.3607L6.535 12.1821C6.10667 11.5206 5.87829 10.7593 5.875 9.98214C5.86637 9.22793 6.09635 8.48871 6.535 7.86071L5.2975 6.68214L6.535 5.50357L7.69 6.68214C8.38327 6.27132 9.18348 6.05357 10 6.05357C10.8165 6.05357 11.6167 6.27132 12.31 6.68214L13.5475 5.50357L14.7025 6.60357L13.465 7.78214C13.8964 8.4424 14.125 9.2045 14.125 9.98214C14.125 10.7598 13.8964 11.5219 13.465 12.1821L14.7025 13.3607L13.5475 14.4607L12.31 13.2821C11.6154 13.6901 10.8161 13.9076 10 13.9107C9.20808 13.9189 8.4319 13.6999 7.7725 13.2821L6.535 14.4607ZM10 7.625C9.51049 7.625 9.03198 7.76324 8.62496 8.02225C8.21795 8.28126 7.90072 8.64939 7.7134 9.0801C7.52607 9.51082 7.47706 9.98476 7.57256 10.442C7.66805 10.8992 7.90378 11.3192 8.24991 11.6489C8.59605 11.9785 9.03705 12.203 9.51715 12.294C9.99725 12.3849 10.4949 12.3383 10.9471 12.1599C11.3994 11.9815 11.7859 11.6793 12.0579 11.2917C12.3298 10.9041 12.475 10.4483 12.475 9.98214C12.481 9.67103 12.421 9.36197 12.2988 9.07342C12.1765 8.78487 11.9944 8.52276 11.7634 8.30273C11.5324 8.08271 11.2571 7.90929 10.9542 7.79285C10.6512 7.6764 10.3267 7.61932 10 7.625ZM16.6 2.125C17.0372 2.12624 17.4561 2.2922 17.7653 2.58663C18.0744 2.88107 18.2487 3.28004 18.25 3.69643V16.2679C18.2487 16.6842 18.0744 17.0832 17.7653 17.3777C17.4561 17.6721 17.0372 17.838 16.6 17.8393H15.775V18.625H12.475V17.8393H7.525V18.625H4.225V17.8393H3.4C2.96279 17.838 2.54387 17.6721 2.23472 17.3777C1.92556 17.0832 1.75131 16.6842 1.75 16.2679V3.69643C1.75131 3.28004 1.92556 2.88107 2.23472 2.58663C2.54387 2.2922 2.96279 2.12624 3.4 2.125H16.6ZM16.6 16.2679V3.69643H3.4V16.2679H16.6Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="16.5"
                height="16.5"
                fill="white"
                transform="translate(1.75 2.125)"
              />
            </clipPath>
          </defs>
        </>
      );
    }
  };

  return (
    <MainCard>
      <CardTitle>Badges</CardTitle>
      <BadgeContainer>
        {BadgeData.map((b, index) => (
          <Badge
            onMouseEnter={() => setShowBadgeNumber(index)}
            onMouseLeave={() => setShowBadgeNumber(-1)}
            key={index}
          >
            <BgImg bgColor={b.completed ? '#5C7DFF' : '#E7E8ED'} />
            <BadgeIcon>{rednerIcon(index)}</BadgeIcon>
            {showBadgeNumber === index && (
              <ToolTip>{BadgeData[showBadgeNumber].text}</ToolTip>
            )}
          </Badge>
        ))}
      </BadgeContainer>
    </MainCard>
  );
};

export default Badges;
