const utils = require('./common-utils');
const shell = require('child_process').execSync;

function main() {

  const args = process.argv.splice(2);
  // console.log(args);
  const buildConfig = readConfig();
  const buildProd = hasArg(args, '--prod');
  if(buildProd) {
    console.log('building for: PROD...');
  }
  else {
    console.log('building for: DEV...');
  }

  if(hasArg(args, '--clean')) {
    clean();
  }
  if(utils.checkDirectoryExists('node_modules') === false) {
    npmInstall();
  }
  utils.deleteDirectoryRecursive('dist');

  utils.createDirectoryRecursive('dist');

  tsCompile(buildProd);

}

function readConfig() {
  return JSON.parse(utils.readFile('build.config.json').toString());
}


function clean() {
  console.log('cleaning project...');
  if(utils.checkDirectoryExists('node_modules')) {
    utils.deleteDirectoryRecursive('node_modules');
  }
  if(utils.checkFileExists('src/app/templates.ts')) {
    utils.deleteFile('src/app/templates.ts');
  }
  if(utils.checkFileExists('src/app/stylesheets.ts')) {
    utils.deleteFile('src/app/stylesheets.ts');
  }
}

function npmInstall() {
  console.log('installing dependencies...')
  shell('npm install');
}

function tsCompile(buildProd) {
  if(buildProd) {
    console.log('compiling for: PROD...')
    const result = shell('npm run compile:prod');
    console.log(result.toString());
  }
  else {
    console.log('compiling for: DEV...')
    const result = shell('npm run compile:dev');
    console.log(result.toString());
  }
}

function copyFiles() {

}

function hasArg(args, arg) {
  return args.indexOf(arg) > -1;
}













main();