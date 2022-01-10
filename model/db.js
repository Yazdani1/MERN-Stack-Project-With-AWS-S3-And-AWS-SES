const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODBNOTE,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},(err)=>{
    if(!err){
        console.log("Database Connected working")
    }else{
        console.log("We got an error"+err);
    }
});