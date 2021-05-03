module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  plugins: ["testing-library"],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
     'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }]
  },
};
