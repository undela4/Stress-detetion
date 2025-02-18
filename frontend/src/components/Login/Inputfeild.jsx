import React from 'react'
import './login.css'

export default function InputFeild({accept,label,type,method,name,value,defaultValue,className,reference,error}) {
   
  
  return (
      <div className={`form-floating mb-3 ${className}`}>
      <input type={type}  className="form-control custom-focus" id="" ref={reference} value={value} defaultValue={defaultValue} onChange={method}  
      name={name} placeholder='enter' accept={accept} required/>
    
      <label htmlFor="floatingInput" >{label}</label>
      {error&&<span className='error'>{error}</span>}
   </div>
  
    )
  }