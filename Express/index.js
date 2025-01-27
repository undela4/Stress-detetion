const express = require('express');
const app = express();
const cors =require('cors');

app.use(express.json()); 

app.use(cors({
    origin: '*'
})); 


const {mongoDB} = require('./configurations/mongoDb.js');
mongoDB();

const Route=require('./routes.js');
app.use('/V1',Route)

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});






