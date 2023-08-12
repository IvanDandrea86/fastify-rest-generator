import { createRoute } from '../src/generator/route';
import * as fs from 'fs/promises';
import ejs from 'ejs';
import { getFilePath, getImportPath, getTemplatePath } from '../src/helper';
import { Structure } from '../src/types';

jest.mock('fs/promises');
jest.mock('ejs');
jest.mock('../src/helper');

describe('createroute', () => {

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should generate the correct route file content', async () => {
    const mockName = 'post';
    const mockStructure: Structure = 'module'; // You can also run a test for 'role'
    
    // Mocking the helper functions
    (getFilePath as jest.Mock).mockResolvedValue('mockFilePath');
    (getImportPath as jest.Mock).mockReturnValue('./mock-path/');

    
    // Mocking the file read (assuming you're loading a template from fs)
    (fs.readFile as jest.Mock).mockResolvedValue('mockTemplate');
    
    // Mocking ejs render method
    (ejs.render as jest.Mock).mockReturnValue('mockContent');

    await createRoute(mockName, mockStructure);
    
    // Expectations
    expect(getFilePath).toHaveBeenCalledWith(mockName, mockStructure, 'route');
    expect(fs.readFile).toHaveBeenCalledWith(getTemplatePath('route'), 'utf-8');
    expect(ejs.render).toHaveBeenCalledWith('mockTemplate', {
      name: mockName,
      importPathController: './mock-path/',
      importPathSchema: './mock-path/'
    });
    expect(fs.writeFile).toHaveBeenCalledWith('mockFilePath', 'mockContent');
  });

  // Additional tests for error scenarios or different structures can be added...
});