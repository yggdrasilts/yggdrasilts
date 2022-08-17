/* eslint-disable */
export default {
  displayName: 'yggdrasilts-generators-ygg-nest-app-e2e',
  preset: '../../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/packages/yggdrasilts/generators/ygg-nest-app-e2e',
};
