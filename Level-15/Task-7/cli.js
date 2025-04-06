const inquirer = require('inquirer');
const { fetchAndStoreFeed } = require('./feedManager');
const { queryBySource, queryByKeyword, markAsRead } = require('./utils/feedUtils');

async function run() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: [
        'Add RSS Feed URL',
        'Query Articles by Source',
        'Query Articles by Keyword',
        'Mark Article as Read',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'Add RSS Feed URL':
      const { url } = await inquirer.prompt([{ name: 'url', message: 'Enter RSS Feed URL:' }]);
      await fetchAndStoreFeed(url);
      break;

    case 'Query Articles by Source':
      const { source } = await inquirer.prompt([{ name: 'source', message: 'Enter source:' }]);
      const sourceResults = await queryBySource(source);
      console.log(sourceResults);
      break;

    case 'Query Articles by Keyword':
      const { keyword } = await inquirer.prompt([{ name: 'keyword', message: 'Enter keyword:' }]);
      const keywordResults = await queryByKeyword(keyword);
      console.log(keywordResults);
      break;

    case 'Mark Article as Read':
      const { link } = await inquirer.prompt([{ name: 'link', message: 'Enter article link to mark as read:' }]);
      await markAsRead(link);
      console.log('✔ Marked as read');
      break;

    case 'Exit':
      console.log('👋 Bye!');
      process.exit(0);
  }

  await run(); // Restart loop
}

run();
