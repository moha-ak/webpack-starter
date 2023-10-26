/**@type {import('webpack').configuration */

const HtmlWebPackPlugin     = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const CssMinimizerPlugin    = require('css-minimizer-webpack-plugin')
const path                  = require('path');
// const TerserPlugin          = require("terser-webpack-plugin");

module.exports = {

    mode: 'production',//development o production
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        //   new TerserPlugin(),
        ],
        // minimize: true,
      
      },
    output:{
        filename : 'main.[contenthash].js' 
    },
    module: {
        rules:[
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test: /\.s?css$/i,
                exclude: /styles\.css$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                  
                ],
                
            },
            {
                test: /styles\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },//fin css
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    
                    minimize: {
                        caseSensitive: true,
                        conservativeCollapse: true,
                        keepClosingSlash: true,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: false,
                        collapseWhitespace: false,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                      },
                },
                
            },//fin html
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                    generator: {
                    filename: "img/[hash][ext][query]",
                    },
            
            },


        ]//fin rules
    },//fin module

    plugins:[
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false,
        }),
  
        
            
               

    ]



 



}