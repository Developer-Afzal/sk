import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Chart() {
  return (

    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'mar', 'april', 'May', 'Jun', 'Jul', 'Aug','Sept', 'Oct', 'Nov', 'Dec'] }]}
      series={[{ data: [30,40,56,78,43,32,23,20,65,34,56,15] }]}
      height={280}
    />
  );
}