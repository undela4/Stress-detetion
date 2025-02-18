import React, {useEffect, useState } from 'react';

import { AgCharts } from 'ag-charts-react';
import { time } from "ag-charts-community";

export function Chart({ options }) {

  const [chartOptions, setChartOptions] = useState();
  console.log(options)

 useEffect(()=>{
  setChartOptions({
    
    title: {
      text: 'Stress Levels Throughout the Day',
    },
    tooltip: {
      enabled: true,
    },
    data: options,

    series: [
      {
        type: 'line',
        xKey: 'Time',
        yKey: 'StressDetails.final_stress_percentage',
        stroke: '#ff4d4d', 
        
        marker: {
          enabled:true,
          size: 5,
          strokeWidth:3,
          fill: '#ff4d4d',
        },
        
      },
    ],
    axes: [
      {
        type: 'category', // for time-based x-axis
        position: 'bottom',
        title: {
          text: 'Time',
        },
        label: {
          format: '%H:%M', 
          autoRotate:true,

        },
        nice: false, // allows proper scaling of time axis
        min: new Date('2024-10-07T9:00:00').getTime(), // start time (9 AM)
        max: new Date().getTime(), // end time (6 PM)
        interval: { step: time.minute.every(30) }
       
      },
      {
        type: 'number',
        position: 'left',
        title: {  
          text: 'Stress_Level in %',
        },
        min:0, 
        max: 100,
        interval: {step:20}, 

      },

    ],
  });

 },[options])

  
 
  return (
  <>
 <AgCharts options={chartOptions} />
 
 </>
 );
}