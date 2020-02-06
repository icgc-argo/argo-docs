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
