const yamlFront = require('yaml-front-matter');
const fs = require('fs');
const remark = require('remark')();

const input = [
  '---\npost: title one\n',
  'anArray:\n - one\n - two\n',
  'subObject:\n prop1: cool\n prop2: two',
  '\nreg: !!js/regexp /pattern/gim',
  '\nfun: !!js/function function() {  }\n---\n',
  'content\nmore'
].join('');


// const results = yamlFront.loadFront(input);
// console.log(results);

fs.readFile('remark.md', 'utf8', (err,file) => {
  if(err){
    throw error(err);
  }
  const content = yamlFront.loadFront(file).__content;
  // console.log(yamlFront.loadFront(file));
  const html = remark.parse(content);
  console.log(html);
});