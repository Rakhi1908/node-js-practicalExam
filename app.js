const express = require('express');

const app = express();
const cors = require('cors');
const db = require('./config/db');
const router = require('./routes/routes');


app.use("/",router)
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.listen(3333,()=>{
    console.log("server listening ")
})  