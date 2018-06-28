let path = require('path');

module.exports = () => {
    return {
        entry: {
            index: path.resolve(__dirname, 'src/index.js')
        },
        output: {
            path: path.resolve(__dirname, 'build/assets/js/[hash]/'),
            publicPath: "http://localhost.xheldon.com/assets/[hash]/",
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }
                    ]
                }
            ]
        }
    }
}