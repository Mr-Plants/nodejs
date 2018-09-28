const marked = require('./utils/marked');
const fs = require('fs');
const remark = require('remark')();

fs.readFile('mdtest.md', (err, file) => {
  if (err) {
    throw error(err);
  }
  let htmlContent = '';
  const mdObject = remark.parse(file);
  mdObject.children.forEach(mdChild => {
    htmlContent += marked(remark.stringify(mdChild));
  });
  // console.log(JSON.stringify(html));
  console.log(htmlContent);
});