import ejs from 'ejs';
import * as fs from 'fs/promises';

import { createRoute } from '../src/generator/route';
import * as helper from '../src/helper';
import { Structure } from '../src/types';

jest.mock('fs/promises');
jest.mock('ejs');
jest.mock('../src/helper', () => ({
  ...jest.requireActual('../src/helper'),
  getFilePath: jest.fn(),
}));
describe('createroute', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should generate the correct route file content', async () => {
    const mockName = 'post';
    const mockStructure: Structure = 'module'; // You can also run a test for 'role'

    (helper.getFilePath as jest.Mock).mockResolvedValue('./');

    // Mocking the file read (assuming you're loading a template from fs)
    (fs.readFile as jest.Mock).mockResolvedValue('mockTemplate');

    // Mocking ejs render method
    (ejs.render as jest.Mock).mockReturnValue('mockContent');

    await createRoute(mockName, mockStructure);

    // Expectations
    expect(fs.readFile).toHaveBeenCalledWith(helper.getTemplatePath('route'), 'utf-8');
    expect(ejs.render).toHaveBeenCalledWith('mockTemplate', {
      name: mockName,
      importPathController: './post.controller',
      importPathSchema: './post.schema',
    });
    expect(fs.writeFile).toHaveBeenCalledWith('./', 'mockContent');
  });

  // Additional tests for error scenarios or different structures can be added...
});
