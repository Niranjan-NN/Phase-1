import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

let config = {};

export const setConfig = (cfg) => {
  config = cfg;
};

export const backup = async () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(config.destination, `backup-${timestamp}`);
  try {
    await fs.copy(config.source, backupPath);
    console.log(chalk.blue(`Backup created at ${backupPath}`));

    // Log backup
    const logFile = path.join(config.destination, 'backup-log.txt');
    await fs.appendFile(logFile, `${new Date().toISOString()} - Backup created at ${backupPath}\n`);

    // Manage max backups
    const backups = (await fs.readdir(config.destination))
      .filter((f) => f.startsWith('backup-'))
      .sort((a, b) => fs.statSync(path.join(config.destination, b)).ctime - fs.statSync(path.join(config.destination, a)).ctime);

    while (backups.length > config.maxBackups) {
      const toRemove = backups.pop();
      await fs.remove(path.join(config.destination, toRemove));
      console.log(chalk.yellow(`Old backup removed: ${toRemove}`));
    }
  } catch (err) {
    console.error(chalk.red('Backup failed:'), err);
  }
};
