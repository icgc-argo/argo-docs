const fse = require('fs-extra');
const chalk = require('chalk');
const fm = require('front-matter');
const get = require('lodash/get');
const { resolve } = require('path');

const DOCS_FOLDER = '../docs';
const OUTPUT = './links.js';
const FRONT_MATTER_KEY = 'platform_key';

const traverse = async (path) => {
  const startingPaths = await fse.readdir(path, { withFileTypes: true });
  const links = await Promise.all(
    startingPaths.map(async (pathEntry) => {
      const resPath = resolve(path, pathEntry.name);
      return pathEntry.isDirectory() ? traverse(resPath) : generateLink(resPath);
    }),
  );
  return Array.prototype
    .concat(...links)
    .filter(Boolean)
    .join('');
};

const docsUrlTag = (strings, key, path) => `export const ${key} = '${path}';`;

const generateLink = async (path) => {
  const content = await fse.readFile(path, 'utf8');
  const { attributes } = fm(content);
  const key = get(attributes, FRONT_MATTER_KEY, null);
  return key ? docsUrlTag`${key}${path}` : null;
};

const generate = async () => {
  console.log(`${chalk.yellow('Generating links...')}`);
  const links = await traverse(DOCS_FOLDER);
  await fse.writeFile(OUTPUT, links);
};

generate();
