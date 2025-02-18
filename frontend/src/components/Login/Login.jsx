import React,{useContext, useRef, useState} from 'react'
import './login.css'
import login_img from '../../assets/images/login.svg'
import InputFeild from './Inputfeild'
import { useNavigate } from 'react-router-dom';
import { onsuccess ,onerror} from '../../toast.js';
import { UserContext } from '../../usecontext';
import axios from 'axios';
export default function Login() {

    const [data, setuserdata] = useState({empId:'',password:''})
    const [error,seterror]=useState('');
    const [error1,seterror1]=useState('');
    const [flag,setflag]=useState(false);

    const nav = useNavigate();

    const r1=useRef(null);
    const r2=useRef(null);

    const {login}=useContext(UserContext)


    const handleChange = (e) => {

        setuserdata({...data,[e.target.name]:e.target.value});
        if(e.target.value!='')
        {
            if(e.target.name==='Username'){
            seterror('');
              r1.current.style.boxShadow=""
            }
            else{
                seterror1('');
                r2.current.style.boxShadow=""
            }
        }
             
    };
    const Onsubmit = async() => {
        const {empId,password}=data;
        
        if(empId.trim()!='')
        {
            
            if(password.trim()!='')
            {
              setflag(true);
             await axios.post('http://localhost:5000/V1/login',data).then((r)=>{
                console.log(r.data)
                  if(r.data.status)
                    {
                      onsuccess(r.data.msg)
                      login(r.data.data.empId)
                      nav('/');
                  }
                  else{
                    onerror(r.data.msg)
                  }
               
                }).catch((err)=>{
                  console.log(err)
                  onerror('Invalid login details')
                  setflag(false);

                })

            }
            else{
                    seterror1('please enter Password');
                    r2.current.focus();
                    r2.current.style.boxShadow="0 0 0 0.1rem red"
                }
        }
        else{
            seterror('please enter Username')
            r1.current.focus();
            r1.current.style.boxShadow="0 0 0 0.1rem red"
        }
    }


  return (
    <>
    <div className='sign_in container'>
      <div className="sign_in_left w-50">
        <img src={login_img} ></img>

      </div>
      <div className="sign_in_right">

        <h2 className='mb-2'>Login</h2>
        <div className="line"></div>
        <InputFeild  type={'email'} value={data.empId}  reference={r1} 
         method={handleChange} name='empId' label={`Enter Employee Id `}
        className='w-75 input'
        error={error}/>

        
        <InputFeild  type={'password'} value={data.password} reference={r2} 
        method={handleChange} name='password' label={'Enter Password '}
        className='w-75 input'
        error={error1}/>
      
        <button className='btn btn-success' onClick={Onsubmit} disabled={flag} >Submit</button>
      </div>
    </div>
    </>
  )
}
