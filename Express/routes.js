const express=require('express');
const Route = express.Router();
const {Upload_Stress_Data,Get_Stress_Data}=require('./Controllers/Stress.js');
const {Stress_Detection}=require('./Controllers/StressDetection.js');
const {UploadStressData}=require('./Controllers/PostStressData.js');
const {Sign_in}=require('./Controllers/Auth.js');



const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    // Create a unique file name with timestamp
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

//http://localhost:5000/V1/stress
Route.post('/stress',Upload_Stress_Data);

//http://localhost:5000/V1/sign_in
Route.post('/login',Sign_in);

// http://localhost:5000/V1/upload
Route.post('/uploadStressData',upload.single('video'),UploadStressData,Stress_Detection);


// http://localhost:5000/V1/getdata/:id
Route.get('/getdata/:id',Get_Stress_Data)
    



module.exports=Route
