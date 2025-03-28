const taskModel = require("../models/productModel");
const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser');

const users = async(req,res)=>{
    const data = await userModel.find();
    res.send(data)
}
const createuser = async(req,res)=>{
    let {email,password} = req.body;
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password,salt)
        const data = await userModel.create({email,password:hash});
        res.json(data);
    } catch (error) {
        console.log(error)
    }
}
const checkuser = async(req,res)=>{
    let {email,password} = req.body;
    try{
     const data = await userModel.findOne({email:email})
     if(!data) res.status(404).json({message:"usernotFound"});

        let match = bcrypt.compare(password,data.password)
            if(match){
                let token = jwt.sign({email},"sfsfd");
                res.json(data).cookie('token',token);
            }else{
                res.status(404).json({message:"password inccorrect"});
            }
    }catch (error){

    }
}

const gettask = async(req,res)=>{
    const data = await taskModel.find();
    res.json(data);
}
// const createtask = async(req,res)=>{
//     let {title,description} = req.body;
//     const data = await taskModel.create({title:title,description:description});
// }
const createtask = async (req, res) => {
    let { title, description, status } = req.body; 
    try {
        const data = await taskModel.create({ title, description, status });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Task creation failed", error });
    }
};


// const updatetask = async (req, res) => {
//     const { id } = req.params;
//     const { author, article, comment } = req.body;
//     try {
//         const updatedtask = await taskModel.findByIdAndUpdate(id, { author, article, comment }, { new: true });
//         res.json(updatedtask);
//     } catch (error) {
//         res.status(500).json({ message: "Update failed", error });
//     }
// };
const updatetask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body; // Status include karein
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(id, { title, description, status }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error });
    }
};


const deletetask = async (req, res) => {
    const { id } = req.params;
    try {
        await taskModel.findByIdAndDelete(id);
        res.json({ message: "task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error });
    }
};

module.exports = {createuser,users,checkuser,gettask,createtask,updatetask,deletetask}