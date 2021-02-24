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

            "recharts/lib/cartesian/CartesianGrid",
            "recharts/lib/cartesian/Bar",
            "recharts/lib/cartesian/Line",
            "recharts/lib/cartesian/YAxis",
            "recharts/lib/cartesian/XAxis",
            "recharts/lib/component/ResponsiveContainer",
            "recharts/lib/component/Tooltip",
            "recharts/lib/component/Legend",
            "recharts/lib/chart/ComposedChart",
            "recharts/lib/chart/LineChart",

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
