[![Build Status](https://travis-ci.org/man27382210/watchFile-webpack-plugin.svg?branch=master)](https://travis-ci.org/man27382210/watchFile-webpack-plugin)
# watchFile-webpack-plugin
 
 > Watch files / folders not under webpack watch. Accepts glob pattern. Turbo powered by [chokidar](https://github.com/paulmillr/chokidar)


 #### Useage

 Most simplistic use of this plugin would be -

```
const filewatcherPlugin = require("filewatcher-webpack-plugin");
...
plugins: [
        new filewatcherPlugin({watchFileRegex: ['../scriptFolder/**/*.js', '../stylesheets/**/*.css']})
    ],
...
```

`watchFileRegex` takes a string or an array of strings . String can represent a single file path , or a glob(regex). Here we are watching "all files contained in folder named `scriptFolder` and `stylesheets` (or any nested folder inside it) having extension .js or .css respectively".

---------------------


#### Why do we even need such a plugin ?

Hmmm. If that's what you are thinking , thanks for your focus . It's a good question . Firstly there already exists [a few](https://www.npmjs.com/package/file-watcher-webpack-plugin) plugins [for this](https://github.com/Fridus/webpack-watch-files-plugin) . Which suggests there is surely a need for this . Let me explain when - 

If you are bootstrapping a conventional webpack project , probably you won't need this . But if you are integrating webpack in an existing complex project , there might arise a situation when you have to watch for files , outside the perview of webpack, and restart compilation.

We faced a simialar issue while integrating , service worker in our large complex code base. Only a part of the codebase is in react and built using webpack , Rest of the code base is powered by jQuery / Bootstarp  . When we added [workbox](https://developers.google.com/web/tools/workbox/) , we had to regenarate the `sw.js` file by restarting webpach compilation even when some Jquery/Css file beyond the ambit of webpack will change . And this plugin was born.

All of the exixting plugin had limitations , i.e. they either doesn't listen to a changes in entire directory tree / they dont allow us to override file change event handler callBacks.

#### I'm feeling super geeky and tell me more about how can I play with this plugin , a.k.a supported options