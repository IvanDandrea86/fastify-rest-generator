import ejs from 'ejs';
import * as fs from 'fs/promises';

import { mockErrorHandler } from '../../mockUtils';
import { createService } from '../../src/generator/service';
import {
  capitalizeFirstLetter,
  getFilePath,
  getImportPath,
  getTemplatePath,
} from '../../src/helper';
import { Structure } from '../../src/types';

jest.mock('fs/promises');
jest.mock('ejs');
jest.mock('../../src/helper');

describe('createservice', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should generate the correct service file content', async () => {
    const mockName = 'Post';
    const mockStructure: Structure = 'module'; // You can also run a test for 'role'

    // Mocking the helper functions
    (getFilePath as jest.Mock).mockResolvedValueOnce('mockFilePath');
    (getImportPath as jest.Mock).mockReturnValue('./mock-path/post.interface');

    (capitalizeFirstLetter as jest.Mock).mockImplementation((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    });

    // Mocking the file read (assuming you're loading a template from fs)
    (fs.readFile as jest.Mock).mockResolvedValue('mockTemplate');

    // Mocking ejs render method
    (ejs.render as jest.Mock).mockReturnValue('mockContent');

    await createService(mockName, mockStructure);

    // Expectations
    expect(getFilePath).toHaveBeenCalledWith(
      mockName,
      mockStructure,
      'service'
    );
    expect(fs.readFile).toHaveBeenCalledWith(
      getTemplatePath('service'),
      'utf-8'
    );
    expect(ejs.render).toHaveBeenCalledWith(
      'mockTemplate',
      {
        name: mockName,
        interfaceImportPath: './mock-path/post.interface',
      },
      { async: true }
    );
    expect(fs.writeFile).toHaveBeenCalledWith('mockFilePath', 'mockContent');
  });

  it('should handle errors and re-throw them', async () => {
    const mockName = 'post';
    const mockStructure: Structure = 'module';

    (fs.readFile as jest.Mock).mockRejectedValue(new Error('readFile error'));
    mockErrorHandler(); // Use the utility function

    await expect(createService(mockName, mockStructure)).rejects.toThrow(
      'readFile error'
    );
  });

  it('should handle non-Error instances', async () => {
    const mockName = 'post';
    const mockStructure: Structure = 'module';

    (fs.readFile as jest.Mock).mockRejectedValue({ cause: 'Unknown error' });
    mockErrorHandler();

    await expect(createService(mockName, mockStructure)).rejects.toThrow(
      'Unknown error create service'
    );
  });
});
