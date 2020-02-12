import React from 'react';
import Menu from '@icgc-argo/uikit/ContentMenu';

const useMenuHighlight = (schemaRefs, scrollYOffset) => {
  const [activeItemName, setActiveItemName] = React.useState('');

  React.useEffect(() => {
    const findActiveSection = () => {
      const focusedDomEl = schemaRefs.find(ref => {
        if (ref && ref.current) {
          const { top } = ref.current.getBoundingClientRect();
          if (top >= 0 && top <= scrollYOffset) {
            return ref.current;
          }
        }
      });

      return focusedDomEl ? focusedDomEl.current : null;
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
  return <Menu contents={data} scrollYOffset={scrollYOffset} {...props} />;
};

export default SchemaMenu;
