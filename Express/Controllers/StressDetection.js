const {spawn } = require('child_process');
const path =require('path');

exports.Stress_Detection=(req, res) => {

    // console.log(req.data);
    const videoPath =path.join(__dirname,'../uploads/video.mp4'); // Change to your video path
    const pythonProcess = spawn('python', [path.join(__dirname, 'k.py'), videoPath]);

    let scriptOutput = '';

    // Handle standard output from the Python script
    pythonProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
    });

    // Handle standard error output from the Python script
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // When the Python script exits
    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);

        // Check for errors
        if (code !== 0) {
            return res.status(500).json({ error: 'Python script failed' });
        }

        try {
            // Parse the JSON output from the script
            const results = JSON.parse(scriptOutput);

            var data=req.EmpData;
            data.StressDetails=results
            upload_data_into_DB(data,res);




        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError}`);
            res.status(500).json({ error: 'Error parsing results' });
        }
    });
}

const StressData = require('../models/EmployeeData')



async function upload_data_into_DB(data, res) {
  try {
    const newitem = new StressData({
        EmployeeId: data.EmployeeId,
        StressDetails: data.StressDetails,
        Date: data.Date,
        Time: data.Time
      });
      
      
    await newitem.save(); // Save the updated document
    res.status(200).send({status:true,message: 'New user created and stress data added' });

    
  }

  catch (error) {
    console.log('Error uploading data into DB:', error);
    res.status(500).json({ message: 'Error uploading data into DB', error });
  }
}
