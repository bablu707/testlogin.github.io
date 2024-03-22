const mongoose=require("mongoose");
const db="mongodb+srv://greatwords6466:g4PCv5M06vRRwwNx@demoproject.ckhyltv.mongodb.net/";
const connect=mongoose.connect(db);

connect.then(()=>{
    console.log("Database Successfully Connected");
})
.catch(()=>{
    console.log("Some error Occured!");
});

const myschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
});

mongoose.connect(db,{
    bufferCommands:false,
    bufferTimeoutMS:10000,
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const collection=new mongoose.model("user",myschema);
module.exports=collection;