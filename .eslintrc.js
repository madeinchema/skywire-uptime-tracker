module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'testing-library', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
  },
};
