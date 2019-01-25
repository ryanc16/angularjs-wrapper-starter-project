const fs = require('fs');
const path = require('path');

function main() {
  writeTemplates();
}
function writeTemplates() {
  const files = findFilesInDir(path.normalize(__dirname+'/app/'), 'html') || [];
  let map = {};
  for(let i=0; i<files.length; i++) {
    const file = files[i];
    let data = fs.readFileSync(file);
    if(data) {
      let key = path.basename(file.replace(path.normalize(__dirname), '.').replace(/\\/g, '/'));
      map[key] = data.toString();
    }
    let dataout = 'export const Templates = ' + JSON.stringify(map);
    fs.writeFileSync(path.normalize(__dirname+'/app/templates.ts'), dataout , {encoding: 'utf-8'});
  }
}

function findFilesInDir(startPath,filter){
  let results = [];
  if (!fs.existsSync(startPath)){
      return;
  }
  let files=fs.readdirSync(startPath) || [];
  for(let i=0;i<files.length;i++){
      let filename=path.join(startPath,files[i]);
      let stat = fs.lstatSync(filename);

      if (stat.isDirectory()){
          results = results.concat(findFilesInDir(filename,filter)); //recurse
      }
      else {
        let ext = filename.slice(filename.lastIndexOf('.'));
        let lessext = filename.slice(0,filename.lastIndexOf('.'));
        if(ext.match(new RegExp(`\.${filter}`, 'ig')) && fs.existsSync(lessext+'.js')) {
          results.push(filename);
        }
      }
  }
  return results;
}
main();