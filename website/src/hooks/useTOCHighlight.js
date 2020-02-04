import { useEffect } from 'react';
const useTOCHighlight = anchorClassname => {
  useEffect(() => {
    const findActiveAnchor = () => {
      const anchors = document.getElementsByClassName(anchorClassname);
      console.log('anchors', anchors);
    };

    const doStuff = () => {};

    document.addEventListener('scroll', doStuff);
    document.addEventListener('resize', doStuff);
    findActiveAnchor();

    return () => {
      document.removeEventListener('scroll', doStuff);
      document.removeEventListener('resize', doStuff);
    };
  });
};

export default useTOCHighlight;

/**
 * OPT TODO
 * do we need to find anchors every time?
 */
