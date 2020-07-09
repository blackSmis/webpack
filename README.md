### npm 安装命令

```bash
npm install moduleName # 安装模块到项目目录下 
npm install -g moduleName # -g 的意思是将模块安装到全局，具体安装到磁盘哪个位置，要看 npm config prefix 的位置。
npm install --save moduleName # -save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。 等于-S
npm install --save-dev moduleName #-save-dev的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。等于-D
```

### 初始化 

安装webpack webpack-cli

```bash
npm init -y //-y 为yes的意思 生成默认的package.json
```

```bash
npm install webpack webpack-cli --save-dev    //自动生成node_modules文件
```

<!-- more -->

新建src文件夹，在文件夹下新建index.js为入口文件


![](https://gitee.com/zleduc/img/raw/master/Img/20200612193612.png)

在package.json同级目录下新建配置文件 webpack.config.js

![](https://gitee.com/zleduc/img/raw/master/Img/20200612193005.png)

在webpack.config.js中进行配置入口，出口，模式

```node.js
//node写法
var path = require('path');
module.exports = {
    mode: 'development',    //模式 development production
    entry: './src/index.js', //入口文件
    output: {
        filename: 'bundle.js',    //打包后的文件名
        path: path.resolve(__dirname, 'dist') //打包位置
    }
}
```

打包代码

```
npx webpack
```

修改配置文件夹和运行命令

```node.js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build":"webpack  --config webpack.config.js"    //webpack.config.js为配置文件名
 },

//打包代码
npm run build
```

### 开发模式配置

#### 加载css文件

安装style-loader和css-loader组件


```bash
npm i  style-loader css-loader --save-dev
```

新建index.css文件，并在入口文件index.js文件中引入


```
require('./index.css')
```

在配置文件webpack.config.js中添加模块


```
module:{    //模块
    rules:[    //规则
        {test:/\.css$/,use:['style-loader','css-loader']}
    ]
}
```

#### 加载less文件

安装less 和 less-loader组件

```bash
npm i less less-loader -D
```

```javascript
//新建index.less文件，并在入口文件index.js文件中引入
require('./index.less')

//在配置文件webpack.config.js中添加模块
module:{    //模块
    rules:[    //规则
        {test:/\.css$/,use:['style-loader','css-loader']},
        {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
    ]
}
```

#### 生成入口文件

HtmlWebpackPlugin：可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口

```js
npx html-webpack-plugin  //同时也需要全局安装
npm i html-webpack-plugin --save-dev

在webpack.config.js中引入
//node写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');       
module.exports = {
    devServer: { //开发服务器的配置
        port: 3000,              //端口
        progress: true,          //进度条
        contentBase: './dist',   //位置
        open: true,              //自动打开
        compress: true,          //压缩
    },
    mode: 'development',    //模式 development production
    entry: './src/index.js', //入口文件
    output: {
        filename: 'bundle.js',    //打包后的文件名
        path: path.resolve(__dirname, 'dist') //打包位置
    },
    plugins:[    //数组 放着所有webpack插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        })
    ]
}
```

#### es6->es5 转换

**安装命令**

```bash
npm i @babel/core babel-loader@babel/preset-env -D
npm install -D @babel/plugin-transform-runtime
npm install -S @babel/runtime
```

**配置**


```
module: {    //模块
    rules: [    //规则
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins:[
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-transform-runtime'
                    ]
                }
            },
            exclude:/node_modules/
        },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
    ]
}
```

#### 安装eslint    

eslint 用于可组装的JavaScript和JSX检查工具

```bash
npm i eslint eslint-loader
```

配置，可到eslint官网下载配置文件		.eslintrc.json


```
{
    test: /\.js$/,
    use: {
        loader: 'eslint-loader',
        options:{
            enforce: 'pre'
        }
    }
},
```

#### 加载图片

**安装命令**

```bash
npm i file-loader url-loader -D      //js中与css中插入
npm i html-withimg-loader html-loader -D    //html中插入图片标签
```

**配置**

```js
{
    // 处理图片资源
    test: /\.(jpg|png|gif|bmp|jpeg)$/, 
    use: {  //配置处理 图片路径 
        loader: 'url-loader',
        options: {
            // 关闭es6模块化
            seModule: false,
            limit: 8 * 1024,
            name: '[hash:10].[ext]'
        }
    }
},
{
	//处理html中的图片资源
    test: /\.html$/,
    loader: 'html-loader'
}
```

#### 加载字体

```js
{
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [
    	'file-loader'
    ]
}
```

```css
@font-face {
   font-family: 'MyFont';
   src:  url('./my-font.woff2') format('woff2'),
         url('./my-font.woff') format('woff');
   font-weight: 600;
   font-style: normal;
}
```

#### 加载数据

要导入 CSV、TSV 和 XML，可以使用 [csv-loader](https://github.com/theplatapi/csv-loader) 和 [xml-loader](https://github.com/gisikw/xml-loader)

```bash
npm install --save-dev csv-loader xml-loader
```

```js
{
  test: /\.(csv|tsv)$/,
  use: [
    'csv-loader'
  ]
},
{
  test: /\.xml$/,
  use: [
    'xml-loader'
  ]
}
```

#### webpack-dev-server（实时重新加载）

**webpack-dev-server**：提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

```node,js
npx webpack-dev-server    //npx安装可避免全局安装
npm install webpack-dev-server -D //webpack-dev-server运行 需要本地和全局都安装
```

**webpack.config.js**

```javascript
// node写法
var path = require('path');
module.exports = {
    devServer:{ //开发服务器的配置
        port:3000,              //端口
        progress:true,          //进度条
        contentBase:'./dist',   //位置
        compress:true,          //压缩
    },
    mode: 'development',    //模式 development production
    entry: './src/index.js', //入口文件
    output: {
        filename: 'bundle.js',    //打包后的文件名
        path: path.resolve(__dirname, 'dist') //打包位置
    }
}
```

**配置运行**

```
"build": "webpack  --config webpack.config.js",
"dev": "webpack-dev-server"
```

运行`npm start`命令，浏览器便会自动加载页面（localhost:3000），现在修改或保存任意源文件，web服务器便会自动加载编译新的文件。

**特点**：只会在内存中打包，不会有任何的输出。

### 生产环境配置

#### 提取css文件

**mini-css-extract-plugin**：将js中导入的css文件提取出来，成为单独的css文件

**安装**

```bash
npm i mini-css-extract-plugin -D
```

**webpack.config.js**

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 'style-loader',
                    // 这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/bundle.css'
        })
    ]
}
```

#### css兼容性处理

**安装命令**

```bash
npm i postcss-loader postcss-preset-env -D
```

**webpack.config.js**

```js
// 设置nodejs环境变量,默认为production
process.env.NODE_ENV = 'development'
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    /*
                        css兼容性处理：postcss --> postcss-loader postcss-preset-env
                        帮postcss招到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                    */
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            }
        ]
    }
}
```

**package.json**

```json
"browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }
```

#### 压缩css处理

**安装**

```bash
npm i optimize-css-assets-webpack-plugin -D
```

**webpack.config.js**

```js
const path = require('path')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
    },
    plugins: [
        new OptimizeCssAssetsWebpackPlugin()
    ]
}
```

#### js语法检测eslint

**安装**

```bash
npm i eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import -D
```

**webpack.config.js**

```js
const path = require('path')
// process.env.NODE_ENV = 'development'
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                /*
                    语法检查：eslint-loader eslint
                        注意: 只检查自己写的源代码，第三方的库不用检查
                        设置检查规则：
                            package.json中eslintConfig中设置
                                "eslintConfig":{
                                    "extends":"airbnb-base"
                                }
                            airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
                */
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsWebpackPlugin()
    ]
}
```

**package.json**

```json
"eslintConfig": {
	"extends": "airbnb-base"
}
```

#### js兼容性处理

安装

```bash
npm i babel-loader @babel/core @babel/preset-env -D
```

webpack.config.js

```js
const path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                /*
                    js兼容性处理：babel-loader @babel/core @babel/preset-env
                        1.基本js兼容性处理 --> @babel/preset-env
                            问题：只能转换基本语法，如promise不能转换
                        2.全部js兼容性处理 --> @babel/polyfill
							js文件头部添加
								require('@babel/polyfill')
                            问题：体积太大
                        3.按需加载 --> core-js
                */
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    [
                        // 预设：指示babel做怎样的兼容性处理
                        presets: [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuilrIns: 'usage',
                                // 指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
        			]
                }
            }
        ]
    },
    plugins: [
    ]
}
```

#### js压缩

将mode改为production便会自动压缩js

#### html压缩

修改html-webpack-plugin插件配置

**webpack.config.js**

```js
plugins:[
    new HtmlWebpackPlugin({
        template:'',
        minify:{
            // 移除空格
            collapseWhitespace: true,
            // 移除注释
            removeCommits: true
        }
    })
]
```

### 优化配置

#### 生产环境优化

##### HMR热模块替换

**HMR**：hot module replace 热模块替换/模块热替换

**作用**：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）极大提升构建速度

**开启**：在devServer中添加	hot:true ，或者

​			在package.json中的script配置运行命令	"dev": "webpack-dev-server --hot"

**配置**

- 样式文件：可以使用HMR功能，因为style-loader内部实现了
- js文件：默认不使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
      注意：HMR功能对js的处理，只能处理非入口js文件的其他文件
- html文件：默认不能使用HMR功能，同时会导致问题：html不能热更新了
      解决：修改entry入口，将html文件引入

**webpack.config.js**

```js
const path = require('path')

module.exports = {
    devServer: {
        port: 3000,
        contentBase: './dist',
        compress: true,
        open: true,
        // 开启热更新
        hot: true
    },
    mode: 'development',
    // html 热更新
    entry: ['./src/index.js','./src/index.html'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    }
}
```

**index.js**

```js
if (module.hot) {
    console.log('a')
    // 一旦module 为true,说明开启了HMR功能。  -->让HMR功能代码生效
    module.hot.accept('./print.js',function(){
        // 方法会监听print.js文件的变化，一旦发生变化，其他模块不会重新打包构建。
        print();
    })
}
```

##### 追踪代码source-map

**source-map**：一种提供源代码到构建后代码映射技术 

​						（如果构建后代码出错了，通过映射可以追踪源代码错误）

**配置**：在webpack.config.js中添加如下代码

​			devtool: '\[inline-|hidden-|eval-\]\[nosources-\][cheap-[module-]]source-map'

- ​	source-map：外部
  ​      错误代码准确信息 和 源代码的错误位置
- ​    inline-source-map：内联
  ​      只生成一个内联source-map
  ​      错误代码准确信息 和 源代码的错误位置
- ​    hidden-source-map：外部
  ​      错误代码错误原因，但是没有错误位置
  ​      不能追踪源代码错误，只能提示到构建后代码的错误位置
- ​    eval-source-map：内联
  ​      每一个文件都生成对应的source-map，都在eval
  ​      错误代码准确信息 和 源代码的错误位置
- ​    nosources-source-map：外部
  ​      错误代码准确信息, 但是没有任何源代码信息
- ​    cheap-source-map：外部
  ​      错误代码准确信息 和 源代码的错误位置 
  ​      只能精确的行
- ​    cheap-module-source-map：外部
  ​      错误代码准确信息 和 源代码的错误位置 
  ​      module会将loader的source map加入

**内联 和 外部的区别**：1. 外部生成了文件，内联没有 2. 内联构建速度更快

**开发环境**：速度快，调试更友好
  速度快(eval>inline>cheap>...)
    eval-cheap-souce-map
    eval-source-map
  调试更友好  
    souce-map
    cheap-module-souce-map
    cheap-souce-map

**推荐**	eval-source-map  / eval-cheap-module-souce-map

**生产环境**：源代码要不要隐藏? 调试要不要更友好
  内联会让代码体积变大，所以在生产环境不用内联
  nosources-source-map 全部隐藏
  hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

**推荐**	source-map / cheap-module-souce-map

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // loader的配置
      ...
    ]
  },
  plugins: [
    // plugins的配置
    ...
  ],
  mode: 'development',
  devtool: 'eval-source-map'
};
```

#### 开发环境优化

##### oneOf

**oneOf**：匹配规则时，仅使用第一个匹配规则的数组。           

 			   注意：不能有两个配置处理同一种类型文件

**webpack.config.js	module**

```js
module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                // 优先执行
                enforce: 'pre',
                options: {
                    fix: true
                }
            },
            // 以下loader只会执行一个
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            ...
                        ]
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ...
                            ]
                        }
                    }
                ]
            }
        ]
    },
```

##### 缓存

  **缓存**：

- babel缓存
      cacheDirectory: true
      --> 让第二次打包构建速度更快
- 文件资源缓存
      hash: 每次wepack构建时会生成一个唯一的hash值。
                 问题: 因为js和css同时使用一个hash值。
                 如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
      chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
                 问题: js和css的hash值还是一样的
                 因为css是在js中被引入的，所以同属于一个chunk
      contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样    
                  --> 让代码上线运行缓存更好使用

**webpack.config.js**

```js
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 还需要在package.json中定义browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()]
    }
  }
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
          test: /\.css$/,
          use: [...commonCssLoader]
      },
      {
          test: /\.less$/,
          use: [...commonCssLoader, 'less-loader']
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
              presets: [
                  [
                      '@babel/preset-env',
                      {
                          useBuiltIns: 'usage',
                          corejs: { version: 3 },
                          targets: {
                              chrome: '60',
                              firefox: '50'
                          }
                      }
                  ]
              ],
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true
          }
        }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: 'production',
  devtool: 'source-map'
};
```

**server.js**

```js
/*
  服务器代码
  启动服务器指令：
    npm i nodemon -g
    nodemon server.js
    node server.js
  访问服务器地址：
    http://localhost:3000
*/
const express = require('express');

const app = express();
// express.static向外暴露静态资源
// maxAge 资源缓存的最大时间，单位ms
app.use(express.static('dist', { maxAge: 1000 * 3600 }));

app.listen(3000);
```

##### tree shaking

 **tree shaking**：去除无用代码
    **前提**：1. 必须使用ES6模块化  2. 开启production环境
    **作用**:   减少代码体积

在**package.json**中配置 
  "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）

   问题：可能会把css / @babel/polyfill （副作用）文件干掉

   解决：添加	"sideEffects": ["*.css", "*.less"]

##### 代码分离 

webpack将根据以下条件自动拆分块：

- 可以共享新块，或者模块来自`node_modules`文件夹
- 新的块将大于30kb（在min + gz之前）
- 按需加载块时并行请求的最大数量将小于或等于6
- 初始页面加载时并行请求的最大数量将小于或等于4

当试图满足最后两个条件时，最好使用较大的块。

**webpack.config.js**

```js
const { resolve } = require('path');

module.exports = {
  // 单入口
  entry: './src/js/index.js',
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
      // plugins配置
      ...
  ],
  /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production'
};

```

**index.js**

```js
function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包
*/
import(/* webpackChunkName: 'test' */'./test')
  .then(({ mul, count }) => {
    // 文件加载成功~
    // eslint-disable-next-line
    console.log(mul(2, 5));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
  });
```

##### js懒加载

- 懒加载：当文件需要使用时才加载
- 预加载 prefetch：会在使用之前，提前加载js文件 
- 正常加载可以认为是并行加载（同一时间加载多个文件） 
- 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源

**index.js**

```js
console.log('index.js被加载了')
console.log(data)
document.getElementById('btn').onclick = function () {
    import(/* webpackChunkName: 'math', webpackPrefetch: true */'./math').then(({ cube }) => {
        console.log(cube(10))
    })
}
```

##### PWA渐进式网页应用

**渐进式Web应用程序（PWA）**是可提供与本机应用程序相似的体验的Web应用程序。有很多事情可以促成这一点。在这些功能中，最重要的是使应用程序能够在**离线状态下运行**。这是通过使用称为[Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/)的网络技术来实现的。

**安装**

```bash
npm install workbox-webpack-plugin --save-dev
```

**webpack.config.js**

```js
const path = require('path')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
module.exports = {
  ...
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        1. 帮助serviceworker快速启动
        2. 删除旧的 serviceworker

        生成一个 serviceworker 配置文件~
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}
```

##### 多进程打包

开启多进程打包。 
进程启动大概为600ms，进程通信也有开销。
只有工作消耗时间比较长，才需要多进程打包

**安装**

```bash
npm i thread-loader -D
```

**webpack.config.js**

```js
  {
	test: /\.js$/,
	exclude: /node_modules/,
	use: [
	  {
		loader: 'thread-loader',
		options: {
		  workers: 2 // 进程2个
		}
	  }
	]
  },
```

##### externals

**externals**：可以实现引入一个库，但不让其被webpack打包

**webpack.config.js**

```js
externals: {
    // 拒绝jquery被打包进来
    jquery: 'jquery'
}
```

之后在html中引入cdn

##### dll分离第三方代码

**dll**：能把第三方代码完全分离开，即每次只打包项目自身的代码。

**安装**

```bash
npm i add-asset-html-webpack-plugin -D
```

在webpack.config.js同级目录新建一个webpack.dll.config.js

**webpack.config.js**

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dll/manifest.json')
    }),
    // 将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, 'dll/jquery.js')
    })
  ],
  mode: 'production'
};
```

**webpack.dll.config.js**

```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dll'),
    library: '[name]_[hash]' // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个 manifest.json --> 提供和jquery映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: path.resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
};
```

**运行命令**

```bash
webpack --config webpack.dll.config.js
```

