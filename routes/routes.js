const express = require('express');

const router = express.Router();
const cors = require('cors');
const { createuser, users, checkuser, gettask, createtask, updatetask, deletetask } = require('../controller/userController');
router.use(cors());
router.use(express.json());

router.get('/user',users)
router.post('/adduser',createuser)
router.post('/login',checkuser);

// productRoutes
router.get('/task',gettask);
router.post('/addtask', createtask);
router.put('/updatetask/:id', updatetask);  
router.delete('/deletetask/:id', deletetask);


module.exports  = router;