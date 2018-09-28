const yamlFront = require('yaml-front-matter');
const fs = require('fs');
const remark = require('remark')();

fs.readFile('remark.md', 'utf8', (err,file) => {
  if(err){
    throw error(err);
  }
  const content = yamlFront.loadFront(file).__content;
  // console.log(yamlFront.loadFront(file));
  const html = remark.parse(content);
  // const html = remark.stringify(content);
  console.log(JSON.stringify(html));
});