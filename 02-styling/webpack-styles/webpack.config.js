const { mode } = require("webpack-nano/argv");
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");
const path = require("path");
const { merge } = require("webpack-merge");

const commonConfig = {
  mode,
  plugins: [
    new MiniHtmlWebpackPlugin({ context: { title: "Demo" } }),
  ],
  entry: ["./src"],
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.s[ac]ss$/, use: ["style-loader", "css-loader", "sass-loader"] },
    ],
  },
}

const developmentConfig = {
  watch: true,
  plugins: [
    new WebpackPluginServe({
      port: parseInt(process.env.PORT, 10) || 8080,
      static: "./dev",
      liveReload: true,
      waitForBuild: true,
    })
  ],
  entry: ["webpack-plugin-serve/client"],
  output: {
    path: path.resolve(__dirname, 'dev'),
  },
}

const productionConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
}

const res = merge(
  commonConfig, 
  mode === 'development' 
    ? developmentConfig
    : productionConfig
)

module.exports = res

