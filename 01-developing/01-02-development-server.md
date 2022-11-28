# Development Server
Reloading after each change is annoying => automatic refresh/update created
-> Ex: LiveReload and Browsersync cool
-> If CSS change, you canhave the style updated with no refresh (state preserved)

`browser-sync-webpack-plugin` allows browsersync+webpack

Webpack  has `watch` mode+development server which is better 

## Webpack `watch` mode
watch mode allows rebundling at each modification (does not update browser)

Set `watch` field as true in config
Or add `--watch` to the cli

## `webpack-dev-server`
it's a server that bundles **in memory** (i.e. no files generated (the bundle is a variable let's say))
=> debug++
=> style++
=> update efficiency++

`devServer` is a config field that specifies wds behavior
- `historyApiFallback`: if routing based on HTML5 History API
- `contentBase`: if index is not generated dynamically (and it's maintained manually), put here the path
- `proxy`: for multiple servers
- `headers`: custom headers to requests
- `writeToDisk`: wds generates the files (allows for other servers to work with the output)

> This is for development only (use nginx apache..)

wds depends on webpack cli

## `webpack-plugin-serve`
Inserts the logic for browser update inside bundle.

so wps = watch + logic insertion => hmr

> wps writes to the file system (bc of watch)
> install `webpack-plugin-ramdisk` to write in RAM

### Getting started with webpack-plugin-serve

install wps:

```
npm install -D webpack-plugin-serve
```

create a `start` script:
```json
{
	"scripts": {
		"start": "wp --mode development",
	}
}
```
create config
```json
const { mode } = require("webpack-nano/argv");
const {
	MiniHtmlWebpackPlugin,
} = require("mini-html-webpack-plugin");
const { WebpackPluginServe } = require("webpack-plugin-serve");

module.exports = {
	watch: mode === "development",
	entry: ["./src", "webpack-plugin-serve/client"],
	mode,
	plugins: [
		new MiniHtmlWebpackPlugin({ context: { title: "Demo" } }),
		new WebpackPluginServe({
			port: parseInt(process.env.PORT, 10) || 8080,
			static: "./dist",
			liveReload: true,
			waitForBuild: true,
		}),
	],
};
```

Ngl, webpack-nano/argv is cool

It works

## Accessing development server from the network
some advice about remote and host change

## Polling instead of watching files
Docker and Vagrant don't work with watch
-> event of changes in files is not forwarded
=> Solution = polling
(or `vagrant-notify-forwarder`)

```json
module.exports = {
	watchOptions: {
		aggregateTimeout: 300, // Delay the first rebuild (in ms)
		poll: 1000, // Poll using interval (in ms or a boolean)
		ignored: /node_modules/, // Ignore to decrease CPU usage
	},
};
```
More resource intensive than watch

## Making it faster to develop webpack configuration
wds/watch doesn't watch config

use nodemon to get it to work:
```json
{
	"scripts": {
		"watch": "nodemon --watch \"./webpack.*.*\" --exec \"npm start\"",
		"start": "wp --mode development"
	}
}
```
## Development plugins
- `case-sensitive-paths-webpack-plugin`: takes care of path changes btw os's
- `react-dev-utils`: for create-react-app
- `webpack-notifier`: notifications of webpack status

## Watching files outside of webpack’s module graph
`webpack-add-dependency-plugin`

## Conclusion
![[Pasted image 20221128155623.png]]In the next chapter, you’ll learn to compose configuration so that it can be developed
further later in the book.