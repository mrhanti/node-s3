var sys = require('sys');
var exec = require('child_process').exec;
var child;

var fs = require('fs');
var traverseFileSystem = function (currentPath) {
  var files = fs.readdirSync(currentPath);
  for (var i in files) {
    var currentFile = currentPath + '/' + files[i];
    var stats = fs.statSync(currentFile);

    if (stats.isDirectory()) {
      var src = currentFile + '/';
        dest = currentFile.replace(/^dist/, 'b2b') + '/';

      (function(method, src, dest) {
        var command = [
          "s3cmd/s3cmd",
          "-r",
          method,
          src,
          "s3://mydriverstatic/" + dest
        ].join(" ");

        child = exec(command, function (error, stdout, stderr) {
          sys.print(stdout);
          sys.print(stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
        });
      })("put", src, dest);

      // traverseFileSystem(currentFile);
    }
  }
};

traverseFileSystem('dist');
