const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const tsconfig = require('./tsconfig.json');

const absPath = p => path.join(__dirname, p);
const { paths: aliasPaths = {} } = tsconfig.compilerOptions;
const formatPath = str => str.replace(/\/\*/g, '');

const alias = Object.entries(aliasPaths).reduce((pre, [key, value]) => ({ ...pre, [formatPath(key)]: absPath(formatPath(value[0])) })
    , {});

const { mode = 'production' } = process.env;
const isDevelopment = mode === 'development';

const config = {
    mode,
    entry: {
        main: './src/client/index.tsx'
    },
    target: 'web',
    devServer: {
        host: "0.0.0.0", // 开发服务器监听的主机地址
        compress: true, // 开发服务器是否启动gzip等压缩
        static: path.join(__dirname, "dist"),
        port: 9000,
        // disableHostCheck: true,
        hot: true,
        historyApiFallback: true,
        headers: { "Access-Control-Allow-Origin": "*" },
        client: {
            overlay: true,
        },
    },
    output: {
        filename: '[name].js',
        path: absPath('dist')
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            "presets": [["@babel/preset-env", {
                                // false: 不对当前的JS处理做 polyfill 的填充
                                // usage: 依据用户源代码当中所使用到的新语法进行填充
                                // entry: 依据我们当前筛选出来的浏览器决定填充什么
                                "useBuiltIns": "entry",
                                "corejs": 3
                            }], "@babel/preset-typescript", "@babel/preset-react"],
                            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                type: 'asset',
                generator: {
                    filename: "img/[name].[hash:4][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 30 * 1024
                    }
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name].[hash:3][ext]'
                }
            }
        ]
    },
    resolve: {
        mainFiles: ['index'],
        extensions: [".ts", ".tsx", '.js', '.json'],
        alias: {
            ...alias
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'html-webpack-plugin',
            template: './public/index.html',
            chunks: ["main"],
            // 是否将生成的静态资源插入模板中
            inject: true,
        }),
        new DefinePlugin({
            BASE_URL: '"./"'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public/**/*',
                    globOptions: {
                        ignore: ['index.html']
                    }
                }
            ]
        }),
        isDevelopment && new ReactRefreshWebpackPlugin()
    ].filter(Boolean)
}

module.exports = config;
