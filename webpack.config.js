const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const DotEnv = require('dotenv-webpack');

const path = require('path');

module.exports = (_env, argsv) => {
  const { mode } = argsv;

  const isProduction = mode === 'production';

  const dotEnvfilename = isProduction ? '.env.production' : '.env';

  const imageLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };
  const jsxConfigRule = {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-react',
          { runtime: 'automatic' },
        ],
      ],
    },
  };

  const scssConfigRule = {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  };

  const cssConfigRule = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  };

  const fontConfigRule = {
    test: /\.woff(2)?/,
    type: 'asset/resource',
    generator: {
      filename: '[hash].[ext]',
    },
  };

  const ttfEotSvgConfigRule = {
    test: /\.(ttf|eot|svg|oft)/,
    type: 'asset/inline',
  };

  const babelLoaderConfigRule = {
    test: /\.js(x)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
      },
    },
  };

  return {
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      chunkFilename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
    },
    module: {
      rules: [
        jsxConfigRule,
        scssConfigRule,
        cssConfigRule,
        imageLoader,
        fontConfigRule,
        ttfEotSvgConfigRule,
        babelLoaderConfigRule,
      ],
    },
    resolve: {
      alias: {
        images: path.resolve(__dirname, 'src/images'),
        extensions: ['.js', '.jpg', '.ico', '.svg', '.gif'],
      },
      extensions: ['', '.*', '.js', '.jsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
      }),
      !isProduction && new ReactRefreshWebpackPlugin(),
      new DotEnv({
        path: dotEnvfilename,
      }),
    ].filter(Boolean),
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      open: true,
      client: {
        overlay: true,
      },
    },

  };
};
