import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   'src/**/*.{js,ts,tsx}', // adjust the file extensions if needed
  // ],
};

export default jestConfig;
