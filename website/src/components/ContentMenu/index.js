/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY                           
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES                          
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT                           
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,                                
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED                          
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;                               
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER                              
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN                         
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *  
 *
 */

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
