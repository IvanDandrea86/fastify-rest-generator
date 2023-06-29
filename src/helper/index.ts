import path from 'path';
import { structureMap } from '../const';
import { Structure } from '../types';
import fs from 'fs/promises';
import { rootPath } from '../root';

export const getFilePath = async (
  name: string,
  structure: Structure,
  role: string
) => {
  const baseDir = structureMap[structure];
  let dirPath;

  if (structure === 'module') {
    dirPath = path.resolve(rootPath, `./src/${baseDir}/${name}s`);
  } else {
    dirPath = path.resolve(rootPath, `./src/${role}s`);
  }

  const filePath = path.join(dirPath, `${name}.${role}.ts`);

  await fs.mkdir(dirPath, { recursive: true });

  return filePath;
};

export const getImport = (structure: Structure, folder: string) => {
  return structure==='role' ? `@/${folder}/` : './';
};
