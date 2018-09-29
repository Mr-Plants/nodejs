const marked = require('marked');
const renderer = new marked.Renderer();
const Prism = require('node-prismjs');
const PrismAngular = require('./angular-language-marked');

marked.setOptions({
  highlight: function (code) {
    return PrismAngular.highlight(code, Prism.languages['angular']);
  },
  renderer: renderer
});

module.exports = marked;
