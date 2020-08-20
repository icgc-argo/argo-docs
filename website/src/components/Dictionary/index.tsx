import React from 'react';
import find from 'lodash/find';
import startCase from 'lodash/startCase';
import Schema from '../Schema';

const Dictionary = ({ schemas, menuContents, isLatestSchema, isDiffShowing }) =>
  schemas.length > 0 ? (
    schemas.map((schema) => {
      const menuItem = find(menuContents, { name: startCase(schema.name) });

      return (
        <Schema
          key={schema.name}
          schema={schema}
          menuItem={menuItem}
          isLatestSchema={isLatestSchema}
          isDiffShowing={isDiffShowing}
        />
      );
    })
  ) : (
    <div>No results found</div>
  );

export default Dictionary;
