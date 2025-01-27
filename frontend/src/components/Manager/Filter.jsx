import { useState,useEffect } from "react" ;
import './filter.css';

import {onerror}  from '../../toast.js'

export default function Filter({orginal,stressData,setStressData}) {


  const d= new Date().toISOString().slice(0, 10);
  const [edata,setdata] = useState(stressData);
  const [date,setdate] = useState(d);


useEffect(() => {

    document.querySelector('.data_filter').setAttribute('max',date);
    setStressData(orginal.filter((i)=>i.Date === d));
    

  },[]);

function onchange(e)
{
  setdate(e.target.value)  
  console.log(e.target.value)
  const data = orginal.filter((i)=>i.Date === e.target.value)

    if(data.length==0){
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
