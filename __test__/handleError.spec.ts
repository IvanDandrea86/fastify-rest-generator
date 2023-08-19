import { errorHandler } from '../src/helper/errorHandler';
describe('handleError function', () => {
  // Mocking console.error
  console.error = jest.fn();

  it('should re-throw instances of Error with a custom message', () => {
    const testError = new Error('Test error message');

    expect(() => {
      errorHandler(testError, 'testing', 'functionality');
    }).toThrowError('Error testing: Test error message');
  });
});
