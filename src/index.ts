#!/usr/bin/env node

import { Command } from 'commander';

import { createController } from './generator/controller';
import { createInterface } from './generator/interface';
import { createRoute } from './generator/route';
import { createSchema } from './generator/schema';
import { createService } from './generator/service';
import { Structure } from './types';
import fs from 'fs';
import { getFilePath } from './helper';


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
    
    const controllerPath = await getFilePath(formattedName, options.structure, 'controller');
    const servicePath = await getFilePath(formattedName, options.structure, 'service');
    const interfacePath = await getFilePath(formattedName, options.structure, 'interface');
    const routePath = await getFilePath(formattedName, options.structure, 'route');
    const schemaPath = await getFilePath(formattedName, options.structure, 'schema');

    if (doesFileExist(controllerPath) || doesFileExist(servicePath) || doesFileExist(interfacePath) || doesFileExist(routePath) || doesFileExist(schemaPath)) {
      console.log(`Files or Directories for ${formattedName} already exist! Exiting without overwriting.`);
      return;
    }
    // Check the structure type and call the appropriate function
    if (options.structure === 'module' || options.structure === 'role') {
      try{

        await createController(formattedName, options.structure);
        await createService(formattedName, options.structure);
        
        await createInterface(formattedName, options.structure);
        
        await createRoute(formattedName, options.structure);
        await createSchema(formattedName, options.structure);
      }
      catch(err){
        if(err instanceof Error)
        console.log(err.message)
      return
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
