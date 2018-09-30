const marked = require('marked');
const fs = require('fs-extra');
const remark = require('remark')();
const yfm = require('yaml-front-matter');
const PrismAngular = require('./utils/angular-language-marked');
const Prism = require('node-prismjs');

const mdFile = fs.readFileSync('basicTest.md');
const content = yfm.loadFront(mdFile).__content;

let htmlContent = '';
const mdObject = remark.parse(content);
mdObject.children.forEach(mdChild => {
  htmlContent += marked(remark.stringify(mdChild));
});

const rawCode = String(fs.readFileSync('basicTest.ts'));
const highlightCode = PrismAngular.highlight(rawCode, Prism.languages['angular']);
htmlContent += `<pre class="language-angular"><code class="language-angular">${highlightCode}</code></pre>`;

let templateHtml = String(fs.readFileSync('template.html'));
templateHtml = templateHtml.replace(/{{content}}/g, htmlContent);
fs.writeFileSync('index.html', templateHtml);
