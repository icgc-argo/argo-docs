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

const schemasAvailable = require('../static/data/schemas/schema-versions.json');

export const getLatestVersion = () =>
  schemasAvailable
    .sort()
    .map((schema) => schema.version)
    .slice(-1)[0];

export const getEnvironment = () => ({
  IS_SEARCH_ENABLED: process.env.IS_SEARCH_ENABLED === 'true',
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  ALGOLIA_INDEX: process.env.ALGOLIA_INDEX,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
});

const { IS_SEARCH_ENABLED, ALGOLIA_API_KEY, ALGOLIA_INDEX, ALGOLIA_APP_ID } = getEnvironment();

export const isSearchAvailable =
  IS_SEARCH_ENABLED && ALGOLIA_API_KEY && ALGOLIA_INDEX && ALGOLIA_APP_ID;
