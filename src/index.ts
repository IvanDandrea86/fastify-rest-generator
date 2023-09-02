#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';

import { capitalizeFirstLetter } from './helper';
import { tasks } from './tasks';
import { Structure } from './types';

const program = new Command();

const doesFileExist = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};
// Repeat the above for createRoute, createSchema, createService, and createInterface
program
  .version('0.1.0')
  .description('Fastify API generator CLI')
  .command('generate <name>')
  .description('generate new API resources')
  .option(
    '-s, --structure <type>',
    'Choose the folder structure type: "module" or "role"',
    'module'
  )
  .action(async (name: string, options: { structure: Structure }) => {
    const formattedName = name.toLocaleLowerCase().trim();

    // Check the structure type and call the appropriate function
    if (options.structure === 'module' || options.structure === 'role') {
      for (const task of tasks) {
        if (
          doesFileExist(await task.getPath(formattedName, options.structure))
        ) {
          console.error(
            `${capitalizeFirstLetter(
              task.label
            )} for ${formattedName} already exists! Skipping.`
          );
        } else {
          try {
            await task.createFunc(formattedName, options.structure);
          } catch (err) {
            if (err instanceof Error) console.log(err.message);
          }
        }
      }
      // Repeat for other create functions
    } else {
      console.log('Invalid structure type. Please choose "module" or "role".');
      return;
    }
    console.log(
      `Resources for ${formattedName} created with ${options.structure} structure!`
    );
  });

program.parse(process.argv);
