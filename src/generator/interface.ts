import ejs from 'ejs';
import fs from 'fs/promises';

import { capitalizeFirstLetter, getFilePath, getTemplatePath } from '../helper';
import { errorHandler } from '../helper/errorHandler';
import { Structure } from '../types';

export const createInterface = async (model: string, structure: Structure) => {
  try {
    const filePath = await getFilePath(model, structure, 'interface');
    const capitalizedModel = capitalizeFirstLetter(model);
    // Load the template from the file system
    const templateStr = await fs.readFile(
      getTemplatePath('interface'),
      'utf-8'
    );

    // Render the template with provided data
    const content = await ejs.render(
      templateStr,
      {
        model: capitalizedModel,
      },
      { async: true }
    );

    await fs.writeFile(filePath, content);
  } catch (err) {
    errorHandler(err, 'create', 'interface');
  }
};
