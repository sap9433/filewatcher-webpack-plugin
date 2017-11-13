const chokidar = require('chokidar');

function filewatcherPlugin(options) {
  this.options = options;
}

filewatcherPlugin.prototype.apply = function(compiler) {
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
      atomic: that.options.atomic || true
    });

    watcher
      .on('add', path => null)
      .on('change', function(path) {
        console.log(`\n\n Compilation Started  after change of - ${path}\n\n`);
        compiler.run(function(err) {
          if (err) throw err;
          watcher.close();
        });
        console.log(`\n\nComilation ended  for change of - ${path}\n\n`);
      })
      .on('unlink', path => console.log(`File ${path} has been removed`));

    // More possible events.
    watcher
      .on('addDir', path => console.log(`Directory ${path} has been added`))
      .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
      .on('error', error => console.log(`Watcher error: ${error}`))
      .on('ready', () => console.log('Initial scan complete. Ready for changes'))
      .on('raw', (event, path, details) => null);
  });
};

module.exports = filewatcherPlugin;
