const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 设置nodejs环境变量,默认为production
// process.env.NODE_ENV = 'development'
module.exports = {
    mode: 'production',
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
                // 优先执行
                enforce: 'pre',
                options: {
                    // 自动修复
                    fix: true
                }
            },
            // 一下loader只会执行一个
            // 注意：不能有两个配置处理同一种类型文件
            {
                oneOf: [

                    {
                        test: /\.css$/,
                        use: [
                            // 'style-loader',
                            // 这个loader取代style-loader。作用：提取js中的css成单独文件
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
                    },
                    {
                        /*
                            js兼容性处理：babel-loader @babel/core @babel/preset-env
                                1.基本js兼容性处理 --> @babel/preset-env
                                    问题：只能转换基本语法，如promise不能转换
                                2.全部js兼容性处理 --> @babel/polyfill
                                    问题：体积太大
                                3.按需加载 --> core-js
                        */
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            // 预设：指示babel做怎样的兼容性处理
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // 按需加载
                                        useBuiltIns: 'usage',
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/bundle.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ]
}