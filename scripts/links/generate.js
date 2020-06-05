const fse = require('fs-extra');
const chalk = require('chalk');
const fm = require('front-matter');
const get = require('lodash/get');
const { resolve } = require('path');

const DOCS_FOLDER = '../docs';
const OUTPUT = './links/links.js';
const FRONT_MATTER_KEY = 'platform_key';
const FRONT_MATTER_ID = 'id';
const URL_ROOT = 'DOCS_URL_ROOT';

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

const docsUrlTag = (strings, key, path) =>
  `export const ${key}_PAGE = urljoin(${URL_ROOT},'${path}');`;

const generateLink = async (path) => {
  const content = await fse.readFile(path, 'utf8');
  const { attributes } = fm(content);
  const key = get(attributes, FRONT_MATTER_KEY, null);
  const id = get(attributes, FRONT_MATTER_ID, null);

  const docPath = path.substring(path.indexOf('/docs/'));
  // routing based on folder/id or file pathname if no id is present
  const url = id ? `${docPath.substring(0, docPath.lastIndexOf('/'))}/${id}` : docPath;
  console.log(url);
  return key ? docsUrlTag`${key}${url}` : null;
};

const generate = async () => {
  console.log(`${chalk.yellow('Generating links...')}`);
  const links = await traverse(DOCS_FOLDER);
  await fse.writeFile(OUTPUT, links);
};

generate();
