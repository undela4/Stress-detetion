const mongoose = require('mongoose');

exports.mongoDB=()=>{
    
    mongoose.connect('mongodb://localhost:27017/stressDataDB').then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });
  
}