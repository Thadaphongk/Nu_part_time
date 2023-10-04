const router = require('express').Router();
const service = require('../services/account');
const { check, query } = require('express-validator/check');
const { onRegister, onLogin } = require('../services/account');

// หน้าลงทะเบียน
router.post('/register', [
    check('u_username').not().isEmpty(),
    check('u_password').not().isEmpty(),
    check('u_firstname').not().isEmpty(),
    check('u_lastname').not().isEmpty(),
    check('u_stuid').not().isEmpty(),
    check('u_fac').not().isEmpty(),
    check('u_age').not().isEmpty(),
    check('u_sex').not().isEmpty(),
    check('u_po')
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
    check('u_username').not().isEmpty(),
    check('u_password').not().isEmpty()
], async (req, res) =>{
try {
   req.validate();
   const userLogin =await onLogin(req.body);
   req.session.userLogin = userLogin ;
   res.json(userLogin);
} 
catch (ex) {
    res.error(ex)
}
});

//ตรวจสอบ user login
router.post('/getUserLogin',(req, res)=>{
   try {
    if (req.session.userLogin) {
        return res.json(req.session.userLogin);
    }
    throw new Error('unauthorize')
   } 
   catch (ex) {
    res.error(ex, 401);
   }
   
});
//ตรวจสอบ user login
router.get('/getUserLogin',(req,res)=>{
    try {
     if (req.session.userLogin) {
         return res.json(req.session.userLogin);
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
        delete req.session.userLogin ;
        res.json({message: 'logout'});
     }
    catch (ex) {
     res.error(ex);
    }
    
 });

 router.put('/:id', [
    check('u_firstname').not().isEmpty(),
    check('u_lastname').not().isEmpty(),
    check('u_stuid').not().isEmpty(),
    check('u_fac').not().isEmpty(),
    check('u_age').not().isEmpty(),
    check('u_sex').not().isEmpty(),
    check('u_po'),
], async (req, res) => {
    try {
        req.validate();

        // หาข้อมูลที่จะแก้ไข
        const item = await service.findOne({ u_id: req.params.id });
        if (!item) throw new Error('Not found item.');

        // ทำการอัปเดตข้อมูลใน req.session.userLogin
        req.session.userLogin.u_firstname = req.body.u_firstname;
        req.session.userLogin.u_lastname = req.body.u_lastname;
        req.session.userLogin.u_stuid = req.body.u_stuid;
        req.session.userLogin.u_fac = req.body.u_fac;
        req.session.userLogin.u_age = req.body.u_age;
        req.session.userLogin.u_sex = req.body.u_sex;
        req.session.userLogin.u_po = req.body.u_po;

        const updateItem = await service.onUpdate(req.params.id, req.body);

        res.json(updateItem);
    } catch (ex) {
        res.error(ex);
    }
});
 
 router.get('/', [
    query('page').not().isEmpty().isInt().toInt()
], async (req, res) => {
    try {
        req.validate();
        res.json(await service.find(
            req.query, 
            req.session.userLogin.u_id));
       
    }
    catch (ex) { res.error(ex); }
});
//แสดงค่า
router.get('/:id', async (req, res) => {
    try {
        const model = await service.findOne({ u_id: req.params.id });
        if (!model) throw new Error('Not found item.');
        // model.j_image = base64Img.base64Sync(path.join(jobDir, model.j_image));
        res.json(model);
    }
    catch (ex) { res.error(ex); }
});





module.exports = router;