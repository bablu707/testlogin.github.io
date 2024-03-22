const express=require('express');
const path= require("path");
const bcrypt=require("bcrypt");
const collection=require("./config");
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');
app.get("/",(req,res)=>{
    res.render("login");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.use(express.static("public"));
app.get("/home",(req,res)=>{
    res.render("home");
});
//adding data to the database(through signup form)
app.post("/signup",async(req,res)=>{
    const {password,email}=req.body;
    const existingmail=await collection.findOne({mail:email});
    if(existingmail){
         res.status(400).send('<script>alert("Email already registered. Please login to your account."); window.location.href = "/login";</script>');
    }
    else{
    const hashedPassword = await bcrypt.hash(password, 10);
    const data={
        name:req.body.username,
        password:hashedPassword,
        mail:req.body.email
    }
    const userdata=await collection.insertMany(data);
    console.log(userdata);
    res.redirect("/home");
}
});

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const emailexists=await collection.findOne({mail:email});
    if(!emailexists){
        res.status(400).send('<script>alert("Entered Email is incorrect or does not exist.");window.location.href="/login";</script>');
    }
    else{
        const match= await bcrypt.compare(password,emailexists.password);
        if (!match) {
             res.send('<script>alert("Password is incorrect! Please try again."); window.location.href="/login";</script>');
        }
        else{
            res.redirect("/home");
        }}
  
});

const port=process.env.port ||8000;
app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});
