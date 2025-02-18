import React, { useContext   } from 'react';
import { Route,Routes } from 'react-router-dom';
import { VideoCapture } from './components/Employee/Monitor/videoCapture';
import Dashboard from './components/Manager/DashBoard';
import Navbar from './components/Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { onsuccuse,onerror,oninfo,onwarning } from './toast';
import Video_Capture from './components/Employee/Monitor/Exp1';
import Login from './components/Login/Login.jsx';
import MDashboard from './components/Manager/MDashboard.jsx';
import Home from './Home.jsx';
import { UserContext } from './usecontext.jsx';
export default function App() {

 
  const {user}=useContext(UserContext);

 

  return (
    <>

    <div className="d-flex justify-content-center ">
    {/* <button  className="btn btn-success ms-5 me-5" onClick={()=>oninfo('Take a deep breath! Try the 4-4-4 technique: inhale for 4 seconds, hold for 4, exhale for 4.')}>success</button>
    <button  className="btn btn-danger ms-5 me-5" onClick={()=>oninfo('Take a quick stretch! Move your arms and back to release any tension')}>Error</button>
    <button  className="btn btn-info ms-5 me-5" onClick={()=>oninfo('Straighten up! Good posture can help reduce stress and improve focus.')}>info</button>
    <button  className="btn btn-warning ms-5 me-5" onClick={()=>oninfo('A quick 2-minute break can help clear your mind. Step away and come back refreshed!')}>warming</button> */}
    {/* <button  className="btn btn-warning ms-5 me-5" onClick={()=>oninfo('Look away from the screen for a moment to rest your eyes—focus on a distant object for 20 seconds.')}>warming</button> */}

    </div>
    
  {
    !user?<Login/>:  
    <>
     <Routes>
     <Route path='/' element={<Home/>}/>
      <Route path='/monitor' element={<VideoCapture/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/v' element={<Video_Capture/>}/>
     </Routes> 
     <Routes>
     <Route path='/m' element={<MDashboard/>}/>

     </Routes>


     </>
}
     <ToastContainer autoClose={5000}
        newestOnTop
        theme="colored"
        position="top-right" />

    </>
  )
}