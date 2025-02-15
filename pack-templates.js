const fs = require('fs');
const path = require('path');

function main() {
  writeTemplates();
}
function writeTemplates() {
  const files = findFilesInDir(path.normalize(__dirname+'/src/app/'), '.html') || [];
  let map = {};
  for(const file of files) {
    const data = fs.readFileSync(file);
    if(data) {
      let key = path.basename(file);
      map[key] = data.toString();
    }
  }
  let dataout = `export const Templates = ${JSON.stringify(map)};`;
  fs.writeFileSync(path.normalize(__dirname+'/src/app/templates.ts'), dataout , {encoding: 'utf-8'});
}

function findFilesInDir(startPath,filter){
  let results = [];
  if (!fs.existsSync(startPath)){
      return;
  }
  const files = fs.readdirSync(startPath) || [];
  for(const file of files){
      const filepath = path.join(startPath,file);
      const stats = fs.lstatSync(filepath);

      if (stats.isDirectory()){
          results = results.concat(findFilesInDir(filepath,filter)); //recurse
      }
      else {
        const filename = path.parse(filepath);
        const ext = filename.ext;
        const basefile = filename.name;
        if(ext.match(filter) &&
          fs.existsSync(path.normalize(path.join(startPath,basefile)+'.ts'))) {
          results.push(filepath);
        }
      }
  }
  return results;
}
main();