import React from 'react';
import { useMenuHighlight } from './hooks';
import Menu from './menu';

const SchemaMenu = ({ contents, ...props }) => {
  const schemaRefs = contents.map(schema => schema.contentRef);
  //useMenuHighlight(schemaRefs, DEFAULT_ANCHOR_CLASSNAME, scrollYOffset);
  return <Menu contents={contents} {...props} />;
};

export default SchemaMenu;
