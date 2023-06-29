import fs from "fs/promises";
import { Structure } from "../types";
import { getFilePath } from "../helper";

export const createInterface = async (name: string, structure: Structure) => {
    const filePath = await getFilePath(name, structure, "interface");


  const content = `
  import { RequestGenericInterface } from 'fastify';

  export interface ICreateRequest extends RequestGenericInterface {
    Body: CreateBody;
  }
  export interface IUpdateRequest extends RequestGenericInterface {
    Body: UpdateBody;
    Params: UpdateParams;
  }
  export interface IDeleteRequest extends RequestGenericInterface {
    Params: DeleteParams;
  }
  
  export interface DeleteParams {
    id: string;
  }
  export interface UpdateParams {
    id: string;
  }
  export interface UpdateBody {
    [key: string]: any;
  }
  export interface CreateBody {
    [key: string]: any;
  }
  

    `;

  await fs.writeFile(filePath, content);
};
