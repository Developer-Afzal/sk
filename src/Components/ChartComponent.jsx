import * as React from 'react';
import { Chart } from "react-google-charts";

export default function ChartComponent() {
  const data = [
    ["Student Attendance Status", "IX", "X", "XI", "XII"],
    ["Jan", 56, 50, 20,45],
    ["Dec", 70, 60, 25,54],
    ["Nov", 60, 120, 80, 54],
    ["Oct", 30, 54, 35, 54],
  ];

  // const options = {
  //   chart: {
  //     title: "Student Performance",
  //     subtitle: "Sales, Expenses, and Profit: 2014-2017",
  //   },
  // };
  

  return (
    <>
    <Chart
      chartType="Bar"
      width="100%"
      height="300px"
      data={data}
    />
    </>
    // <BarChart
    //   xAxis={[{ scaleType:'band', data: ['Jan', 'Feb', 'mar', 'april', 'May', 'Jun', 'Jul', 'Aug','Sept', 'Oct', 'Nov', 'Dec'] }]}
    //   series={[{ data: [30,40,56,78,43,32,23,20,65,34,56,15] }]}
    //   height={280}
    // />
  );
}