const router = require('express').Router();
const service = require('../services/admin');
const { check, query } = require('express-validator/check');
const { onRegister, onLogin } = require('../services/admin');

// หน้าลงทะเบียน
router.post('/register', [
    check('ad_username').not().isEmpty(),
    check('ad_password').not().isEmpty(),
], async (req, res) => {
    try {
        req.validate();
        res.json(await onRegister(req.body));
    }
    catch (ex) {
        res.error(ex);
    }
});
//เข้าสู่ระบบ
router.post('/login',[
    check('ad_username').not().isEmpty(),
    check('ad_password').not().isEmpty()
], async (req, res) =>{
try {
   req.validate();
   const adminlogin =await onLogin(req.body);
   req.session.adminlogin = adminlogin ;
   res.json(adminlogin);
} 
catch (ex) {
    res.error(ex)
}
});

// router.get('/adminLogin',(req, res)=>{
//     res.json(req.session.adminlogin);
    
//  });

//ตรวจสอบ user login
router.post('/getadminLogin',(req, res)=>{
   try {
    if (req.session.adminlogin) {
        return res.json(req.session.adminlogin);
    }
    throw new Error('unauthorize')
   } 
   catch (ex) {
    res.error(ex, 401);
   }
   
});
//ตรวจสอบ user login
router.get('/getadminLogin',(req, res)=>{
    try {
     if (req.session.adminlogin) {
         return res.json(req.session.adminlogin);
     }
     throw new Error('unauthorize')
    } 
    catch (ex) {
     res.error(ex, 401);
    }
    
 });

//ออกจากระบบ
router.post('/logout',(req, res)=>{
    try {
        delete req.session.adminlogin ;
        res.json({message: 'logout'});
     }
    catch (ex) {
     res.error(ex);
    }
    
 });

 module.exports = router;