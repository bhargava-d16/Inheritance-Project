const express=require('express')
const registeruser=require('../controllers/registeruser')
const registeremp=require('../controllers/registeremp')

const router=express.Router();
router.route('/user').post(registeruser)
router.route('/company').post(registeremp)

module.exports=router