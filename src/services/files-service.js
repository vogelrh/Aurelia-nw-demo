/**
 * Service that accesses files on host
 */

var osenv = require('osenv');
var fs    = require('fs');
var path  = require('path');
var $q    = require('q');

export class FileService {

  constructor () {

  }

  getHomeFolder () {
    return osenv.home();
  }

  inspectDescribeFile (filePath) {
    var deferred = $q.defer();
    var result = {
      file: path.basename(filePath),
      path: filePath,
      type: ''};

    fs.stat(filePath, function (err, stat) {
      if (err) {
        deferred.reject(err);
      }
      else {
        if (stat.isFile()) {
          result.type = 'file';
        }

        if (stat.isDirectory()) {
          result.type = 'directory';
        }

        deferred.resolve(result);
      }
    });

    return deferred.promise;
  }

  getFilesInFolder(folderPath) {
    var deferred = $q.defer(),
        fObjs = [];

    fs.readdir(folderPath, function (err, files) {

      if (err) {
        deferred.reject(err);
      }
      else {
        try {
          files.forEach(function (f) {
            var fpath = path.resolve(folderPath,f),
                stat = fs.statSync(fpath),
                eix = f.lastIndexOf('.'),
                fpre = f,
                fpost = '',
                result = null;

            if (eix !== -1 && stat.isFile()) {
              fpost = fpre.substring(eix);
              fpre = fpre.replace(fpost,'');
              if (fpre.length > 32) {
                fpre = fpre.substring(0,29) + '..';
              }
            }
            result = {
              file: f,
              displayName: fpre + fpost,
              path: fpath,
              icon: (stat.isFile() ? './src/images/file.png' : stat.isDirectory() ? './src/images/folder.png' : ''),
              type: (stat.isFile() ? 'file' : stat.isDirectory() ? 'directory' : '')
            }
            fObjs.push(result);
          });
        }
        catch (err) {
          deferred.reject(err.message);
        }
        deferred.resolve(fObjs);
      }
    });

    return deferred.promise;
  }
}
