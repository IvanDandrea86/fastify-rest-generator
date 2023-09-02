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

export const createController = async (model: string, structure: Structure) => {
  try {
    const capitalizedModel = capitalizeFirstLetter(model);
    const filePath = await getFilePath(model, structure, 'controller');
    const interfaceImportPath = getImportPath(model, structure, 'interface');
    const serviceImportPath = getImportPath(model, structure, 'service');

    // Load the template from the file system
    const templateStr = await fs.readFile(
      getTemplatePath('controller'),
      'utf-8'
    );
    // Render the template with provided data
    const content = await ejs.render(
      templateStr,
      {
        model,
        interfaceImportPath,
        serviceImportPath,
        capitalizedModel: capitalizedModel,
      },
      { async: true }
    );

    await fs.writeFile(filePath, content);
  } catch (err) {
    errorHandler(err, 'create', 'controller');
  }
};
