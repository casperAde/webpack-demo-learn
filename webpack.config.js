const path = require('path') // node.js 的路径模块
const miniSVGDataURI = require("mini-svg-data-uri"); // 最小化svg
module.exports = {
	mode: 'development', // 'development' | 'production'
	// entry: './src/index.js', // 入口文件（简写形式）
	entry: {
		main: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'), // 打包后的路径
		filename: 'bundle.js', // 打包后的文件名
       // 静态文件打包后的路径及文件名（默认是走全局的，如果有独立的设置就按照自己独立的设置来。）
       assetModuleFilename: "assets/[name]_[hash][ext]",
	},
	// *** 模块选项中匹配的文件会通过 loaders 来转换！
	module: {
		rules: [
			// 图片文件
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: 'asset', // 一般会转换为 "asset/resource"
        generator: {
          filename: "images/[name]_[hash][ext]", // 独立的配置
        },
      },
			// 字体文件
			{
				test: /\.(otf|eot|woff2?|ttf|svg)$/i,
				type: 'asset', // 一般会转换为 "asset/inline"
        generator: {
          filename: "fonts/[name]_[hash][ext]",
        },
      },
			// 数据文件
			{
				test: /\.(txt|xml)$/i,
				type: 'asset/source', // 一般会转换成 "asset/source"
			},
      // svg文件
      {
        test: /\.svg$/i,
        type: "asset",
        generator: {
          dataUrl(content) {
            content = content.toString();
            return miniSVGDataURI(content);
          },
        },
      },
		],
	},
}
