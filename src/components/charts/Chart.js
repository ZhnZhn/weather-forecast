
/*
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid"
import Bar from "recharts/lib/cartesian/Bar"
import Line from "recharts/lib/cartesian/Line"
import YAxis from "recharts/lib/cartesian/YAxis"
import XAxis from "recharts/lib/cartesian/XAxis"

import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'

import ComposedChart from "recharts/lib/chart/ComposedChart";
import LineChart from "recharts/lib/chart/LineChart";
*/

//import {
  //CartesianGrid,
  //Bar,
  //Line,
  //YAxis,
  //XAxis,
  //ResponsiveContainer,
  //Tooltip,
  //Legend,
  //ComposedChart,
  //LineChart
//} from "recharts";



const {
  CartesianGrid:_CartesianGrid,
  Bar:_Bar, Line:_Line,
  YAxis:_YAxis, XAxis: _XAxis,
  ResponsiveContainer:_ResponsiveContainer,
  Tooltip:_Tooltip,
  Legend:_Legend,
  ComposedChart:_ComposedChart,
  LineChart:_LineChart
} = window.Recharts || {};

/*
const Chart = {
  CartesianGrid: CartesianGrid || _CartesianGrid,
  Bar: Bar || _Bar,
  Line: Line || _Line,
  YAxis: YAxis || _YAxis,
  XAxis: XAxis || _XAxis,

  ResponsiveContainer: ResponsiveContainer || _ResponsiveContainer,
  Tooltip: Tooltip || _Tooltip,
  Legend: Legend || _Legend,

  ComposedChart: ComposedChart || _ComposedChart,
  LineChart: LineChart || _LineChart
};
*/


const Chart = {
  CartesianGrid: _CartesianGrid ,
  Bar: _Bar,
  Line: _Line,
  YAxis: _YAxis ,
  XAxis: _XAxis ,

  ResponsiveContainer: _ResponsiveContainer ,
  Tooltip: _Tooltip ,
  Legend: _Legend ,

  ComposedChart: _ComposedChart ,
  LineChart: _LineChart
};



export default Chart
