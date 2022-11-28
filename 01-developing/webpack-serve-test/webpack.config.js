const { mode } = require("webpack-nano/argv");
const {
	MiniHtmlWebpackPlugin,
} = require("mini-html-webpack-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");
const path = require("path");

const plugins = [new MiniHtmlWebpackPlugin({ context: { title: "Demo" } })]
if (mode === 'development')
  plugins.push(
    new WebpackPluginServe({
      port: parseInt(process.env.PORT, 10) || 8080,
      static: "./dev",
      liveReload: true,
      waitForBuild: true,
    })
  )

module.exports = {
	watch: mode === "development",
	entry: ["./src", "webpack-plugin-serve/client"],
  mode,
  output: {
    path: path.resolve(__dirname, mode === 'development' ? 'dev': 'dist'),
  },
	plugins,
};
