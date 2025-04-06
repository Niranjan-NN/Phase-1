import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const FILE_PATH = 'tasks.json';

// Read tasks from file
const readTasks = async () => {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// Write tasks to file
const writeTasks = async (tasks) => {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
};

// Add a task
yargs(hideBin(process.argv))
    .command('add <title> <description>', 'Add a new task', (yargs) => {
        return yargs
            .positional('title', {
                describe: 'Title of the task',
                type: 'string'
            })
            .positional('description', {
                describe: 'Description of the task',
                type: 'string'
            })
            .option('due', {
                alias: 'd',
                describe: 'Due date (YYYY-MM-DD)',
                type: 'string'
            });
    }, async (argv) => {
        const tasks = await readTasks();
        tasks.push({ id: uuidv4(), title: argv.title, description: argv.description, status: 'pending', due: argv.due || null });
        await writeTasks(tasks);
        console.log('Task added successfully!');
    })

    // List tasks
    .command('list', 'List all tasks', (yargs) => {
        return yargs.option('status', {
            alias: 's',
            describe: 'Filter by status (pending/completed)',
            type: 'string'
        }).option('sort', {
            alias: 'o',
            describe: 'Sort by due date',
            type: 'boolean'
        });
    }, async (argv) => {
        let tasks = await readTasks();
        if (argv.status) {
            tasks = tasks.filter(task => task.status === argv.status);
        }
        if (argv.sort) {
            tasks.sort((a, b) => new Date(a.due) - new Date(b.due));
        }
        console.table(tasks);
    })

    // Update a task
    .command('update <id> <status>', 'Update task status', (yargs) => {
        return yargs
            .positional('id', {
                describe: 'Task ID',
                type: 'string'
            })
            .positional('status', {
                describe: 'New status (pending/completed)',
                type: 'string'
            });
    }, async (argv) => {
        let tasks = await readTasks();
        const taskIndex = tasks.findIndex(task => task.id === argv.id);
        if (taskIndex !== -1) {
            tasks[taskIndex].status = argv.status;
            await writeTasks(tasks);
            console.log('Task updated successfully!');
        } else {
            console.log('Task not found!');
        }
    })

    // Delete a task
    .command('delete <id>', 'Delete a task', (yargs) => {
        return yargs.positional('id', {
            describe: 'Task ID',
            type: 'string'
        });
    }, async (argv) => {
        let tasks = await readTasks();
        const filteredTasks = tasks.filter(task => task.id !== argv.id);
        if (filteredTasks.length === tasks.length) {
            console.log('Task not found!');
        } else {
            await writeTasks(filteredTasks);
            console.log('Task deleted successfully!');
        }
    })
    .help()
    .argv;
