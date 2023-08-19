import fs from 'fs/promises';
import path from 'path';

import { structureMap } from '../const';
import { rootPath } from '../root';
import { Role, Structure } from '../types';

const constructDirPath = (
  model: string,
  structure: Structure,
  role: Role
): string => {
  const baseDir = structureMap[structure];

  if (structure === 'module') {
    return path.resolve(rootPath, `./src/${baseDir}/${model}s`);
  } else {
    return path.resolve(rootPath, `./src/${role}s`);
  }
};

const ensureDirExists = async (dirPath: string): Promise<void> => {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
};

const getFilePath = async (
  model: string,
  structure: Structure,
  role: Role
): Promise<string> => {
  const dirPath = constructDirPath(model, structure, role);

  await ensureDirExists(dirPath);

  return path.join(dirPath, `${model}.${role}.ts`);
};

const getImportPath = (
  model: string,
  structure: Structure,
  role: Role
): string => {
  return structure === 'role'
    ? `@/${role}s/${model}.${role}`
    : `./${model}.${role}`;
};
/**
 * Get the full path for a given template model.
 * @param templatemodel The model of the template without extension (e.g., "controller").
 * @return The full path to the template.
 */
function getTemplatePath(templatemodel: Role): string {
  return path.join(__dirname, '..', 'templates', `${templatemodel}.ejs`);
}

const capitalizeFirstLetter = (string: string): string => {
  if (!string) return ''; // Return an empty string if input is falsy
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export {
  constructDirPath,
  ensureDirExists,
  getFilePath,
  getImportPath,
  getTemplatePath,
  capitalizeFirstLetter,
};
