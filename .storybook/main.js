const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
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
  ],
};
