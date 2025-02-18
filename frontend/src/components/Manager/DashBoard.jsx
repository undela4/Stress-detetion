import React, { useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import '../../App.css';
import { Chart } from './LineChart';
import Filter from './Filter';
import { PieChart } from './PieChart';
import { UserContext } from '../../usecontext';
import cookies from 'js-cookies';
import Navbar from '../Navbar/Navbar';
const Dashboard = () => {

  const [stressData, setStressData] = useState(null);
  const [s1, set1] = useState();
  const emp = cookies.getItem('user');
  // const {user} = useContext(UserContext);

  useEffect(() => {
    fetchStressData();
  }, []);

  const fetchStressData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/V1/getdata/${emp}`);
      if(response.data.status){
          setStressData(response.data.data);
          set1(response.data.data)
          
      }
    } catch (error) {
      console.error('Error fetching stress data:', error);
    }
  };
  

  return stressData&&(
    <>
      <Navbar/>
    <div className="dashboard">
      <h1 className='text-center'>{} Employee Stress Levels</h1>
      <div className=" d-flex justify-content-between">
        <h3>Employee_id:   {emp}</h3>
        <Filter orginal={s1} stressData={stressData} setStressData={setStressData} />
      </div>

      <Chart options={stressData} />
      <div className="w-50">
      <PieChart data={stressData} />
      </div>      



    </div>
    </>

  );
};

export default Dashboard;






