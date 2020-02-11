import React from 'react';
import Typography from '@icgc-argo/uikit/Typography';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Cont = styled('div')`
  margin-top: 14px;
  border-left: 2px solid ${({ color, theme }) => (color ? color : theme.colors.secondary)};
`;

const Anchor = styled('a')`
  color: ${({ disabled, theme }) => (disabled ? theme.colors.grey_1 : theme.colors.primary)};

  &.active {
    > div {
      background-color: ${({ theme }) => theme.colors.secondary_4};
    }

    & {
      color: ${({ theme }) => theme.colors.secondary_dark};
    }
  }
`;

const MenuItem = ({ name, onClick, disabled, className }) => {
  return (
    <Anchor onClick={onClick} disabled={disabled}>
      <div
        css={css`
          padding: 8px 0 8px 16px;

          &:hover {
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
          }
        `}
        onClick={onClick}
      >
        <Typography variant="data">{name}</Typography>
      </div>
    </Anchor>
  );
};

const Menu = ({ title, contents, color, scrollYOffset = 0 }) => {
  return (
    <div>
      <Typography variant="sectionHeader" color="primary">
        {title}
      </Typography>
      <Cont color={color}>
        {contents.map(({ name, contentRef, disabled }, index) => (
          <MenuItem
            key={index}
            name={name}
            disabled={disabled}
            onClick={() => {
              if (!disabled && contentRef && contentRef.current) {
                window.scrollTo(0, contentRef.current.offsetTop - scrollYOffset);
              }
            }}
          />
        ))}
      </Cont>
    </div>
  );
};

export default Menu;
