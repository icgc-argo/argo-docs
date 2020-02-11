import React from 'react';
import { useMenuHighlight } from './hooks';
import Menu from './menu';

const DEFAULT_SECTION_CLASSNAME = 'menu-content-section';
const DEFAULT_ANCHOR_CLASSNAME = 'menu-anchor';

const SchemaMenu = ({ contents, ...props }) => {
  const schemaRefs = contents.map(schema => schema.contentRef);
  //useMenuHighlight(schemaRefs, DEFAULT_ANCHOR_CLASSNAME, scrollYOffset);
  return <Menu contents={contents} {...props} />;
};

/**
 * Content section, should wrap whole section
 */
export const ContentSection = ({ title, children }) => (
  <div className={DEFAULT_SECTION_CLASSNAME}>{children}</div>
);

export default SchemaMenu;
