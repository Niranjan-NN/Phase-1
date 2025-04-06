import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
import { renderMarkdown } from './utils.js';

const NOTES_DIR = './notes';

async function ensureDir(category) {
  const folder = path.join(NOTES_DIR, category);
  await fs.mkdir(folder, { recursive: true });
  return folder;
}

export async function createNote() {
  const { title, content, category } = await inquirer.prompt([
    { name: 'title', message: 'Note title:' },
    { name: 'content', message: 'Note content (Markdown supported):' },
    { name: 'category', message: 'Category/folder:' }
  ]);

  const folder = await ensureDir(category);
  const filename = path.join(folder, `${title}.md`);
  await fs.writeFile(filename, content);
  console.log('✅ Note created.');
}

export async function listNotes() {
  const folders = await fs.readdir(NOTES_DIR);
  for (const folder of folders) {
    const files = await fs.readdir(path.join(NOTES_DIR, folder));
    console.log(`\n📁 ${folder}:`);
    files.forEach(f => console.log(`  📝 ${f}`));
  }
}

export async function viewNote() {
  const { folder, file } = await promptForNote();
  const filePath = path.join(NOTES_DIR, folder, file);
  const content = await fs.readFile(filePath, 'utf-8');
  console.log('\n📝 Note Content:\n');
  console.log(renderMarkdown(content));
}

export async function editNote() {
  const { folder, file } = await promptForNote();
  const filePath = path.join(NOTES_DIR, folder, file);
  const current = await fs.readFile(filePath, 'utf-8');

  const { newContent } = await inquirer.prompt({
    name: 'newContent',
    message: 'Edit content:',
    default: current
  });

  await fs.writeFile(filePath, newContent);
  console.log('✏️ Note updated.');
}

export async function deleteNote() {
  const { folder, file } = await promptForNote();
  const filePath = path.join(NOTES_DIR, folder, file);
  await fs.unlink(filePath);
  console.log('🗑️ Note deleted.');
}

export async function searchNotes() {
  const { keyword } = await inquirer.prompt({
    name: 'keyword',
    message: 'Enter keyword to search in notes:'
  });

  const folders = await fs.readdir(NOTES_DIR);
  for (const folder of folders) {
    const files = await fs.readdir(path.join(NOTES_DIR, folder));
    for (const file of files) {
      const content = await fs.readFile(path.join(NOTES_DIR, folder, file), 'utf-8');
      if (content.includes(keyword)) {
        console.log(`✅ Found in: ${folder}/${file}`);
      }
    }
  }
}

async function promptForNote() {
  const folders = await fs.readdir(NOTES_DIR);
  const { folder } = await inquirer.prompt({
    name: 'folder',
    message: 'Select category:',
    type: 'list',
    choices: folders
  });

  const files = await fs.readdir(path.join(NOTES_DIR, folder));
  const { file } = await inquirer.prompt({
    name: 'file',
    message: 'Select note:',
    type: 'list',
    choices: files
  });

  return { folder, file };
}
