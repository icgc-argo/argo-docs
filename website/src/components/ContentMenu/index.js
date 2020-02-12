import React from 'react';
import Menu from '@icgc-argo/uikit/ContentMenu';

const useMenuHighlight = (schemaRefs, scrollYOffset) => {
  const [activeItemName, setActiveItemName] = React.useState('');

  React.useEffect(() => {
    const findActiveSection = () => {
      const focusedDomEls =
        schemaRefs.length > 0 &&
        schemaRefs.filter(ref => {
          if (ref && ref.current) {
            const { top } = ref.current.getBoundingClientRect();
            if (top >= 0 && top <= scrollYOffset) {
              return ref.current;
            }
          }
        });

      return focusedDomEls.length > 0 ? focusedDomEls[0].current : null;
    };

    const onscroll = e => {
      const domElementInFocus = findActiveSection();
      if (domElementInFocus) {
        const activeName = domElementInFocus.dataset.menuTitle;
        setActiveItemName(activeName);
      }
    };
    document.addEventListener('scroll', onscroll);
    return () => document.removeEventListener('scroll', onscroll);
  }, [schemaRefs]);

  return activeItemName;
};

const SchemaMenu = ({ contents, scrollYOffset, ...props }) => {
  const schemaRefs = contents.map(schema => schema.contentRef);
  const activeItemName = useMenuHighlight(schemaRefs, scrollYOffset);
  const data = contents.map(item =>
    item.name === activeItemName ? { ...item, active: true } : item,
  );
  return <Menu contents={data} scrollYOffset={scrollYOffset} />;
};

export default SchemaMenu;
