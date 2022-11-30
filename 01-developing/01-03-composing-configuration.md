# Composing configuration
multiple bundle modes (prod, dev, test...) => high complexity of config

let's learn how to make decompose config (then recompose it) to make it clearer
## Possible ways to manage configuration
(why not create a webpack language of programmation to remove all the js noise)

4 ways to config webpack:
- multiple files for each env type and use `--config` + shared config in imports
- let libraries take care of it (Neutrinojs)
- let tools take care of it (create-react-app)
- one file that depends on the value of the `--mode` parameter

## Composing configuration by merging
How to merge two objects ? Normally, `Object.assign`.
What happens when the two objects have the same key ?
-> We would like their value to merge if both are arrays or objects
-> Object.assign takes one of the values and leaves the other.
=> That's why `webpack-merge` was created

Just do `import {merge} from 'webpack-merge'` et voilà

`webpack-chain` is another version

## Setting up `webpack-merge`

1. `npm i webpack-merge -D`
2. Create `webpack.parts.js` and export each field it in.
3. In `webpack.config.js` import them + merge + mode
4. Create a common, a production and a development with `merge([<config objects>])`
5. then `switch(mode)` and merge common with the `<mode>` config
6. export the result

![[Pasted image 20221130112646.png]]

## Benefits of composing configuration
- config expandable
- typing
- make config as a package and work from there
- versioning possible (=> documenting the changes to consumer)
- new custom `create-react-app` for instance

(cool book  [SurviveJS - Maintenance](https://survivejs.com/maintenance/))

## Configuration layouts
publish a package for webpack config that can be split following:

### Split per configuration target
per modes

### Split parts per purpose
one devserver files, one babel file etc...

### Guidelines for building your own configuration packages

- Typescript is cool
- one functionality <-> one function (=> replacability)
- customization with options
- include all dependencies in package (look up peerDependency)
- !! path when searching loader (use `require.resolve`)
- loader wrap -> use its typescript types
- test package with snapshots (`expect().toMatchSnapshot()`)

## Conclusion
![[Pasted image 20221130114204.png]]
