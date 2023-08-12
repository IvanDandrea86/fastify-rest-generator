import ejs from 'ejs';
import * as fs from 'fs/promises';

import { createInterface } from '../src/generator/interface';
import { capitalizeFirstLetter, getFilePath, getImportPath, getTemplatePath } from '../src/helper';
import { Structure } from '../src/types';

jest.mock('fs/promises');
jest.mock('ejs');
jest.mock('../src/helper');

describe('createinterface', () => {

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should generate the correct interface file content', async () => {
    const mockName = 'post';
    const mockStructure: Structure = 'module'; // You can also run a test for 'role'
    
    // Mocking the helper functions
    (getFilePath as jest.Mock).mockResolvedValue('mockFilePath');
    (getImportPath as jest.Mock).mockReturnValue('./mock-path/');
    
    // Mocking the file read (assuming you're loading a template from fs)
    (fs.readFile as jest.Mock).mockResolvedValue('mockTemplate');
    
    // Mocking ejs render method
    (ejs.render as jest.Mock).mockReturnValue('mockContent');


    (capitalizeFirstLetter as jest.Mock).mockImplementation((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });
    await createInterface(mockName, mockStructure);
    
    // Expectations
    expect(getFilePath).toHaveBeenCalledWith(mockName, mockStructure, 'interface');
    expect(fs.readFile).toHaveBeenCalledWith(getTemplatePath('interface') ,'utf-8');
    expect(ejs.render).toHaveBeenCalledWith('mockTemplate', {
      model: capitalizeFirstLetter(mockName)
    });
    expect(fs.writeFile).toHaveBeenCalledWith('mockFilePath', 'mockContent');
  });

  // Additional tests for error scenarios or different structures can be added...
});