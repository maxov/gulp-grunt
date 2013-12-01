# gulp-grunt
#### Run grunt tasks from gulp
This plugin is a bit different from most other gulp plugins.
You cannot use it inline, because it does not create a stream.
Rather, use it at the top of your gulpfile, calling it with your gulp as an argument.

## Example usage
```js
var gulp = require('gulp')
require('gulp-grunt')(gulp) // add all the gruntfile tasks to gulp

// continue defining tasks...
gulp.task('do-this', function () {
    ...
})

// run them like any other task
gulp.task('default', function () {
    gulp.run('grunt-minify')
    gulp.run('grunt-test')
})
```
Note that all the grunt tasks that were added begin with the prefix 'grunt-'.
This is for usability, so that your grunt tasks do not clash with your gulp tasks.
Also note that `require('gulp-grunt')(gulp)` does not have to be at the top of your file.
It could very well be at the bottom, except that then it could possibly overwrite some of your
gulp tasks.

## Configuration
Configuration is done with the function call:
```js
require('gulp-grunt')(gulp, {
    base: '...',
    prefix: '...'
})
```

### options.base
This tells grunt where to look for your gruntfile.
Set it to some absolute path.
This may require you to use `path.join` for relative paths:
```js
require('gulp-grunt')(gulp, {
    base: require('path').join(__dirname, 'yourrelativepathhere')
})
```

### options.prefix
This tells gulp-grunt how to prefix your tasks.
For instance, if in the gruntfile you define the tasks 'minify' and 'compile',
and if you pass gulp-grunt this configuration:
```js
require('gulp-grunt')(gulp, {
    prefix: 'theknightswhosay-'
})
```
The grunt tasks can be called from gulp, except they would have the prefix, so
'theknightswhosay-minify' and 'theknightswhosay-compile'.

You can simply pass in an empty string(`'`) if you wish to have no prefix.

### default options

<table>
<tr> 
<td>base</td>
<td>__dirname(this is of gulp-grunt when you require() it.
Essentially just the directory your Gulpfile is in.</td>
</tr>
<tr>
<td>prefix</td>
<td>'grunt-'</td>
</tr>
</table>

Have fun grunting and gulping! :D