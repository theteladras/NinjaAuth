const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
	entry: './src/view.ts',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.mustache$/,
				loader: 'raw-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
		}),
	],
	devServer: {
		port: 9000,
		hot: false,
	},
};
