#!/usr/bin/env node

import { Command } from 'commander';
import { Structure } from './types';
import { createController } from './generator/controller';
import { createService } from './generator/service';
import { createInterface } from './generator/interface';
import { createRoute } from './generator/route';
import { createSchema } from './generator/schema';

const program = new Command();

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
    // Check the structure type and call the appropriate function
    if (options.structure === 'module' || options.structure === 'role') {
      await createController(name, options.structure);
      await createService(name, options.structure);

      await createInterface(name, options.structure);

      await createRoute(name, options.structure);
      await createSchema(name, options.structure);
      // Repeat for other create functions
    } else {
      console.log('Invalid structure type. Please choose "module" or "role".');
      return;
    }

    console.log(
      `Resources for ${name} created with ${options.structure} structure!`
    );
  });

program.parse(process.argv);
