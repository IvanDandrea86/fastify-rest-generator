import ejs from 'ejs';
import fs from 'fs/promises';

import {
  capitalizeFirstLetter,
  getFilePath,
  getImportPath,
  getTemplatePath,
} from '../helper';
import { errorHandler } from '../helper/errorHandler';
import { Structure } from '../types';

export const createRoute = async (name: string, structure: Structure) => {
  try {
    const filePath = await getFilePath(name, structure, 'route');
    const importPathController = getImportPath(name, structure, 'controller');
    const importPathSchema = getImportPath(name, structure, 'schema');
    // Load the template from the file system
    const templateStr = await fs.readFile(getTemplatePath('route'), 'utf-8');

    // Render the template with provided data
    const content = await ejs.render(
      templateStr,
      {
        name,
        importPathController,
        importPathSchema,
        model: capitalizeFirstLetter(name),
      },
      { async: true }
    );
    await fs.writeFile(filePath, content);
  } catch (err) {
    errorHandler(err, 'create', 'route');
  }
};
