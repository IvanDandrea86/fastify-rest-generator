import ejs from 'ejs';
import fs from 'fs/promises';

import {
  capitalizeFirstLetter,
  getFilePath,
  getImportPath,
  getTemplatePath,
} from '../helper';
import { Structure } from '../types';
import { errorHandler } from '../helper/errorHandler';

export const createService = async (name: string, structure: Structure) => {
  try {
    const filePath = await getFilePath(name, structure, 'service');
    const interfaceImportPath = getImportPath(name, structure, 'interface');
    const templateStr = await fs.readFile(getTemplatePath('service'), 'utf-8');

    // Render the template with provided data
    const content = await ejs.render(
      templateStr,
      {
        name: capitalizeFirstLetter(name),
        interfaceImportPath,
      },
      { async: true }
    );

    await fs.writeFile(filePath, content);
  } catch (err) {
    errorHandler(err, 'create', 'service');
  }
};
