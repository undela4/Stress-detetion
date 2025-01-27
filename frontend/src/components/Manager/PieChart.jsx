import { useState } from 'react';
import { AgCharts } from 'ag-charts-react'; 
export function PieChart({ data }) {
  const aggregatedCounts = {};

  data.forEach(entry => {
    const emotionCounts = entry.StressDetails.emotion_counts;

    Object.entries(emotionCounts).forEach(([emotion, count]) => {
      if (aggregatedCounts[emotion]) {
        aggregatedCounts[emotion] += count; 
      } else {
        aggregatedCounts[emotion] = count; 
      }
    });
  });

  const pieData = Object.entries(aggregatedCounts).map(([emotion, count]) => ({
    emotion,
    count,
  }));



const chartOptions = {
    title: {
      text: 'Aggregated Emotion Distribution',
    },
    data: pieData,
    series: [
      {

        type: 'pie',
        angleKey: 'count',
        calloutLabelKey: 'emotion', 
        sectorLabelKey:'count',
        tooltip: {
          enabled: true,
          renderer: ({ datum }) => {
            const total = pieData.reduce((sum, current) => sum + current.count, 0);
            const percentage = ((datum.count / total) * 100).toFixed(2);
            return {
              content: `${datum.emotion}: ${datum.count} (${percentage}%)`,
            };
          },
        },
      },
    ],
    legend: {

      enabled: true,
      position: 'right',

    },
  };
  
  

  return (
    <>
      <AgCharts options={chartOptions} />
    </>
  );
}
