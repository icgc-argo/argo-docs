/** @jsx jsx */
import { jsx } from '@emotion/core';
import Icon from '@icgc-argo/uikit/Icon';
import ButtonComp, { BUTTON_SIZES, BUTTON_VARIANTS } from '@icgc-argo/uikit/Button';
import { withTheme } from 'emotion-theming';
import { css } from '@emotion/core';

export const ResetIcon = ({ disabled }) => (
  <Icon
    name="reset"
    fill={disabled ? 'white' : 'accent2_dark'}
    height="12px"
    style={{
      marginRight: '5px',
    }}
  />
);

export const ResetButton = ({ children, onClick, disabled }) => (
  <ButtonComp variant="secondary" size="sm" onClick={onClick} disabled={disabled}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <ResetIcon disabled={disabled} />
      {children}
    </div>
  </ButtonComp>
);

export const ButtonWithIcon = ({
  children,
  onClick,
  disabled,
  variant = BUTTON_VARIANTS.SECONDARY,
  size = BUTTON_SIZES.SM,
  Icon = null,
}) => (
  <ButtonComp variant={variant} size={size} onClick={onClick} disabled={disabled}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {Icon ? <Icon disabled={disabled} /> : null}
      {children}
    </div>
  </ButtonComp>
);

const Button = withTheme(({ children, ...props }) => (
  <ButtonComp {...props}>
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
      `}
    >
      {children}
    </div>
  </ButtonComp>
));

export default Button;
