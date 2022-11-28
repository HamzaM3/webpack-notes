const { mode } = require("webpack-nano/argv");
const {
  MiniHtmlWebpackPlugin,
} = require("mini-html-webpack-plugin");
const path = require('path');

module.exports = {
  mode,
  output: {
    path: path.resolve(__dirname, mode === 'development' ? 'dev' : 'build'),
  },
  plugins: [
    new MiniHtmlWebpackPlugin({ context: { title: "Demo" } }),
  ],
};