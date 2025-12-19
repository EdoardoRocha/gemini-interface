import path, { dirname } from "path";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import HtmlMinifierTerser from 'html-minifier-terser';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    mode: 'production',
    entry: './src/index.js',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].js',
        clean: false,
        assetModuleFilename: 'assets/imgs/[name][ext]'
    },
    devServer: {
        static: './dist',
        port: 8080,
        open: true,
        hot: true,
        watchFiles: ['src/**/*'],
        liveReload: true
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),

        new MiniCssExtractPlugin({
            filename: 'assets/css/style.[contenthash].css'
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: './src/paginas',
                    to: 'paginas',
                    transform(content) {
                        return HtmlMinifierTerser.minify(content.toString(), {
                            collapseWhitespace: true,
                            removeComments: true
                        });
                    },
                },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({}),
            new CssMinimizerPlugin({})
        ]
    }
}