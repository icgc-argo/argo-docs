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
import generateTreeData from './generateData';
import generateDiffChanges from './generateDiffData';

const constants = require('./constants');

const apiRoot = process.env.LECTERN_ROOT;
const { dictionaryName, schemaPath, versionsFilename, dataFilename, dataFileTreeName } = constants;
const currentVersions = require(versionsFilename);

/* Util Functions */
function ensureDirectoryExistence(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

function printConfig() {
  console.log(`${chalk.yellow('Lectern Root')}: ${apiRoot}`);
  console.log(`${chalk.yellow('Dictionary Name')}: ${dictionaryName}`);
}

async function printVersionsLists() {
  const versions = await fetchDictionaryVersionsList();

  const newVersions = versions.filter((item) => !currentVersions.includes(item));

  console.log(`\n${chalk.yellow('All Versions')}: ${versions.join(', ')}`);
  console.log(`${chalk.yellow('Current Versions')}: ${currentVersions.join(', ')}`);
  console.log(`\n${chalk.yellow('New Versions')}: ${newVersions.join(', ')}`);
  return newVersions;
}

function saveFiles(version, data) {
  const dataFile = `${schemaPath}/${version}.json`;
  const treeFile = `${schemaPath}/${version}_tree.json`;
  fse.writeJSONSync(dataFile, data);
  // const treeData = generateTreeData(data);
  // fse.writeJSONSync(treeFile, treeData);
}

function saveVersionsFile(data) {
  fs.writeFileSync(versionsFilename, JSON.stringify(data));
}

// The data file is the file used on load in the data dictionary.
function saveDataFiles(dictionary, versions) {
  const content = {
    dictionary,
    versions,
    currentVersion: versions[0],
  };
  fs.writeFileSync(dataFilename, JSON.stringify(content));
  //const treeData = generateTreeData(content.dictionary);
  //fse.writeJSONSync(dataFileTreeName, treeData);
}

async function fetchAndSaveDiffsForVersion(version) {
  for (let i = 0; i < currentVersions.length; i++) {
    const otherVersion = currentVersions[i];

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
        `${chalk.cyan('saving diff for versions')} ${high} ${chalk.cyan('and')} ${low} ${chalk.cyan(
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
    }
  }
}

/* Lectern API */

async function fetchDictionaryVersionsList() {
  console.log(chalk.cyan('\nfetching dictionary versions list...'));
  const response = await axios.get(`${apiRoot}/dictionaries`);
  return response.data
    .filter((item) => item.name === dictionaryName)
    .map((item) => item.version)
    .sort((a, b) => (a.version > b.version ? 1 : -1));
}

async function fetchDictionaryForVersion(version) {
  console.log(`${chalk.cyan('\nfetching dictionary for version')} ${version} ${chalk.cyan('...')}`);
  const response = await axios.get(
    `${apiRoot}/dictionaries?${querystring.stringify({ name: dictionaryName, version })}`,
  );
  return response.data[0];
}

async function fetchDiffForVersions(left, right) {
  console.log(
    `${chalk.cyan('\nfetching diff for versions')} ${left} ${chalk.cyan(
      'vs',
    )} ${right} ${chalk.cyan('...')}`,
  );
  const response = await axios.get(
    `${apiRoot}/diff?${querystring.stringify({ name: dictionaryName, left, right })}`,
  );
  return response.data;
}

/* User Prompts */

async function userSelectVersion(versions) {
  console.log('\n');
  return new Promise((resolve) =>
    inquirer
      .prompt([
        { message: 'Select version to add:', name: 'version', type: 'list', choices: versions },
      ])
      .then((answers) => resolve(answers.version)),
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
  const selectedVersion = await userSelectVersion(newVersions);

  // Fetch the dictionary for this version and save data and tree files
  const dictionary = await fetchDictionaryForVersion(selectedVersion);
  saveFiles(selectedVersion, dictionary);

  console.log(chalk.cyan('dictionary saved...'));

  // Fetch all Diffs and save
  console.log(chalk.cyan('fetching diffs vs stored versions...'));
  await fetchAndSaveDiffsForVersion(selectedVersion);

  // Update versions file
  const updatedVersions = currentVersions.concat(selectedVersion).sort((v1, v2) => {
    const [v1Major, v1Minor] = v1.split('.').map(Number);
    const [v2Major, v2Minor] = v2.split('.').map(Number);
    if (v2Major === v1Major) {
      return v2Minor - v1Minor;
    } else {
      return v2Major - v1Major;
    }
  });
  console.log(chalk.cyan('\nupdating list of data dictionary versions...'));
  saveVersionsFile(updatedVersions);

  console.log(chalk.cyan('\nupdating data dictionary input file...'));
  saveDataFiles(dictionary, updatedVersions);

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
  } else if (argv.a || argv.add) {
    // ADD A NEW VERSION (first list all to show, then query the add)
    runAdd();
  } else {
    // HELP MENU
    runHelp();
  }
}

// MAIN!
run();
