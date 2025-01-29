const mongoose =require('mongoose');

const stressSchema = new mongoose.Schema({
  EmployeeId: { type: Number, required: true },
  StressDetails:{
    final_stress_percentage: { type: Number, required: true },
    most_repeated_emotion: { type: String, required: true },
    most_repeated_count: { type: Number, required: true },
    emotion_counts: {}
  }
  ,
  Date: { type: String, default: Date.now },
  Time: { type: String, default: Date.now }

});



module.exports=mongoose.model('stressdatas', stressSchema);