// mockUtils.ts
import { errorHandler } from './src/helper/errorHandler';
jest.mock('./src/helper/errorHandler');

export function mockErrorHandler() {
  (errorHandler as jest.Mock).mockImplementation((err, action, item) => {
    if (err instanceof Error)
      throw new Error(`Error ${action}: ${err.message}`);
    console.error(err);
    throw new Error(`Unknown error ${action} ${item}`);
  });
}
