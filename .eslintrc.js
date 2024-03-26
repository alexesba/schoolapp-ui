module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/jsx-runtime',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'enforce',
      explicitSpread: 'enforce',
      exceptions: ['input', 'textarea', 'Form.Control', 'CustomInput'],
    }],
    'jsx-a11y/label-has-associated-control': [2, {
      labelComponents: ['label'],
      labelAttributes: ['label'],
      controlComponents: ['input', 'strong'],
      depth: 3,
    }],
  },
};
