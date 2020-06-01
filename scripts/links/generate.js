const fse = require('fs-extra');
const chalk = require('chalk');
const fm = require('front-matter');
const get = require('lodash/get');

const DOCS_FOLDER = '/docs';
const OUTPUT = './links.json';
const FM_KEY = 'platform_key';

const generate = () => {
  console.log(`${chalk.yellow('Generating links...')}`);
  fse
    .readFile('../docs/data-access.md', 'utf8')
    .then((content) => {
      const { attributes } = fm(content);
      const key = get(attributes, FM_KEY, null);
      console.log(key);
    })
    .catch((e) => console.error(e));
};

generate();
