const path = require('path');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const PostCSSPresetEnv = require('postcss-preset-env');
const { DefinePlugin } = require('webpack');
const { name: packageName } = require('./package.json');

const { log } = console;
const pluginName = packageName.replace(/-([a-z])/g, substring => substring[1].toUpperCase());

module.exports = (env, argv) => {
  // Get webpack mode, default to production
  let { mode } = argv;
  if (!['development', 'production'].includes(mode)) {
    mode = 'production';
  }
  const isDevMode = mode === 'development';

  // Log the mode to console
  log(
    `${chalk.blue(isDevMode ? 'Watching and bundling in' : 'Bundling in')} ${chalk.blue.bold(
      mode.toUpperCase(),
    )} ${chalk.blue('mode ...')}`,
  );

  return {
    mode,
    watch: isDevMode,
    watchOptions: {
      ignored: ['node_modules', 'dist'],
    },

    // This is necessary because Figma's 'eval' works differently than normal eval
    devtool: isDevMode ? 'inline-source-map' : false,

    entry: {
      ui: './src/ui/index.tsx', // The entry point for your UI code
      code: './src/code/index.ts', // The entry point for your plugin code
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
    },

    module: {
      rules: [
        // Enables including CSS by doing "import './file.css'" in your TypeScript code
        // and supports PostCSS features
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  PostCSSPresetEnv({
                    stage: 3,
                  }),
                ],
                sourceMap: argv.mode !== 'production',
              },
            },
          ],
        },

        // Allows you to import images in your HTML code to get a data URI
        { test: /\.(png|jpg|gif|webp|svg|zip)$/, loader: [{ loader: 'url-loader' }] },

        // Converts TypeScript code to JavaScript
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
          exclude: '/node_modules/',
        },
      ],
    },

    // Webpack tries these extensions for you if you omit the extension like "import './file'"
    resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

    plugins: [
      // Inject dev/prod env into a figmaPluginsEnv object
      new DefinePlugin({
        figmaPluginsEnv: JSON.stringify({ [pluginName]: mode }),
      }),

      // Tells Webpack to generate "ui.html" and to inline "ui.ts" into it
      new HtmlWebpackPlugin({
        template: './src/ui/index.html',
        filename: 'ui.html',
        inlineSource: '.(js|css)$',
        chunks: ['ui'],
      }),
      new HtmlWebpackInlineSourcePlugin(),
    ],
  };
};
