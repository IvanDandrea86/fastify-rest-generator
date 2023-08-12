import ejs from 'ejs';
import * as fs from 'fs/promises';

import { createController } from '../src/generator/controller';
import { getFilePath, getImportPath, getTemplatePath } from '../src/helper';
import { capitalizeFirstLetter } from '../src/helper';
import { Structure } from '../src/types';

jest.mock('fs/promises');
jest.mock('ejs');
jest.mock('../src/helper');

describe('createController', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should generate the correct controller file content', async () => {
    const mockName = 'post';
    const capitalizedModel = 'Post';
    const mockStructure: Structure = 'module'; 

    // Mocking the helper functions
    (getFilePath as jest.Mock).mockResolvedValue('mockFilePath');
    (getImportPath as jest.Mock).mockImplementation((name, structure, type) => {
      // You can use a switch case or if-else if the implementation varies
      // For now, using a simple template string for demonstration
      return `./mock-path/${name}/${structure}/${type}`;
    });
    (getTemplatePath as jest.Mock).mockReturnValue('mockTemplatePath');

    // Mocking the file read
    (fs.readFile as jest.Mock).mockResolvedValue('mockTemplate');

    // Mocking ejs render method
    (ejs.render as jest.Mock).mockReturnValue('mockContent');

    (capitalizeFirstLetter as jest.Mock).mockImplementation((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });

    await createController(mockName, mockStructure);

    const interfaceImportPath = getImportPath(mockName, 'module', 'interface');
    const serviceImportPath = getImportPath(mockName, 'module', 'service');

    // Expectations
    expect(getFilePath).toHaveBeenCalledWith(
      mockName,
      mockStructure,
      'controller'
    );
    expect(fs.readFile).toHaveBeenCalledWith(
      getTemplatePath('controller'),
      'utf-8'
    );
    expect(ejs.render).toHaveBeenCalledWith('mockTemplate', {
      model: mockName,
      capitalizedModel: capitalizedModel,
      interfaceImportPath: interfaceImportPath,
      serviceImportPath: serviceImportPath,
    });
    expect(fs.writeFile).toHaveBeenCalledWith('mockFilePath', 'mockContent');
  });

  // Additional tests for error scenarios or different structures can be added...
});