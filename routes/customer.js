const express=require("express");
const router=express.Router();

const customerCtrl=require('../controllers/customer');

router.post('/signup',customerCtrl.signup);
router.post('/login',customerCtrl.login);

module.exports=router;
