import { useState,useEffect } from "react" ;
import './filter.css';
import {onerror}  from '../../toast.js'


export default function Filter({orginal,stressData,setStressData}) {


  const d= new Date().toISOString().slice(0, 10);

  const [edata,setdata] = useState(stressData);

  const last = orginal[orginal.length-1];
  const lastDate = last.Date;
  const [date,setdate] = useState(lastDate);


useEffect(() => {
  
    document.querySelector('.data_filter').setAttribute('max',d);
    setStressData(orginal.filter((i)=>i.Date === lastDate));
  
  },[]);



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
      <input  className='data_filter' onChange={onchange} type='date' value={date} ></input>
    </div>
  )
}



export  function FilterEmp({orginal,stressData,setStressData,EmpId,setEmpid,setflag}) {


  const d= new Date().toISOString().slice(0, 10);
  const [edata,setdata] = useState(stressData);
  const [date,setdate] = useState();

  function hello(data) {
    const last = data[data.length-1];
    const lastDate = last.Date;
    setdate((prev) => ({ ...prev, lastDate }));
    return lastDate
  }


function onselectingempid(e)
{
  setEmpid(e.target.value)
  console.log(e.target.value)
  var data = orginal.filter((i)=>i.EmployeeId == e.target.value)

  const da = hello(data);
  console.log(da)
  data = data.filter((i)=>i.Date === da)

    if(data.length==0){
      onerror('No data on specific data');

    }else{
    
    console.log(data);
    setStressData(data)

    setflag(true)

    }

  }


  return (
    <div >
      <select className='border border-dark border-2' onChange={onselectingempid}>
                <option value={EmpId}>Employee Id</option>
                <option value="1">1</option>
                <option value="2">2</option>

      </select>

    </div>
  )
}