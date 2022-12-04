# Loading styles
css handling is not there by default

## Loading CSS
You need `css-loader` and `style-loader`

`css-loader`: for `@import` and `url()` (treated as import)
`style-loader`: injects styling in `<style>` element
-> allows for HMR

`type` field allows for asset modules processing (later)

`MiniCssExtractPlugin` allows to de-inline CSS

```
npm add css-loader style-loader -D
```

> What style-loader does is it's adding js code to the bundle that adds the `<style>` element

## PostCSS
PostCSS = Babel for CSS
- fixes bugs and a lot of code transform

## Using CSS preprocessors
less-loader
sass-loader
fast-sass-loader
stylus-loader

Learn about how to make css local to each file

## Understanding css-loader lookups
works by default with absolute and relative imports, but not root

Use copy to get it to work

To avoid import lookup: `{import: false}`
`{url:false}` for url

### Processing css-loader imports
if sass imports do :
```js
const config = {
	test: /\.css$/,
	use: [
		"style-loader",
		{
			loader: "css-loader",
			options: { importLoaders: 1 },
		},
		"sass-loader",
	],
};
```
`importLoaders` basically says that cssloader should import a file after it went through on importLoader before it.
If you want to add `postcss` you have to set it to 2 and so on.

### Loading from `node_modules` directory
to import css files in node modules use `~`
ex: `@import "∼bootstrap/less/bootstrap"`

## Conclusion

![[Pasted image 20221204122214.png]]

THIS IS FOR DEVELOPMENT (next chapter deals with production)