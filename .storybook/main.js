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
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Make whatever fine-grained changes you need
        config.module.rules.push({
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: path.resolve(__dirname, '../'),
        });

        // Return the altered config
        return config;
    },
};
