[![Build Status](https://travis-ci.org/man27382210/watchFile-webpack-plugin.svg?branch=master)](https://travis-ci.org/man27382210/watchFile-webpack-plugin)
# watchFile-webpack-plugin
 * Watch files / folders not under webpack watch. Accepts glob pattern. Turbo powered by chokidar

useage
```
filewatcherPlugin = require("filewatcher-webpack-plugin");
...
plugins: [
        new filewatcherPlugin({watchFileRegex: ['../scriptFolder/**/*.js', '../stylesheets/**/*.css']})
    ],
...
```

** `watchFileRegex` takes a string or an array of strings . String can represent a single file path , or a glob(regex). Here we are watching "all files having extension .js or .css , which is inside any nested folder , contained in folder named `scriptFolder` and `stylesheets` respectively".
