import ejs from 'ejs';
import fs from 'fs/promises';

import { capitalizeFirstLetter, getFilePath, getImportPath, getTemplatePath } from '../helper';
import { Structure } from '../types';

export const createService = async (name: string, structure: Structure) => {
  const filePath = await getFilePath(name, structure, 'service');
  const interfaceImportPath =
    getImportPath(name,structure, 'interface');
    const templateStr = await fs.readFile(getTemplatePath('service'), 'utf-8');

  // Render the template with provided data
  const content = ejs.render(templateStr, {
    name:capitalizeFirstLetter(name),
    interfaceImportPath
  });

  await fs.writeFile(filePath, content);
};
