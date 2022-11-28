demo: https://github.com/survivejs-demos/webpack-demo

use node and npm

## Setting up the project
do `npm init -y`

## Installing webpack
you can install webpack globally (but control the version by installing it locally (good for CI))

do `npm install -D webpack webpack-nano`

`webpack-nano` is the light version of `webpack-cli` (cli is good for creating config fast and update version efficiently)
-> but it's enough for us (works for wp 4 and 5)

(wp = webpack)

## Running webpack
webpack-nano is at `node_modules/.bin/wp`

You can do `npx wp`

Default behavior:
1. looks for `src/index.js`
2. `npx wp`
3. outputs `dist/main.js`

## Setting up assets
import works !

## Configuring mini-html-webpack-plugin
let's test the result

`npm install -D mini-html-webpack-plugin`

3 modes:
- production: default = minified
- development: default = eval each modules
- none: default = everything in one file with no modification (for debugging)

In whatever mode, you have an index.html that insert the script

entry: initial directory/file
output: directory/file of output

## Examining the output
There is a cool message in the console to analyze what happened

wp 5 has a more optimized output btw

## Adding a build shortcut
add `webpack --mode production` as  `build` script

([concurrently](https://www.npmjs.com/package/concurrently) is a cool package to allow to execute multiple commands at async (+cool output))

## Conclusion
![[Pasted image 20221127232454.png]]