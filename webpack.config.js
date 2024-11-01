const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: "development",

    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true, // clearing old bundles and keeping only the latest build
        assetModuleFilename: '[name][ext]', // ext to NOT rename the asset files
    },

    devtool: 'source-map', // helps with debugging by showing line numbers of the src code

    resolve: {
        extensions: ['.js', '.jsx'], 
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true, // npm run dev -> opens the browswer automatically
        hot: true, // webpack reloads the app automatically when any of the files are updated
        compress: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Tic Tac Toe',
            filename: 'index.html',
            template: 'src/template.html',
        }),
        new BundleAnalyzerPlugin(),
    ],
};