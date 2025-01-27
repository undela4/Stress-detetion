import React, { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { time } from "ag-charts-community";
export const BarChart = ({data}) => {
  
  const [options, setOptions] = useState({
    title: {
      text: "Stress levels",
    },
    subtitle: {
      text: "In Billion U.S. Dollars",
    },
    data:data,
    series: [
      {
        type: "bar",
        xKey: "timestamp",
        yKey: "stressLevel",
        yName: "Stress in persntage %",
      }
    ],
    axes: [
        {
          type: 'time', // for time-based x-axis
          position: 'bottom',
          title: {
            text: 'Time',
          },
          label: {
            format: '%H:%M', // format for hours and minutes
          },
          nice: true, // allows proper scaling of time axis
          min: new Date('2024-10-07T9:00:00').getTime(), // start time (9 AM)
          max: new Date('2024-10-07T18:00:00').getTime(), // end time (6 PM)
          interval: { step: time.minute.every(30) },
         
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Stress Level (%)',
          },
          min:0, 
          max: 100,
          interval: { step:20}, 
        },
      ],
  });


  return <AgCharts options={options} />;


};
