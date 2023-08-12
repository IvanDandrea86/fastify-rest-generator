import fs from 'fs/promises';
import path from 'path';

import {
  capitalizeFirstLetter,
  constructDirPath,
  ensureDirExists,
  getFilePath,
  getImportPath,
  getTemplatePath,
} from '../src/helper/index';
import { Role } from '../src/types';

describe('Utility Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
});

  describe('constructDirPath', () => {
    it('should return the correct directory path for modules', () => {
      const dirPath = constructDirPath('user', 'module', 'controller');
      const projectRoot = 'fastify-rest-generator'; 
      const parts = dirPath.split(`\\${projectRoot}\\`);
      const relativePath = '/' + (parts[1] || '').replace(/\\/g, '/');
      // expect(dirPath.endsWith('/src/modules/users')).toBe(true);
      expect(relativePath).toBe('/src/modules/users');
      // expect(path.normalize(dirPath).endsWith('/src/modules/users')).toBe(true);
    });

    // Add more tests for different structure and role combinations if needed.
  });

  // Mocking fs.access and fs.mkdir for the ensureDirExists function test
  fs.access = jest.fn();
  fs.mkdir = jest.fn();

  describe('ensureDirExists', () => {
    it('should create a directory if it does not exist', async () => {
      (fs.access as jest.Mock).mockRejectedValueOnce(new Error());
      await ensureDirExists('./somePath');
      expect(fs.mkdir).toHaveBeenCalledWith('./somePath', { recursive: true });
    });

    it('should not create a directory if it already exists', async () => {
      (fs.access as jest.Mock).mockResolvedValueOnce(undefined);
      await ensureDirExists('./somePath');
      expect(fs.mkdir).not.toHaveBeenCalled();
    });
  });

  describe('getFilePath', () => {
    it('should return the correct file path for modules', async () => {
      const filePath = await getFilePath('user', 'module', 'controller');
      expect(filePath.endsWith('user.controller.ts')).toBe(true);
      // });

      // Again, add more tests for different structure and role combinations if needed.
    });
  });

  describe('getImport', () => {
    it('should return the correct import for role', () => {
      const importPath = getImportPath('post', 'role', 'controller');
      expect(importPath).toBe('@/controllers/');
    });

    it('should return the correct import for other structures', () => {
      const importPath = getImportPath('post', 'module', 'controller');
      expect(importPath).toBe('./post.controller');
    });
  });
});
describe('getTemplatePath', () => {
  it('should return the correct path for a given template name', () => {
    const templateName: Role = 'controller';

    // Construct the expected path using Node.js built-ins for a controlled result
    const expectedPath = path.join(
      __dirname,
      '../src',
      'templates',
      `${templateName}.ejs`
    );

    // Get the result from the function
    const result = getTemplatePath(templateName);

    // Expect the result to match the controlled expected path
    expect(result).toEqual(expectedPath);
  });

  // You can add more test cases for different template names or edge cases
  it('should return the correct path for another template name', () => {
    const templateName: Role = 'controller';

    const expectedPath = path.join(
      __dirname,
      '../src',
      'templates',
      `${templateName}.ejs`
    );

    const result = getTemplatePath(templateName);

    expect(result).toEqual(expectedPath);
  });
});

it('should capitalize the first letter of a string', () => {
  expect(capitalizeFirstLetter('post')).toBe('Post');
});
