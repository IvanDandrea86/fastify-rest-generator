import fs from 'fs/promises';
import { Structure } from '../types';
import { getFilePath } from '../helper';

export const createSchema = async (name: string, structure: Structure) => {
  const filePath = await getFilePath(name, structure, 'schema');

  const content = `
  import { Type } from '@sinclair/typebox';

  export const updateSchema = {
    params: {
      id: Type.String,
    },
    body: {},
    response: {
      200: Type.Object({
        message: Type.String(),
      }),
    },
  };
  export const createSchema = {
    body: {},
    response: {
      200: Type.Object({
        message: Type.String(),
      }),
    },
  };
  
  export const deleteSchema = {
    params: {
      id: Type.String,
    },
    body: {},
    response: {
      200: Type.Object({
        message: Type.String(),
      }),
    },
  };
  
    `;

  await fs.writeFile(filePath, content);
};
