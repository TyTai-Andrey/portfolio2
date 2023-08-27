const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env = {}) => {
  const { mode = 'development' } = env;

  const isProd = mode === 'production';
  const isDev = mode === 'development';
  const isDevES = mode === 'developmentES';

  const getStyleLoaders = (preProcessor) => {
    const loaders = [{ loader: 'style-loader' }, { loader: 'css-loader' }];

    if (preProcessor) {
      loaders.push({ loader: 'resolve-url-loader' }, { loader: preProcessor });
    }

    return loaders;
  };

  const rules = [
    {
      test: /\.(css)$/,
      use: getStyleLoaders(),
    },
    {
      test: /\.(scss)$/,
      use: getStyleLoaders('sass-loader'),
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[name].[ext]',
          },
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts',
            name: '[name].[ext]',
          },
        },
      ],
    },
  ];

  if (isDevES) {
    rules.push(
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2016',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2016',
        },
      },
    );
  } else {
    rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: ['ts-loader'],
    });
  }

  return {
    mode: isProd ? 'production' : (isDev || isDevES) && 'development',

    entry: './src/index.tsx',

    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
      filename: `bundle-${Number(new Date())}.js`,
    },

    devtool: (isDev || isDevES) && 'cheap-module-source-map',

    module: {
      rules,
    },

    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],

      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@api': path.resolve(__dirname, './src/api'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@redux': path.resolve(__dirname, './src/redux'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@store': path.resolve(__dirname, './src/store'),
      },
    },

    devServer: {
      open: false,
      historyApiFallback: true,
      overlay: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),
    ],
  };
};
