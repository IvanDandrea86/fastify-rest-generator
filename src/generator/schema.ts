import ejs from 'ejs';
import fs from 'fs/promises';

import { capitalizeFirstLetter, getFilePath, getTemplatePath } from '../helper';
import { errorHandler } from '../helper/errorHandler';
import { Structure } from '../types';

export const createSchema = async (model: string, structure: Structure) => {
  try {
    const filePath = await getFilePath(model, structure, 'schema');

    const templateStr = await fs.readFile(getTemplatePath('schema'), 'utf-8');

    // Render the template with provided data
    const content = await ejs.render(
      templateStr,
      {
        model: capitalizeFirstLetter(model),
      },
      { async: true }
    );

    await fs.writeFile(filePath, content);
  } catch (err) {
    errorHandler(err, 'create', 'schema');
  }
};
