import ejs from 'ejs';
import fs from 'fs/promises';

import { capitalizeFirstLetter, getFilePath, getImportPath,getTemplatePath } from '../helper';
import { Structure } from '../types';

export const createController = async (model: string, structure: Structure) => {
  try{
    const capitalizedModel=capitalizeFirstLetter(model)
    const filePath = await getFilePath(model, structure, 'controller');
    const interfaceImportPath =
    getImportPath(model,structure, 'interface') ;
    const serviceImportPath =
    getImportPath(model,structure, 'service');
    
    // Load the template from the file system
    const templateStr = await fs.readFile(getTemplatePath('controller'), 'utf-8');  
    // Render the template with provided data
    const content = ejs.render(templateStr, {
      model,
      interfaceImportPath,
      serviceImportPath,
      capitalizedModel
    });
    
    await fs.writeFile(filePath, content);
  }
  catch(err:unknown){
    if(err instanceof Error)
    throw new Error(err.message)
  
  else
    throw new Error(JSON.stringify(err))
  
}
}
