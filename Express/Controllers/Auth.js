const Employee =require('../models/Employees.js');

exports.Sign_in=async(req,res)=>{
    try{
        const {empId,password}=req.body;
        const emp=await Employee.findOne({empId});

        if(!emp||emp.password!==password){
            return res.status(400).send({status:false,msg:"Invalid credentials"});
        }
        else{
            return res.status(200).send({status:true,msg:"Login successful",data:emp});
        }

    }catch(e){
        console.error(e);
        res.status(500).send({status:false,msg:"Internal error"});
    }



}