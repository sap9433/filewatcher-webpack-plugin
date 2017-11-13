[![Build Status](https://travis-ci.org/sap9433/filewatcher-webpack-plugin.svg?branch=master)](https://travis-ci.org/sap9433/filewatcher-webpack-plugin)
# watchFile-webpack-plugin ([AustinJs](https://www.npmjs.com/package/filewatcher-webpack-plugin))
[![forthebadge](http://forthebadge.com/images/badges/built-with-swag.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/for-you.svg)](http://forthebadge.com)


 
 > A webpack plugin to Watch files / folders not under webpack watch. Accepts glob pattern. Turbo powered by [chokidar](https://github.com/paulmillr/chokidar)


 #### [Usage](https://www.npmjs.com/package/filewatcher-webpack-plugin) :snowflake: :sunny:

 Most simplistic use of this plugin would be using the following in your webpack.config.js file -

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


#### Why do we even need such a plugin ? :no_mouth: :star:

Thanks for your focus . It's a good question . Firstly there already exists [a few](https://www.npmjs.com/package/file-watcher-webpack-plugin) plugins [for this](https://github.com/Fridus/webpack-watch-files-plugin) . Which suggests there is surely a need for this functionality . Let me explain when - 

If you are bootstrapping a conventional webpack project , probably you won't need this . But if you are integrating webpack in an existing complex project , there might arise a situation when you have to watch for files , outside the purview of webpack, and restart compilation.

We faced a similar issue while integrating , service worker in our large complex code base. Only a part of the codebase is in react and built using webpack , Rest of the code base is powered by jQuery / Bootstarp  . When we added [workbox](https://developers.google.com/web/tools/workbox/) , we had to regenerate the `sw.js` file by restarting webpack compilation even when some Jquery/Css file, beyond the purview of webpack, will change . And this plugin was commissioned.

All of the existing plugin had limitations , i.e. they either doesn't listen to changes in entire directory tree / they don't allow us to override file change event handler callBacks.

---------------------

#### I'm feeling super geeky and tell me more about how can I play with this plugin , a.k.a Supported options :bulb: :electric_plug:

> All the following options are basically chokidar API options . So please refer [this](https://github.com/paulmillr/chokidar#api) for the original source .

###### API Options, related to files / path to watch ignore etc. :shower: :hammer:

Supported Options | Details
------------ | -------------
watchFileRegex | (string or array of strings). Paths to files, dirs to be watched recursively, or glob patterns.
persistent (default: true) |  Indicates whether the process should continue to run as long as files are being watched. If set to false when using fsevents to watch, no more events will be emitted after ready, even if the process continues to run.
ignored (anymatch-compatible definition) | 	Defines files/paths to be ignored. The whole relative or absolute path is tested, not just filename. If a function with two arguments is provided, it gets called twice per path - once with a single argument (the path), second time with two arguments (the path and the fs.Stats object of that path).
ignoreInitial (default: false) | If set to false then add/addDir events are also emitted for matching paths while instantiating the watching as chokidar discovers these file paths (before the ready event).
followSymlinks (default: true) | When false, only the symlinks themselves will be watched for changes instead of following the link references and bubbling events through the link's path.
cwd (no default) | The base directory from which watch paths are to be derived. Paths emitted with events will be relative to this.
disableGlobbing (default: false) | If set to true then the strings passed to .watch() and .add() are treated as literal path names, even if they look like globs.

----

###### API Options, related to Performance.  :money_with_wings: :flashlight:

Supported Options | Details
------------ | -------------
usePolling (default: false) | Whether to use fs.watchFile (backed by polling), or fs.watch. If polling leads to high CPU utilization, consider setting this to false. It is typically necessary to set this to true to successfully watch files over a network, and it may be necessary to successfully watch files in other non-standard situations. Setting to true explicitly on OS X overrides the useFsEvents default. You may also set the CHOKIDAR_USEPOLLING env variable to true (1) or false (0) in order to override this option.When usePolling: true , interval default is 100. 
useFsEvents (default: true on OSX)| Whether to use the fsevents watching interface if available. When set to true explicitly and fsevents is available this supercedes the usePolling setting. When set to false on OS X, usePolling: true becomes the default.
alwaysStat (default: false) | If relying upon the fs.Stats object that may get passed with add, addDir, and change events, set this to true to ensure it is provided even in cases where it wasn't already available from the underlying watch events.
depth (default: 99) | If set, limits how many levels of subdirectories will be traversed.
awaitWriteFinish (default: false) | 	By default, the add event will fire when a file first appears on disk, before the entire file has been written. Furthermore, in some cases some change events will be emitted while the file is being written. In some cases, especially when watching for large files there will be a need to wait for the write operation to finish before responding to a file creation or modification. Setting awaitWriteFinish to true (or a truthy value) will poll file size, holding its add and change events until the size does not change for a configurable amount of time. The appropriate duration setting is heavily dependent on the OS and hardware. For accurate detection this parameter should be relatively high, making file watching much less responsive. Use with caution.options.awaitWriteFinish can be set to an object in order to adjust following timing params. 
awaitWriteFinish.stabilityThreshold (default: 2000) | Amount of time in milliseconds for a file size to remain constant before emitting its event.
awaitWriteFinish.pollInterval (default: 100) | File size polling interval.

-----

###### API Options, related to Errors. :mega: :key:
Supported Options | Details
------------ | -------------
ignorePermissionErrors (default: false) | Indicates whether to watch files that don't have read permissions if possible. If watching fails due to EPERM or EACCES with this set to true, the errors will be suppressed silently.
atomic (default: true if useFsEvents and usePolling are false) | Automatically filters out artifacts that occur when using editors that use "atomic writes" instead of writing directly to the source file. If a file is re-added within 100 ms of being deleted, Chokidar emits a change event rather than unlink then add. If the default of 100 ms does not work well for you, you can override it by setting atomic to a custom value, in milliseconds.


###### API Options, related to Callbacks.  :basketball: :golf:

> With great power comes great responsibility. If you are trying to override compilation stages , please [read this](https://github.com/webpack/docs/wiki/how-to-write-a-plugin) to avoid breaking stuff. 
<img src="./with-great-power-comes-great-responsibility-spider-man-super-powers-abilities-voltaire-quote.jpg" width="400" height="300" /> 

Supported Options | Details
------------ | -------------
onAddCallback | Must be a function . Callback to be executed when a new file added which matches the path mentioned in `watchFileRegex` . defaults to ``` function(path) { return null;} ```
onChangeCallback | Must be a function . Callback to be executed when any file, under file-watcher's purview, is changed  . defaults to ``` function(path) {console.log(`\n\n Compilation Started  after change of - ${path} \n\n`);compiler.run(function(err) {if (err) throw err;watcher.close();});console.log(`\n\n Compilation ended  for change of - ${path} \n\n`);} ``` . [Compiler](https://github.com/webpack/docs/wiki/plugins) is webpack object.
onUnlinkCallback | Must be a function . Callback to be executed when a file is unlinked . defaults to ``` function(path) { console.log(`File ${path} has been removed`);} ```
onAddDirCallback | Must be a function . Callback to be executed when a new folder added . defaults to ``` function(path) { console.log(`Directory ${path} has been added`);} ```
onReadyCallback | Must be a function . Callback to be executed when all the files are added to the watcher and watcher is ready to monitor change . defaults to ``` function() { console.log('Initial scan complete. Ready for changes');} ```
onRawCallback | Must be a function . Callback to be executed when a raw event is encountered . defaults to ``` function(event, path, details) { return null;} ```
onErrorCallback | Must be a function . Callback to be executed when watcher thows an error . Defaults to ``` function(error) { console.log(`Watcher error: ${error}`);} ```


###### Advance use example :helicopter: :airplane:

At the starting we have shown the very basic use of `filewatcher-webpack-plugin` . Now as we are powered with the above api options lets use some of them to override the default

```
const filewatcherPlugin = require("filewatcher-webpack-plugin");
...
plugins: [
        new filewatcherPlugin({
            watchFileRegex: ['../js/**/*.js', '../style/**/*.css'], 
            onReadyCallback: () => console.log('Yo Im ready'),
            usePolling: false,
            ignored: '/node_modules/'
        }),
    ],
...


``` 

###### Support . :snowboarder: :spades:

> Here I'm . [This is me](https://www.linkedin.com/in/saptarshi-chatterjee-55a22613) . Mail me if you see a problem (saptarshichatterjee1@gmail.com), and I generally reply back within 24 hours. 