const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './assets/js/index.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      //section added "" public path to prevent auto prefix on manifest path
      publicPath: "", //section
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TODOs List'
      }),
      new GenerateSW(),
      // TODO: Create a manifest.json:
      new WebpackPwaManifest({
        name: "TODOs Manifest Example",
          short_name: "Manifest",
          orientation: "portrait",
          display: "standalone",
          start_url: "./",
          description: "Keep track of important tasks!",
          background_color: "#7eb4e2",
          theme_color: "#7eb4e2",
          icons: [
            {
              src: "./assets/images/icon_96x96.png",
              type: "image/png",
              sizes: "96x96"
            },
            {
              src: "./assets/images/icon_128x128.png",
              type: "image/png",
              sizes: "128x128"
            },
            {
              src: "./assets/images/icon_192x192.png",
              type: "image/png",
              sizes: "192x192"
            },
            {
              src: "./assets/images/icon_512x512.png",
              type: "image/png",
              sizes: "512x512"
            }
          ],
        }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
