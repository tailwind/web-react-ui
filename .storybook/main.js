const path = require('path');

module.exports = {
  stories: ['../src/lib/components/**/*.stories.tsx'],
  addons: [
      '@storybook/addon-actions',
      '@storybook/addon-links',
      {
        name: '@storybook/preset-typescript',
        options: {
          tsLoaderOptions: {
            configFile: path.resolve(__dirname, './tsconfig.json'),
          },
          forkTsCheckerWebpackPluginOptions: {
            colors: false, // disables built-in colors in logger messages
          },
          include: [path.resolve(__dirname, '../src')],
          transpileManager: true,
        },
      },
      'storybook-addon-react-live-edit/dist/register'
  ],
};
