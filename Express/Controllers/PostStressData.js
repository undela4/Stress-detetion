
// Define an upload route
exports.UploadStressData=(req, res,next) => {
  
  const file = req.file;

   req.EmpData = {
    EmployeeId: req.body.EmployeeId,
    StressDetails:{},
    Date:req.body.date,
    Time:req.body.time
   }

  if (!file) {
    return res.status(400).send({status:false,message:'No video file uploaded.'});
  }
  // File is successfully received
//   console.log(`Video uploaded: ${file.filename}`);

//   res.status(200).send({ status:true,message: 'Upload successful'});

  next();


}
