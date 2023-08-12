import ejs from 'ejs';
import fs from 'fs/promises';

import { getFilePath, getImportPath, getTemplatePath } from '../helper';
import { Structure } from '../types';

export const createRoute = async (name: string, structure: Structure) => {
  const filePath = await getFilePath( name,structure, 'route');
  const importPathController = getImportPath(name,structure, 'controller');
  const importPathSchema = getImportPath(name,structure, 'schema');
  // Load the template from the file system
  const templateStr =await fs.readFile(getTemplatePath('route'), 'utf-8');

  // Render the template with provided data
  const content = ejs.render(templateStr, {
    name,
    importPathController,
    importPathSchema,
  });
  await fs.writeFile(filePath, content);
};
