import inquirer from 'inquirer';
import {
  createNote,
  listNotes,
  viewNote,
  editNote,
  deleteNote,
  searchNotes
} from './notesManager.js';

async function main() {
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: [
        'Create Note',
        'List Notes',
        'View Note',
        'Edit Note',
        'Delete Note',
        'Search Notes',
        'Exit'
      ]
    });

    switch (action) {
      case 'Create Note': await createNote(); break;
      case 'List Notes': await listNotes(); break;
      case 'View Note': await viewNote(); break;
      case 'Edit Note': await editNote(); break;
      case 'Delete Note': await deleteNote(); break;
      case 'Search Notes': await searchNotes(); break;
      case 'Exit': process.exit(0);
    }
  }
}

main();
