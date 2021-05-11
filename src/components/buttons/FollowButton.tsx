import styled from 'styled-components';

interface Props {
  width?: number;
}

const FollowButton = styled.button<Props>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  opacity: 1;
  text-align: center;
  text-transform: none;
  letter-spacing: 0px;

  font-family: 'SF Pro Display';
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  font-size: 12px;

  padding: 0px 20px;
  width: 100px;
  height: 40px;
  line-height: 40px;

  background: white;
  border-radius: 9px;
  color: #4c6fff;
  border: 1px solid #4c6fff;
`;

export default FollowButton;
