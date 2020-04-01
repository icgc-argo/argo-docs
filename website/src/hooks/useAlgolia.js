import React from 'react';
import { useHistory } from '@docusaurus/router';

/**
 * Expects id selector for input
 */
const useAlgolia = (inputRef, options = {}) => {
  const history = useHistory();

  const [currentInput, setCurrentInput] = React.useState();
  React.useEffect(() => {
    setCurrentInput(inputRef.current);
  }, []);

  if (!process.env.ALGOLIA_API_KEY || !process.env.ALGOLIA_INDEX) {
    console.warn('Search not configured');
  } else if (currentInput && window) {
    // lazy load because docsearch module isn't SSR friendly
    import('docsearch.js').then(({ default: docsearch }) => {
      docsearch({
        // debug: true,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX,
        inputSelector: `#${inputRef.current.id}`,
        algoliaOptions: options,
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
    });
  } else {
    console.warn('Search not available');
  }
};

export default useAlgolia;
