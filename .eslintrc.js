/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@remix-run/react',
            importNames: ['Link', 'NavLink'],
            message: "Please use components from '~/components/(ui)/atoms/' instead.",
          },
        ],
      },
    ],
  },
};
