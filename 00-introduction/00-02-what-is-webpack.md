# What is webpack
*Webpack* = module bundler

*Task runner* = program that automatically executes in the background

! Webpack has more and more task runner features

*Hot Module Replacement:* rebundling module after modification during the development process. Used to easily see the effect of said modification automatically in the browser.

Webpack can be used for more than website bundling.

Check *Comparison of Build Tools appendix* for history of build

## Webpack relies on modules
You give *input* code, and webpack *output*s the bundle

Bundling starts from certain modules (*entries*) specified by the user. These modules point to other modules through *imports*

This gives a *dependency graph*.

The *output* bundle is generated following the parameters specified in the *config*.

There is a way to create multiple bundles with *split points* (later).

*Chunks* are the files that constitute the output bundle.

A lot of syntax is supported. A lot of plugins available.

*Loader*: it's a way to insert code from another file. Importing = Loading
-> We could call it *importer*
-> So `css-loader` means css importer (handled `url()` and `@import`)

## Webpack’s execution process

![[Pasted image 20221127184619.png]]

entry point (+ dependency)
file is tested and associated with a loader
loader specifies how each file is to be transformed

### Resolution process
*Resolution*: find what file is the import talking about

Customizable with the `resolve` field in config
-> add file extensions
-> add folders
-> add aliases

Once resolved, the file is passed throught the loader as above until the dependency graph is traversed

It's possible to customize loaders
-> even using personal ones
	=> Which means loaders also have to be resolved (=> there are options for that)

Webpack relies on [enhanced-resolve](https://www.npmjs.com/package/enhanced-resolve) for resolution

### Webpack resolves against any file type
resolve module => add dependency modules => resolve each modules => ...

Webpack can consider any type of file as a dependency. (we can import anything !)

*inlining assets*: all imports of the asset will take the form of an object representing fully its content (ex: image -> base64).
-> Allows one to avoid having to query the server to get it (it's within the resulting bundle)
-> https://webpack.js.org/guides/asset-modules/

*CSS Modules*: Allows one to import css (in various senses (that can be customized)) in a js module
-> import css can mean: import path to css, import it as an object...

### Evaluation process
Loaders are executed from bottom to top (or right to left)

Output goes in the bundle

Interesting! Webpack considers everything as JS, CSS included.

Add plugins to intercept *runtime events*

MiniCssExtractPlugin: plugin that extracts the CSS that got stuck in the bundle during the loading process

### Finishing
Output = js chunks + manifest (like index.js)

You can define split point that are sent conditionnally

Fact: code splitting is the cause webpack got created

## Webpack is configuration driven

```js
const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: { app: "./entry.js" }, // Start bundling
	output: {
		path: path.join(__dirname, "dist"), // Output to dist directory
		filename: "[name].js", // Emit app.js by capturing entry name
	},
	// Resolve encountered imports
	module: {
		rules: [
			{ test: /\.css$/, use: ["style-loader", "css-loader"] },
			{ test: /\.js$/, use: "swc-loader", exclude: /node_modules/ },
		],
	},
	// Perform additional processing
	plugins: [new webpack.DefinePlugin({ HELLO: "hello" })],
	// Adjust module resolution algorithm
	resolve: { alias: { react: "preact-compat" } },
};
```

Just like all declarative languages, you have to learn the concepts to know what is going on
-> CSS is declarative
-> SQL, HTML...

plugins: first to last
loader: last to first

## Hot Module Replacement
reload at each modification (for development)

## Asset hashing
add hashes to chunks (`app.d8294028.js`) for security (don't know how)

## Code splitting
"Performance is a feature"

Code splitting: Lazy loading, have functional website first (then load the rest)

## Webpack 5
New feature:
- caching
- micro frontend style developement (Module Federation)
- better internal apis
- better defaults

Read [this](https://webpack.js.org/blog/2020-10-10-webpack-5-release/).

Migration

## Conclusion
![[Pasted image 20221127193912.png]]
