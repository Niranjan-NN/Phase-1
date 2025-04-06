import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
import chalk from 'chalk';
import { CronJob } from 'cron';
import { backup, setConfig } from './utils/backup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

program
  .option('-s, --source <path>', 'Source directory')
  .option('-d, --destination <path>', 'Destination directory')
  .option('-n, --num <number>', 'Max backups to keep', '5')
  .option('-c, --cron <expression>', 'Cron expression for scheduling')
  .parse(process.argv);

const options = program.opts();

if (!options.source || !options.destination) {
  console.log(chalk.red('Error: Source and destination paths are required.'));
  process.exit(1);
}

setConfig({
  source: path.resolve(options.source),
  destination: path.resolve(options.destination),
  maxBackups: parseInt(options.num),
});

if (options.cron) {
  const job = new CronJob(options.cron, backup);
  job.start();
  console.log(chalk.green(`Scheduled backups set with cron: ${options.cron}`));
} else {
  backup();
}
