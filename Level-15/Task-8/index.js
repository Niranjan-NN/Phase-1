import inquirer from 'inquirer';
import { connectDB, transactions } from './db.js';
import { ObjectId } from 'mongodb';

await connectDB();

async function addTransaction() {
  const { type, amount, category, date } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select transaction type:',
      choices: ['income', 'expense']
    },
    {
      type: 'input',
      name: 'amount',
      message: 'Enter amount:',
      validate: input => !isNaN(input) && Number(input) > 0
    },
    {
      type: 'input',
      name: 'category',
      message: 'Enter category:'
    },
    {
      type: 'input',
      name: 'date',
      message: 'Enter date (YYYY-MM-DD):',
      validate: input => !isNaN(Date.parse(input))
    }
  ]);

  await transactions.insertOne({
    type,
    amount: Number(amount),
    category,
    date: new Date(date)
  });

  console.log('Transaction added successfully.');
}

async function viewTransactions() {
  const items = await transactions.find().sort({ date: -1 }).toArray();
  console.table(items);
}

async function filterTransactions() {
  const { category, startDate, endDate } = await inquirer.prompt([
    {
      type: 'input',
      name: 'category',
      message: 'Enter category to filter (leave blank for all):'
    },
    {
      type: 'input',
      name: 'startDate',
      message: 'Enter start date (YYYY-MM-DD):'
    },
    {
      type: 'input',
      name: 'endDate',
      message: 'Enter end date (YYYY-MM-DD):'
    }
  ]);

  const filter = {
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  };

  if (category) filter.category = category;

  const results = await transactions.find(filter).toArray();
  console.table(results);
}

async function generateReport() {
  const all = await transactions.find().toArray();
  let income = 0, expense = 0;

  all.forEach(t => {
    if (t.type === 'income') income += t.amount;
    else expense += t.amount;
  });

  console.log(`\nSummary Report:`);
  console.log(`Total Income: ₹${income}`);
  console.log(`Total Expenses: ₹${expense}`);
  console.log(`Balance: ₹${income - expense}`);
}

async function run() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Select an option:',
        choices: [
          'Add Transaction',
          'View All Transactions',
          'Filter Transactions',
          'Generate Report',
          'Exit'
        ]
      }
    ]);

    switch (action) {
      case 'Add Transaction': await addTransaction(); break;
      case 'View All Transactions': await viewTransactions(); break;
      case 'Filter Transactions': await filterTransactions(); break;
      case 'Generate Report': await generateReport(); break;
      case 'Exit': process.exit(0);
    }
  }
}

run();
