import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import {Chart,registerables } from "chart.js"

Chart.register(...registerables);

const MakeChart = ({sparkline}) => {
  // console.log(sparkline)
  const [chart, setChart] = useState(null);

  const [colorChart,setColorChart]=useState("red")


  useEffect(()=>{
    const sparklineData = sparkline.sparkline_in_7d.price;
          
const priceChangePerHour= sparkline.price_change_percentage_24h
console.log(priceChangePerHour)

if(priceChangePerHour>0){
  setColorChart("blue")
}
else{
  setColorChart("red")

}

    const labels = [];
    for (let i = 0; i < sparklineData.length; i++) {
      labels.push(i);
    }
    const chartData = {
      labels: labels,
      datasets: [
          {
              label: 'Price',
              data: sparklineData,
              borderColor: colorChart,
              borderWidth: 1,
          },
      ],
  };
  setChart(chartData)
  },[sparkline,colorChart])
    
      
      // const chartData = {
      //   labels: labels,
      //   datasets: [
      //     {
      //       label: 'Price',
      //       data: sparklineData,
      //       borderColor: 'blue',
      //       borderWidth: 1,
      //     }
      //   ]
      // };
  return (
    <div>

    {
      chart && <Line data={chart} />
    }
    </div>
  )
}

export default MakeChart