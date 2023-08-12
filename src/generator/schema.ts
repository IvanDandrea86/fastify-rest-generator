import ejs from 'ejs';
import fs from 'fs/promises';

import { getFilePath, getTemplatePath } from '../helper';
import { Structure } from '../types';

export const createSchema = async (name: string, structure: Structure) => {
  const filePath = await getFilePath(name, structure, 'schema');

  const templateStr =await fs.readFile(getTemplatePath('schema'), 'utf-8');

  // Render the template with provided data
  const content = ejs.render(templateStr, {
    name,
  });

  await fs.writeFile(filePath, content);
};
