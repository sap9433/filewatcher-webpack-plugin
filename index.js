var chokidar = require('chokidar');

function watchFilePlugin(options) {
  this.options = options;
}

watchFilePlugin.prototype.apply = function(compiler) {
  var that = this;
  compiler.plugin('done', function(compilation) {

    var watcher = chokidar.watch(that.options.watchFileRegex, {
      persistent: that.options.persistance || true,
      ignored: that.options.ignored || false,
      ignoreInitial: that.options.ignoreInitial || false,
      followSymlinks: that.options.followSymlinks || true,
      cwd: that.options.cwd || '.',
      disableGlobbing: that.options.disableGlobbing || false,
      usePolling: that.options.usePolling || true,
      interval: that.options.interval || 100,
      binaryInterval: that.options.binaryInterval || 300,
      alwaysStat: that.options.alwaysStat || false,
      depth: that.options.depth || 99,
      awaitWriteFinish: {
        stabilityThreshold: that.options.stabilityThreshold || 2000,
        pollInterval: that.options.pollInterval || 100
      },

      ignorePermissionErrors: that.options.ignorePermissionErrors || false,
      atomic: that.options.atomic || true // or a custom 'atomicity delay', in milliseconds (default 100)
    });

    watcher
      .on('add', path => console.log(`File ${path} has been added`))
      .on('change', function(path) {
        console.log("started  - "+ path);
        compiler.run(function(err) {
          if (err) throw err;
          monitor.stop();
        });
        console.log("End - "+ path);
      })
      .on('unlink', path => console.log(`File ${path} has been removed`));

    // More possible events.
    watcher
      .on('addDir', path => console.log(`Directory ${path} has been added`))
      .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
      .on('error', error => console.log(`Watcher error: ${error}`))
      .on('ready', () => console.log('Initial scan complete. Ready for changes'))
      .on('raw', (event, path, details) => {
        console.log('Raw event info:', event, path, details);
      });
  });
};

module.exports = watchFilePlugin;
