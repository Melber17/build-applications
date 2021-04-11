module.exports = {
	mode: "development",
	module: {
		rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'babel-loader'}
                ]
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
		],
	},
};
