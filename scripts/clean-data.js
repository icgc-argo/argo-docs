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

const chalk = require('chalk');
const fse = require('fs-extra');
const { dataDirPath, dataFilename } = require('./constants');

/**
 * Deletes all data files, keeps dir structure and empty schema-versions.json
 */
async function cleanDataFolder() {
  if (fse.existsSync(dataDirPath)) {
    try {
      console.log(chalk.yellow('Deleting data folder...'));
      await fse.remove(dataDirPath);
      console.log(chalk.yellow('Deleting data file in src...'));
      await fse.writeJSON(dataFilename, {
        dictionary: { schemas: [] },
        versions: [],
        currentVersion: null,
      });
      console.log(chalk.yellow('Creating placeholder folders...'));
      await fse.mkdir(`${dataDirPath}/diffs`, { recursive: true });
      console.log(chalk.yellow('Creating schema versions file...'));
      await fse.writeJson(`${dataDirPath}/schema-versions.json`, []);
    } catch (err) {
      console.log(chalk.red('Error deleting data'));
      console.error(err);
    }
  } else {
    console.log(chalk.red(`Data directory doesn't exist`));
  }
}

cleanDataFolder();
