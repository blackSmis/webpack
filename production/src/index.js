// 处理js所有兼容问题
// require('@babel/polyfill')
require('./css/a.css');

require('./css/b.css');

const add = function add(a, b) {
  return a + b;
};

console.log(add(6, 6));
