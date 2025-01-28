const express=require('express')

const loginemp=require('../controllers/loginemp')
const loginuser=require('../controllers/loginuser')

const router=express.Router();

router.route('/company').post(loginemp)
router.route('/user').post(loginuser)

module.exports=router