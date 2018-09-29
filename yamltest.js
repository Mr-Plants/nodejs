const yamlFront = require('yaml-front-matter');
const fs = require('fs');
const remark = require('remark')();

fs.readFile('remark.md', 'utf8', (err, file) => {
  if (err) {
    throw error(err);
  }
  const content = yamlFront.loadFront(file).__content;
  // console.log(yamlFront.loadFront(file));
  const html = remark.parse(content);
  // const html = remark.stringify(content);
  console.log(JSON.stringify(html));
});

const result = {
  name: 'button',
  docZh: '以api为分割点分开成两部分的文档主体',
  docEn: '以api为分割点分开成两部分的文档主体English',
  demoMap: {
    basic: {
      meta: 'md文件yaml信息',
      zh: 'md文件转换的angularNonBindAble的html节点',
      en: 'md文件转换的angularNonBindAble的html节点english',
      enCode: '替换完变量的code组件html模版',
      zhCode: '替换完变量的code组件html模版',
      ts: 'string处理过的示例代码'
    },
    block: {
      meta: 'md文件yaml信息',
      zh: 'md文件转换的angularNonBindAble的html节点',
      en: 'md文件转换的angularNonBindAble的html节点english',
      enCode: '替换完变量的code组件html模版',
      zhCode: '替换完变量的code组件html模版',
      ts: 'string处理过的示例代码'
    }
  }
}