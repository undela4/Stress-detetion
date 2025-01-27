import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../App.css';
import { Chart } from './LineChart';
import Filter from './Filter';
import { PieChart } from './PieChart';

const Dashboard = () => {

  const [stressData, setStressData] = useState(null);
  const [s1, set1] = useState();


  useEffect(() => {
    fetchStressData();
  }, []);

  const fetchStressData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/V1/getdata/1');
      if(response.data.status){
          setStressData(response.data.data);
          set1(response.data.data)
          
      }
    } catch (error) {
      console.error('Error fetching stress data:', error);
    }
  };
  

  return stressData&&(
    
    <div className="dashboard">
      <h1 className='text-center'>HR Dashboard: Employee Stress Levels</h1>
      <div className=" d-flex justify-content-between">
        <h3>Employee_id:   {1}</h3>
        <Filter orginal={s1} stressData={stressData} setStressData={setStressData} />
      </div>

      <Chart options={stressData} />
      <div className="w-50">
      <PieChart data={stressData} />
      </div>      



    </div>
  );
};

export default Dashboard;






