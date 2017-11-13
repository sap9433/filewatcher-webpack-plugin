const chokidar = require('chokidar');

function filewatcherPlugin(options) {
  this.options = options;
}

filewatcherPlugin.prototype.apply = function(compiler) {
  const options = this.options;
  compiler.plugin('done', function(compilation) {
    var watcher = chokidar.watch(options.watchFileRegex, {
      persistent: options.persistance || true,
      ignored: options.ignored || false,
      ignoreInitial: options.ignoreInitial || false,
      followSymlinks: options.followSymlinks || true,
      cwd: options.cwd || '.',
      disableGlobbing: options.disableGlobbing || false,
      usePolling: options.usePolling || true,
      interval: options.interval || 100,
      binaryInterval: options.binaryInterval || 300,
      alwaysStat: options.alwaysStat || false,
      depth: options.depth || 99,
      awaitWriteFinish: {
        stabilityThreshold: options.stabilityThreshold || 2000,
        pollInterval: options.pollInterval || 100
      },

      ignorePermissionErrors: options.ignorePermissionErrors || false,
      atomic: options.atomic || true
    });

    watcher
      .on(
        'add',
        options.onAddCallback ||
          function(path) {
            return null;
          }
      )
      .on(
        'change',
        options.onChangeCallback ||
          function(path) {
            console.log(`\n\n Compilation Started  after change of - ${path} \n\n`);
            compiler.run(function(err) {
              if (err) throw err;
              watcher.close();
            });
            console.log(`\n\n Compilation ended  for change of - ${path} \n\n`);
          }
      )
      .on(
        'unlink',
        options.onUnlinkCallback ||
          function(path) {
            console.log(`File ${path} has been removed`);
          }
      );

    watcher
      .on(
        'addDir',
        options.onAddDirCallback ||
          function(path) {
            console.log(`Directory ${path} has been added`);
          }
      )
      .on(
        'unlinkDir',
        options.unlinkDirCallback ||
          function(path) {
            console.log(`Directory ${path} has been removed`);
          }
      )
      .on(
        'error',
        options.onErrorCallback ||
          function(error) {
            console.log(`Watcher error: ${error}`);
          }
      )
      .on(
        'ready',
        options.onReadyCallback ||
          function() {
            console.log('Initial scan complete. Ready for changes');
          }
      )
      .on(
        'raw',
        options.onRawCallback ||
          function(event, path, details) {
            return null;
          }
      );
  });
};

module.exports = filewatcherPlugin;
