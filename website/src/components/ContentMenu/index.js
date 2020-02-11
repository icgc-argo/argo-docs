import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { useMenuHighlight } from './hooks';
import Menu from './menu';

const DEFAULT_SECTION_CLASSNAME = 'menu-content-section';
const DEFAULT_ANCHOR_CLASSNAME = 'menu-anchor';

const ContentMenu = ({ contentPrefix, scrollYOffset, ...props }) => {
  useMenuHighlight(DEFAULT_SECTION_CLASSNAME, DEFAULT_ANCHOR_CLASSNAME, scrollYOffset);
  return (
    <Menu scrollYOffset={scrollYOffset} anchorClassName={DEFAULT_ANCHOR_CLASSNAME} {...props} />
  );
};

/**
 * Content section, should wrap whole section
 */
export const ContentSection = ({ title, children }) => (
  <div id={`${kebabCase(title)}`} className={DEFAULT_SECTION_CLASSNAME}>
    {children}
  </div>
);

export default ContentMenu;
