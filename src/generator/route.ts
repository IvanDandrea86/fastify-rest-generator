import fs from 'fs/promises';
import { Structure } from '../types';
import { getFilePath, getImport } from '../helper';

export const createRoute = async (name: string, structure: Structure) => {
  const filePath = await getFilePath(name, structure, 'route');

  const content = `
  import { FastifyPluginAsync } from 'fastify';

  import ${name}Controller from '${getImport(
    structure,
    'controllers'
  )}${name}.controller';
  import {
    createSchema,
    deleteSchema,
    updateSchema,
  } from '${getImport(structure, 'schemas')}${name}.schema';
  
  const ${name}RoutePlugin: FastifyPluginAsync = async (server) => {
    const path = '/${name}';
  
    // Create
    server.post(\`\${path}\`, { schema: createSchema }, ${name}Controller.${name}Create);
  
    // Update
    server.put(
      \`\${path}/:id\`,
      {
        schema: updateSchema,
      },
      ${name}Controller.${name}Update
    );
    //  Delete
    server.delete(
      \`\${path}/:id\`,
      {
        schema: deleteSchema,
      },
      ${name}Controller.${name}Delete
    );
  };
  
  export default ${name}RoutePlugin;
  `;

  await fs.writeFile(filePath, content);
};
