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

import { useHistory } from '@docusaurus/router';
import { isSearchAvailable } from '../utils';

/**
 * Expects id selector for input
 */
const useAlgolia = (inputRef, options = {}) => {
  const history = useHistory();

  if (!isSearchAvailable) {
    console.warn('Search not configured');
    return false;
  } else {
    // lazy load because docsearch module isn't SSR friendly
    import('docsearch.js')
      .then(({ default: docsearch }) => {
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
            const routePath =
              `#__docusaurus` === a.hash ? `${a.pathname}` : `${a.pathname}${a.hash}`;
            history.push(routePath);
          },
        });
      })
      .catch((e) => {
        console.warn('Search not available');
        return false;
      });
  }
};

export default useAlgolia;
