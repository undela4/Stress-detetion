const mongoose = require('mongoose');

exports.mongoDB=()=>{
    
    mongoose.connect('mongodb+srv://muraliundela369:Murali%402004@cluster0.onsel64.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    // mongoose.connect('mongodb://localhost:27017/stressDataDB').then(() => {

    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });
  
}
