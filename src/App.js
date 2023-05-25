import React, { useState, useEffect }  from "react";
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

function App() {    

  useEffect(() => {
    fetchSamplings();        
  }, [])

  const [chartData, setChartData] = useState({
    datasets: [] // Instantiates dataset to empty so that chart will be able to execute map() function.
  });

  const fetchSamplings = async () => {
    try {
      const res = await fetch("http://ec2-3-1-102-218.ap-southeast-1.compute.amazonaws.com:8181/benchease/v1/hotskills")
      const data = await res.json();

      updateChartData(data.result);
    } catch (e) {
      console.error(e);
    }

    
  }

  const updateChartData = (skills) => {
    setChartData({
      labels: skills.map((skill) => skill.title),
      datasets: [
        {
          label: "Skill Search Count",
          backgroundColor: "rgb(254, 114, 93)",
          borderColor: "rgb(254, 114, 93)",
          data: skills.map((skill) => skill.searchCount)                    
        }
      ]
    });
  }

  return(
    <div>
      <Bar data={chartData} />
    </div>
  )

}

export default App;
