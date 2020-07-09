import './css/index.css'
import './css/index.scss'
import './font/iconfont.css'
import $ from 'jquery'
console.log($)
console.log('index.js被加载了')
document.getElementById('btn').onclick = function () {
  // 懒加载：当文件需要使用时才加载~
  // 预加载 prefetch：会在使用之前，提前加载js文件 
  // 正常加载可以认为是并行加载（同一时间加载多个文件）  
  // 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  import(/* webpackChunkName: 'math', webpackPrefetch: true */'./math').then(({ cube }) => {
    console.log(cube(10))
  })
}
/*
  1. eslint不认识 window、navigator全局变量
    解决：需要修改package.json中eslintConfig配置
      "env": {
        "browser": true // 支持浏览器端全局变量
      }
   2. sw代码必须运行在服务器上
      --> nodejs
      -->
        npm i serve -g
        serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
*/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
// if (module.hot) {
//     // 一旦module 为true,说明开启了HMR功能。  -->让HMR功能代码生效
//     module.hot.accept('./print.js', function () {
//         // 方法会监听print.js文件的变化，一旦发生变化，其他模块不会重新打包构建。
//         console.log(cube(10));
//     })
// }