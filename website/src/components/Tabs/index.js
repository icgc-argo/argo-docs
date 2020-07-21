import { styled } from '@icgc-argo/uikit';
import { Tab } from '@icgc-argo/uikit/Tabs';

export const TAB_STATE = Object.freeze({
  OVERVIEW: 'OVERVIEW',
  DETAILS: 'DETAILS',
});

export const StyledTab = styled(Tab)`
  border: 0 none;
  position: relative;
  color: black;
  font-size: 15px;
  &.active {
    border: 0 none;
    ::after {
      content: '';
      border-bottom: 2px solid #00c79d;
      position: absolute;
      bottom: -2px;
      left: 50%;
      width: 80%;
      margin-left: -40%;
    }
  }
`;
