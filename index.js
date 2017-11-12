var watch = require('watch');
var path  = require('path');
var fs    = require('fs');


function watchFilePlugin(options) {
  this.options = options;
}

watchFilePlugin.prototype.apply = function(compiler) {
  var that = this;
  compiler.plugin("emit", function(compilation, callback) {
    var watchFolder = that.options.watchFolder;
    watch.createMonitor(watchFolder, function(monitor){
      monitor.files[path.join(watchFolder, "/*."+that.options.watchExtension)]
      monitor.on("changed", function (f, curr, prev) {
        compiler.run(function(err) {
          if(err) throw err;
          monitor.stop();
        });
      });
    });
    callback();
  });
};

module.exports = watchFilePlugin;