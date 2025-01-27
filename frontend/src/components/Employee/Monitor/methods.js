import axios from 'axios';

export const uploadVideoToServer = async (blob) => {
    // Create a FormData object to store the file
    const formData = new FormData();
    const fileName = `video.mp4`;
    const date = new Date().toISOString().slice(0, 10);
    const d = new Date()
    const time = `${d.getHours()}:${d.getMinutes()}`
    formData.append('date',date)
    formData.append('time',time)
    formData.append('EmployeeId',2)

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
      }
    } catch (error) {
      console.log(error)
    }
  };
  