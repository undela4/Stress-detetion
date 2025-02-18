import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'
import { Popconfirm } from 'antd';
import { UserContext } from '../../usecontext';
import Cooikes from 'js-cookies'


export default function Navbar()

{

  
    const {user,logout}=useContext(UserContext);
    const name = Cooikes.getItem('user');

    function onlogout()
    {
      logout();
    }


    
  return (
    <>
      <nav>
        <div className="nav-bar mt- mb-5 ">
        <img className="logo" src="https://img.freepik.com/premium-vector/employee-wellbeing-wellness-comfortable-work_1134986-9079.jpg?semt=ais_hybrid" ></img>
        <NavLink className={'nav-items'} to='/'>Home</NavLink>
        <NavLink className={'nav-items'} to='/dashboard'>DashBoard</NavLink>
        {/* <NavLink className={'nav-items'} to='/monitor'>Monitor</NavLink>x */}


        {user&&<NavLink className={'nav-items'}>Employee Id: {name}</NavLink>}

        {
        !user?<NavLink className={'nav-items'}>Login</NavLink>

        :<NavLink className={'nav-items'}><Logout method={onlogout}/></NavLink>
        }

        
        </div>
        
    </nav>
    </>
  )
}



function Logout({method})
{

  console
    return(
        <>
        <Popconfirm
            title=" Logout"
            description="Are you sure to Logout ?"
            okText="Yes"
            cancelText="No"
            onConfirm={method}
        >
    Logout
  </Popconfirm>
  </>
    )
}