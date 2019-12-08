module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  //transform: {
  //  '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
  //    'jest-transform-stub',
  //  '^.+\\.(js|jsx)?$': 'babel-jest'
  //},
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  //transformIgnorePatterns: ['<rootDir>/node_modules/'],
  "transformIgnorePatterns": [
    "/node_modules/react-qr-reader",
    "/node_modules/agama-wallet-lib",
    "/node_modules/plotly.js"
  ],
  runner: '@jest-runner/electron',
  testEnvironment: '@jest-runner/electron/environment',
};