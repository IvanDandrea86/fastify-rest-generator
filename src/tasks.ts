import { createController } from './generator/controller';
import { createInterface } from './generator/interface';
import { createRoute } from './generator/route';
import { createSchema } from './generator/schema';
import { createService } from './generator/service';
import { getFilePath } from './helper';
import { Task } from './types';

export const tasks: Task[] = [
  {
    getPath: async (name, structure) =>
      await getFilePath(name, structure, 'controller'),
    createFunc: createController,
    label: 'controller',
  },
  {
    getPath: async (name, structure) =>
      await getFilePath(name, structure, 'service'),
    createFunc: createService,
    label: 'service',
  },
  {
    getPath: async (name, structure) =>
      await getFilePath(name, structure, 'interface'),
    createFunc: createInterface,
    label: 'interface',
  },
  {
    getPath: async (name, structure) =>
      await getFilePath(name, structure, 'route'),
    createFunc: createRoute,
    label: 'route',
  },
  {
    getPath: async (name, structure) =>
      await getFilePath(name, structure, 'schema'),
    createFunc: createSchema,
    label: 'schema',
  },
];
