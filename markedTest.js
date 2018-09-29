const marked = require('./utils/marked');
const fs = require('fs-extra');
const remark = require('remark')();

const mdFile = fs.readFileSync('mdtest.md');
let htmlContent = '';
const mdObject = remark.parse(mdFile);
mdObject.children.forEach(mdChild => {
  htmlContent += marked(remark.stringify(mdChild));
});

let templateHtml = String(fs.readFileSync('template.html'));
templateHtml = templateHtml.replace(/{{content}}/g, htmlContent);
fs.writeFileSync('index.html', templateHtml);
