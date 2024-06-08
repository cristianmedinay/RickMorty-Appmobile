module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['jest-styled-components'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
