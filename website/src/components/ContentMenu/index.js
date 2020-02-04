import React from 'react';
import Menu from '@icgc-argo/uikit/ContentMenu';
import useTOCHighlight from '../../hooks/useTOCHighlight';
import kebabCase from 'lodash/kebabCase';
import { styled } from '@icgc-argo/uikit';

const DEFAULT_ANCHOR_CLASSNAME = 'content-anchor';

const getAnchorClassname = (contentPrefix = '') =>
  `${contentPrefix ? `${contentPrefix}-` : ''}${DEFAULT_ANCHOR_CLASSNAME}`;

const ContentMenu = ({ contentPrefix, ...props }) => {
  const anchorClassname = getAnchorClassname(contentPrefix);
  useTOCHighlight(anchorClassname);
  return <Menu {...props} />;
};

/**
 * title prop
 * children can be any element
 * this way we can style the heading anyway we want and keep the anchor isolated
 * instead of trying to style an anchor explicilty each time
 * some redunnancy with adding a title twice
 *
 * <ContentAnchor title="my anchor">
 * <H3>my anchor</h3>
 * </ContentAnchor>
 *
 *  allow a custom component added
 */

const Anchor = styled('a')`
  text-decoration: none;

  &:hover {
    text-decoration: none;
    cursor: default;
  }
`;

/**
 * Content anchor to denote a content menu section
 * @param {string} fragment - anchor fragment
 * @param {string} contentPrefix - ContentMenu associates ContentAnchor based on a common contentPrefix
 */
export const ContentAnchor = ({ fragment, children, contentPrefix = '' }) => (
  <Anchor href={`#${kebabCase(fragment)}`} className={getAnchorClassname(contentPrefix)}>
    {children}
  </Anchor>
);

export default ContentMenu;
