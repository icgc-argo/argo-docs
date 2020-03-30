import React, { useRef } from 'react';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import docsearch from 'docsearch.js';

/**
 * Init Docsearch on an input (children)
 */
const DocSearch = ({ searchElId, children }) => {
  const initialized = useRef(false);
  const { siteConfig = {} } = useDocusaurusContext();
  const {
    themeConfig: { algolia },
  } = siteConfig;
  const history = useHistory();

  const initAlgolia = () => {
    if (!initialized.current) {
      docsearch({
        // debug: true,
        appId: algolia.appId,
        apiKey: algolia.apiKey,
        indexName: algolia.indexName,
        inputSelector: searchElId,
        algoliaOptions: algolia.algoliaOptions,
        // Override algolia's default selection event, allowing us to do client-side
        // navigation and avoiding a full page refresh.
        handleSelected: (_input, _event, suggestion) => {
          // Use an anchor tag to parse the absolute url into a relative url
          // Alternatively, we can use new URL(suggestion.url) but its not supported in IE
          const a = document.createElement('a');
          a.href = suggestion.url;

          // Algolia use closest parent element id #__docusaurus when a h1 page title does not have an id
          // So, we can safely remove it. See https://github.com/facebook/docusaurus/issues/1828 for more details.
          const routePath = `#__docusaurus` === a.hash ? `${a.pathname}` : `${a.pathname}${a.hash}`;
          history.push(routePath);
        },
      });
      initialized.current = true;
    }
  };

  React.useEffect(() => initAlgolia(), [children]);

  return <div>{children}</div>;
};

export default DocSearch;
