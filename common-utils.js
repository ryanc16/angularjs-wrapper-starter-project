const fs = require('fs');
const shell = require('child_process').execSync;
const syspath = require('path');

const CommonUtils = {

  checkDirectoryExists: function(path) {
    return fs.existsSync(syspath.normalize(path));
  },

  checkFileExists: function(path) {
    return fs.existsSync(syspath.normalize(path));
  },

  createDirectoryRecursive: function(path) {
    path = syspath.normalize(path);
    console.log('creating ' + path)
    fs.mkdirSync(path, {recursive: true})
  },

  deleteDirectoryRecursive: function(path) {
    path = syspath.normalize(path);
    let files = [];
    if(fs.existsSync(path) ) {
      files = fs.readdirSync(path);
      for(const file of files) {
        const curPath = syspath.normalize(syspath.join(path, file));
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
            CommonUtils.deleteDirectoryRecursive(curPath);
        }
        else { // delete file
            fs.unlinkSync(curPath);
        }
      }
      fs.rmdirSync(path);
    }
  },

  deleteFile: function(path) {
    fs.unlinkSync(syspath.normalize(path));
  },

  readFile: function(path) {
    if(CommonUtils.checkFileExists(path)) {
      return fs.readFileSync(syspath.normalize(path));
    }
    return null;
  }

}

module.exports = CommonUtils;