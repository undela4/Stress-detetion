import axios from 'axios';
import {onerror,oninfo,onsuccess} from '../../../toast.js';
import Cooikes from 'js-cookies';

const empId = Cooikes.getItem('user');

export const uploadVideoToServer = async (blob) => {
    // Create a FormData object to store the file
    const formData = new FormData();
    const fileName = `video.mp4`;
    const date = new Date().toISOString().slice(0, 10);
    const d = new Date()
    const time = `${d.getHours()}:${d.getMinutes()}`
    formData.append('date',date)
    formData.append('time',time)
    formData.append('EmployeeId',empId)
    formData.append('video', blob, fileName);
    console.log(formData)
  
    try {
      // Send the form data to your backend API via POST request
      const response = await axios.post('http://localhost:5000/V1/uploadStressData',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }})

      console.log(response);
      if (response.data.status) 

      {
        console.log('Upload successful!',response.data);
        const sl = response.data.data.StressDetails.final_stress_percentage;
        if(s1>60){
          onerror('Stress level is high, take a rest.')
        }
        console.log(sl)
         


      }
    } catch (error) {
      console.log(error)
    }
  };
  