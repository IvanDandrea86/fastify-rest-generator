import ejs from 'ejs';
import * as fs from 'fs/promises';

import { createSchema } from '../src/generator/schema';
import { capitalizeFirstLetter, getFilePath, getImportPath, getTemplatePath } from '../src/helper';
import { Structure } from '../src/types';

jest.mock('fs/promises');
jest.mock('ejs');
jest.mock('../src/helper');

describe('createschema', () => {

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should generate the correct schema file content', async () => {
    const mockName = 'Testschema';
    const mockStructure: Structure = 'module'; // You can also run a test for 'role'
    
    // Mocking the helper functions
    (getFilePath as jest.Mock).mockResolvedValue('mockFilePath');
    (getImportPath as jest.Mock).mockReturnValue('./mock-path/');

    
    (capitalizeFirstLetter as jest.Mock).mockImplementation((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    
    // Mocking the file read (assuming you're loading a template from fs)
    (fs.readFile as jest.Mock).mockResolvedValue('mockTemplate');
    
    // Mocking ejs render method
    (ejs.render as jest.Mock).mockReturnValue('mockContent');

    await createSchema(mockName, mockStructure);
    
    // Expectations
    expect(getFilePath).toHaveBeenCalledWith(mockName, mockStructure, 'schema');
    expect(fs.readFile).toHaveBeenCalledWith(getTemplatePath('schema'), 'utf-8');
    expect(ejs.render).toHaveBeenCalledWith('mockTemplate', {
      name: mockName
    });
    expect(fs.writeFile).toHaveBeenCalledWith('mockFilePath', 'mockContent');
  });

  // Additional tests for error scenarios or different structures can be added...
});