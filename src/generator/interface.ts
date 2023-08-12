import ejs from 'ejs';
import fs from 'fs/promises';

import { capitalizeFirstLetter, getFilePath, getTemplatePath } from '../helper';
import { Structure } from '../types';

export const createInterface = async (model: string, structure: Structure) => {
  const filePath = await getFilePath(model, structure, 'interface');
  const capitalizedModel = capitalizeFirstLetter(model);
  // Load the template from the file system
  const templateStr = await fs.readFile(getTemplatePath('interface'), 'utf-8');

  // Render the template with provided data
  const content = ejs.render(templateStr, {
    model: capitalizedModel,
  });

  await fs.writeFile(filePath, content);
};
