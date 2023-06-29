import fs from 'fs/promises';
import { Structure } from '../types';
import { getFilePath, getImport } from '../helper';

export const createService = async (name: string, structure: Structure) => {
  const filePath = await getFilePath(name, structure, 'service');

  const content = `
  import {  UpdateBody, CreateBody, DeleteParams,UpdateParams  } from '${getImport(
    structure,
    'interfaces'
  )}${name}.interface';

  export const update = async (id: UpdateParams, params: UpdateBody) => {
    //   BUSINESS LOGI HERE
  };

  export const create = async (params: CreateBody) => {
    //   BUSINESS LOGI HERE
    return {};
  };

  export const remove = async (id: DeleteParams) => {
    //   BUSINESS LOGI HERE
    return {};
  };
  
  export default {update ,create ,remove}

    `;

  await fs.writeFile(filePath, content);
};
