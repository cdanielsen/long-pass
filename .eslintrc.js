module.exports = {
  "extends": ["standard", "plugin:react/recommended"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "commonjs": true,
    "jest/globals": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react",
    "jest"
  ]
};
