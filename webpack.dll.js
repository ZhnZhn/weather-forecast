'use strict';

const path = require('path')
    , webpack = require('webpack')
    , WriteDllStatsPlugin = require('./plugins/write-dll-stats-plugin')
    , TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
     lib: [
            "react", "react-dom",
            "redux", "react-redux", "redux-saga",

            "recharts/es6/cartesian/CartesianGrid",
            "recharts/es6/cartesian/Bar",
            "recharts/es6/cartesian/Line",
            "recharts/es6/cartesian/YAxis",
            "recharts/es6/cartesian/XAxis",
            "recharts/es6/component/ResponsiveContainer",
            "recharts/es6/component/Tooltip",
            "recharts/es6/component/Legend",
            "recharts/es6/chart/ComposedChart",
            "recharts/es6/chart/LineChart",

            "dompurify", "interactjs"
          ]
  },
  output: {
      path: path.resolve('app'),
      filename: "[name]_[chunkhash].js",
      library: '[name]_vendor'
  },
  resolve: {
    modules: ['local_modules','node_modules']
  },
  plugins: [

    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_vendor'
    }),
    new WriteDllStatsPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
