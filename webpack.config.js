const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (env = {}) => {
	const { mode = "development" } = env;
	const isProd = mode === "production";
	const isDev = mode === "development";

	const getStyleLoaders = () => {
		return [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"];
	};
	const getPlugins = () => {
		const plugins = [
			new HtmlWebpackPlugin({
				title: "Build",
				buildTime: new Date().toISOString(),
				template: "public/index.html",
			}),
		];

		if (isProd) {
			plugins.push(new MiniCssExtractPlugin({
				filename: 'main-[hash:8].css'
			}))
		}
	}
	return {
		mode: isProd ? "production" : isDev && "development",
		output: {
			filename: isProd ? 'main-[hash:8].js' : undefined
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [{ loader: "babel-loader" }],
				},
				{
					test: /\.(png|jpg|jpeg|gif|ico)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								outputPath: "img",
								name: "[name]-[sha1:hash:7].[ext]",
							},
						},
					],
				},
				{
					test: /\.(ttf|otf|woff|woff2)$/,
					use: [
						{
							loader: "file-loader",
							options: {
								outputPath: "fonts",
								name: "[name].[ext]",
							},
						},
					],
				},
				{
					test: /\.(css)$/,
					use: getStyleLoaders(),
				},
				{
					test: /\.(s[ca]ss)$/,
					use: [
						...getStyleLoaders(),
						{ loader: "sass-loader" },
					],
				},
			],
		},
		plugins: getPlugins(),
		devServer: {
			open: true,
		},
	};
};
