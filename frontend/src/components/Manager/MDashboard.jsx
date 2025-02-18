import React, { useEffect, useState ,useContext} from 'react';

export default function MDashboard() {
  return (
    <div>
      <DashboardM/>
    </div>
  )
}



import axios from 'axios';
import '../../App.css';
import { Chart } from './LineChart';
import {FilterEmp} from './Filter';
import { PieChart } from './PieChart';
import { UserContext } from '../../usecontext';
import cookies from 'js-cookies';


const DashboardM = () => {

  const [stressDataM, setStressDataM] = useState(null);
  const [EmpId, setEmpid] = useState();

  const [s1, set1] = useState();
  const [flag, setflag] = useState(false);

  


  const emp = cookies.getItem('user');
  // const {user} = useContext(UserContext);

  useEffect(() => {
    fetchStressData();
  }, []);

  const fetchStressData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/V1/getdata/0`);
      if(response.data.status){
          setStressDataM(response.data.data);
          set1(response.data.data)
          
      }
    } catch (error) {
      console.error('Error fetching stress data:', error);
    }
  };
  
 

  return stressDataM&&(
    <>
    <div className="dashboard">
      <h1 className='text-center'>{} Manager Dashboard For Employee Stress Levels</h1>
      <div className=" d-flex justify-content-between">
        <h3>Employee_id:   {EmpId}</h3>
        <FilterEmp orginal={s1} EmpId={EmpId} setflag={setflag} setEmpid={setEmpid} stressData={stressDataM} setStressData={setStressDataM} />

        <Filter orginal={s1}  EmpId={EmpId} stressData={stressDataM} setStressData={setStressDataM} />
        
      </div>


      {
        flag&&<>

      <Chart options={stressDataM} />
      <div className="w-50">
      <PieChart data={stressDataM} />
      </div> 

      </>
}
           



    </div>
    </>

  );
};



function Filter({orginal,stressData,setStressData,EmpId }) {

  
  const d= new Date().toISOString().slice(0, 10);

  const [edata,setdata] = useState(stressData);

  const last = stressData[stressData.length-1];
  const lastDate = last.Date;
  const [date,setdate] = useState(lastDate);


useEffect(() => {
  
    document.querySelector('.data_filter').setAttribute('max',d);
    setStressData(orginal.filter((i)=>i.Date === lastDate));
  
  },[date]);



function onchange(e)
{
  setdate(e.target.value)  
  console.log(e.target.value)
  const data = orginal.filter((i)=>i.Date === e.target.value)

    if(data.length==0)
    {
      onerror('No data on specific data');
    }else{
    setStressData(data)

    }

  }


  return (
    <div >
      <select className='data_filter' onChange={onchange}>
        <option value={lastDate}>{lastDate}</option>
        {[...new Set(orginal.map((item) => item.Date))].map((uniqueDate, index) => (
  <option key={index} value={uniqueDate}>{uniqueDate}</option>
))}
        
      </select>
      {/* <input  className='data_filter' onChange={onchange} type='date' value={date} ></input> */}
    </div>
  )
}




