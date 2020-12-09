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

require('dotenv').config();

import axios from 'axios';
import chalk from 'chalk';
import inquirer from 'inquirer';
import querystring from 'querystring';
import fs from 'fs';
import { argv } from 'yargs';
import fse from 'fs-extra';
import generateDiffChanges from './generateDiffData';
import getConfig from './config';
import { schemaPath, versionsFilename } from './constants';

const config = getConfig();

/* Util Functions */
function ensureDirectoryExistence(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

function printConfig() {
  console.log(`${chalk.yellow('Lectern Root')}: ${config.apiRoot}`);
  console.log(`${chalk.yellow('Dictionary Name')}: ${config.dictionaryName}`);
}

//current versions not getting updateds
async function printVersionsLists() {
  const savedVersions = fse.readJSONSync(versionsFilename);
  const versions = await fetchDictionaryVersionsList();

  const availableVersions = versions.filter(
    (item) => savedVersions.find((cv) => cv.version === item) === undefined,
  );

  console.log(`\n${chalk.yellow('All Versions:')}\n${versions.join('\n')}`);
  console.log(
    `\n${chalk.yellow('Saved Versions:')}\n${savedVersions.map((v) => v.version).join('\n')}`,
  );
  console.log(`\n${chalk.yellow('Available Versions:')}\n${availableVersions.join('\n')}`);

  return availableVersions;
}

function saveFiles(version, data) {
  const dataFile = `${schemaPath}/${version}.json`;
  const treeFile = `${schemaPath}/${version}_tree.json`;
  fse.writeJSONSync(dataFile, data);
  // const treeData = generateTreeData(data);
  // fse.writeJSONSync(treeFile, treeData);
}

// The data file is the file used on load in the data dictionary.
function saveDataFiles(dictionary, versions) {
  const content = {
    dictionary,
    versions,
    currentVersion: versions[0],
  };
  fs.writeFileSync('../website/src/pages/dictionary/data.json', JSON.stringify(content));
  //const treeData = generateTreeData(content.dictionary);
  //fse.writeJSONSync(dataFileTreeName, treeData);
}

function saveVersionsFile(data) {
  fs.writeFileSync(versionsFilename, JSON.stringify(data));
}

async function fetchAndSaveDiffsForVersion(version, currentVersions) {
  for (let i = 0; i < currentVersions.length; i++) {
    const otherVersion = currentVersions[i].version;

    // Ternary with comparison instead of min/max to avoid removing the decimal when the version has a .0
    const high = parseFloat(version) > parseFloat(otherVersion) ? version : otherVersion;
    const low = parseFloat(version) < parseFloat(otherVersion) ? version : otherVersion;

    const pathHigh = `${schemaPath}/diffs/${high}`;
    const pathLow = `${schemaPath}/diffs/${low}`;
    const fileNameHL = `${pathHigh}/${high}-diff-${low}.json`;
    const fileNameLH = `${pathLow}/${low}-diff-${high}.json`;

    try {
      ensureDirectoryExistence(pathHigh);
      ensureDirectoryExistence(pathLow);
      console.log(
        `${chalk.cyan('Saving diff for versions')} ${high} ${chalk.cyan('and')} ${low} ${chalk.cyan(
          '...',
        )}`,
      );

      const schemaDiffHL = await fetchDiffForVersions(high, low);
      const schemaDiffLH = await fetchDiffForVersions(low, high);
      const diffsHL = generateDiffChanges(schemaDiffHL);
      const diffsLH = generateDiffChanges(schemaDiffLH);
      fse.writeJSONSync(fileNameLH, diffsLH);
      fse.writeJSONSync(fileNameHL, diffsHL);
    } catch (e) {
      console.log(chalk.red(`Error fetching or saving diff!`, e));
      throw new Error(e);
    }
  }
}

const versionSort = (v1, v2) => {
  // sort version strings eg. 1.0, 0.10, 0.1
  const [v1Major, v1Minor] = v1.split('.').map(Number);
  const [v2Major, v2Minor] = v2.split('.').map(Number);
  if (v2Major === v1Major) {
    return v1Minor - v2Minor;
  } else {
    return v1Major - v2Major;
  }
};

/* Lectern API */
async function fetchDictionaryVersionsList() {
  console.log(chalk.cyan('\nFetching dictionary versions list...'));
  const response = await axios.get(`${config.apiRoot}/dictionaries`);
  return response.data
    .filter((item) => item.name === config.dictionaryName)
    .map((item) => item.version)
    .sort(versionSort);
}

async function fetchDictionaryForVersion(version) {
  console.log(`${chalk.cyan('\nfetching dictionary for version')} ${version} ${chalk.cyan('...')}`);
  const response = await axios.get(
    `${config.apiRoot}/dictionaries?${querystring.stringify({
      name: config.dictionaryName,
      version,
    })}`,
  );
  return response.data[0];
}

async function fetchDiffForVersions(left, right) {
  console.log(
    `${chalk.cyan('Fetching diff for versions')} ${left} ${chalk.cyan('vs')} ${right} ${chalk.cyan(
      '...',
    )}`,
  );
  const response = await axios.get(
    `${config.apiRoot}/diff?${querystring.stringify({ name: config.dictionaryName, left, right })}`,
  );
  return response.data;
}

/* User Prompts */
async function userSelectVersion(versions): Promise<string[]> {
  console.log('\n');
  return new Promise((resolve) =>
    inquirer
      .prompt([
        {
          message: 'Select versions to add:',
          name: 'versions',
          type: 'checkbox',
          choices: versions,
        },
      ])
      .then((answers) => resolve(answers.versions)),
  );
}

/* SCRIPT MODES */
function runList() {
  console.log(chalk.green(`Listing all available dictionary versions:`));
  printConfig();
  printVersionsLists();
}

async function runAdd() {
  console.log(chalk.green(`Lets add a new dicitonary version!`));
  printConfig();
  console.log(chalk.green(`\nListing all available dictionary versions:`));

  const newVersions = await printVersionsLists();

  // User select a version
  const selectedVersions = await userSelectVersion(newVersions);

  for await (const selectedVersion of selectedVersions) {
    const currentVersions = fse.readJSONSync(versionsFilename);

    // Fetch the dictionary for this version and save data and tree files
    const dictionary = await fetchDictionaryForVersion(selectedVersion);
    saveFiles(selectedVersion, dictionary);

    console.log(chalk.cyan('Dictionary saved...'));

    // Fetch all Diffs and save
    console.log(chalk.cyan('Fetching diffs vs stored versions...'));
    await fetchAndSaveDiffsForVersion(selectedVersion, currentVersions);

    // Update versions file
    console.log(chalk.cyan('Updating list of data dictionary versions...'));
    const updatedVersions = currentVersions
      .concat({ version: selectedVersion, date: dictionary.updatedAt || '' })
      // desc order for display eg. 1.0, 0.9, 0.2
      .sort((a, b) => versionSort(b.version, a.version));
    saveVersionsFile(updatedVersions);
    console.log(chalk.cyan('\n=================================\n'));

    console.log(chalk.cyan('\nupdating data dictionary input file...'));
    saveDataFiles(dictionary, updatedVersions);
  }

  console.log(chalk.green('\n\nALL CHANGES COMPLETE :D'));

  process.exit(0);
}

function runHelp() {
  if (argv.npm) {
    console.log(`${chalk.yellow('--=')} Data Dictionary Scripts Help ${chalk.yellow('=--')}\n\n`);
    console.log(
      `${chalk.green(
        'npm run list',
      )} \t- Display list of available dictionary versions from lectern, \n\t\t   along with list of all versions that are not yet downloaded to the Data Dictionary.`,
    );
    console.log(
      `${chalk.green(
        'npm run add',
      )} \t- Select a dictionary version to add to the data dictionary.`,
    );
    console.log('\n');
  } else {
    console.log(`NODE HELP MENU`);
    console.log('\n');
  }
}

function run() {
  if (argv.l || argv.list) {
    // LIST ALL VERSIONS
    runList();
  } else if (argv.add) {
    // ADD A NEW VERSION (first list all to show, then query the add)
    runAdd();
  } else {
    // HELP MENU
    runHelp();
  }
}

// MAIN!
run();
