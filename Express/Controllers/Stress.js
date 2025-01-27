const  StressData =require('../models/EmployeeData.js')

exports.Upload_Stress_Data=async (req, res) => {

    try{
        const { employeeId, stressLevel, timestamp } = req.body;
        const newStressData = new StressData({
          employeeId,
          stressLevel,
          timestamp: timestamp || Date.now() 
        });

        await newStressData.save();
        res.status(200).send({status:true,msg:"Data uploaded successfully"})
    
    }
    catch(err){
        console.log(err.maessage);
        res.status(501).send({satus:false,msg:"Internal error"})
    }
   
}


exports.Get_Stress_Data=async (req, res) => {
    try{

        const id = req.params.id;
        const data = await StressData.find({EmployeeId:id});
        res.status(200).send({status:true,data:data}) 
    }
    catch(err){
        console.log(err.maessage);
        res.status(501).send({satus:false,msg:"Internal error"})
    }
   
}