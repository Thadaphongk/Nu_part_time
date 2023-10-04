const router = require('express').Router();
const service = require('../services/owner');
const { check, query } = require('express-validator/check');
const { onRegister, onLogin } = require('../services/owner');


// หน้าลงทะเบียน
router.post('/register', [
    check('o_username').not().isEmpty(),
    check('o_password').not().isEmpty(),
    check('o_firstname').not().isEmpty(),
    check('o_lastname').not().isEmpty(),
    check('o_jobname').not().isEmpty(),
    check('o_jobphone').not().isEmpty(),
    check('o_joblocation').not().isEmpty(),
    
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
router.post('/login', [
    check('o_username').not().isEmpty(),
    check('o_password').not().isEmpty()
], async (req, res) => {
    try {
        req.validate();
        const ownerLogin = await onLogin(req.body);
        req.session.ownerLogin = ownerLogin;
        res.json(ownerLogin);
    } 
    catch (ex) {
        res.error(ex)
    }
});
//ตรวจสอบ user owner
router.post('/getownerLogin',(req, res)=>{
   try {
    if (req.session.ownerLogin) {
        return res.json(req.session.ownerLogin);
    }
    throw new Error('unauthorize')
   } 
   catch (ex) {
    res.error(ex, 401);
   }
   
});
//
//แก้ไข user
router.put('/:id', [
    check('o_firstname').not().isEmpty(),
    check('o_lastname').not().isEmpty(),
    check('o_jobname').not().isEmpty(),
    check('o_jobphone').not().isEmpty(),
    check('o_joblocation').not().isEmpty(),
 ], async (req, res) => {
     try {
         req.validate();
 
         // หาข้อมูลที่จะแก้ไข
         const item = await service.findOne({ o_id: req.params.id });
         if (!item) throw new Error('Not found item.');
 
         // // ตรวจสอบ Folder หากไม่มีก็ทำการสร้าง
         // if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
         // if (!fs.existsSync(jobDir)) fs.mkdirSync(jobDir);
 
         // // แปลงข้อมูลรูปภาพ
         // req.body.j_image = base64Img
         //     .imgSync(req.body.j_image, jobDir, `owner-${Date.now()}`)
         //     .replace(`${jobDir}\\`, '');
 
         const updateItem = await service.onUpdate(req.params.id, req.body);
 
         // // ตรวจสอบว่าแก้ไขข้อมูลได้หรือไม่
         // if (updateItem.affectedRows > 0) {
         //     const deleteImg = path.join(jobDir, item.o_image);
         //     if (fs.existsSync(deleteImg)) fs.unlink(deleteImg, () => null);
         // }
 
         res.json(updateItem);
     }
     catch (ex) {
         // หากว่ามีการ Insert ไม่ผ่านก็ลบทิ้ง
         // const delImg = path.join(jobDir, req.body.j_image || '');
         // if (fs.existsSync(delImg)) fs.unlink(delImg, () => null);
         res.error(ex);
     }
 });
//แสดง user owner
router.get('/getownerLogin',(req, res)=>{
    try {
     if (req.session.ownerLogin) {
         return res.json(req.session.ownerLogin);
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
        delete req.session.ownerLogin ;
        res.json({message: 'logout'});
     }
    catch (ex) {
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
            req.session.ownerLogin.o_id));
       
    }
    catch (ex) { res.error(ex); }
});
//แสดงค่า
router.get('/:id', async (req, res) => {
    try {
        const model = await service.findOne({ o_id: req.params.id });
        if (!model) throw new Error('Not found item.');
        // model.j_image = base64Img.base64Sync(path.join(jobDir, model.j_image));
        res.json(model);
    }
    catch (ex) { res.error(ex); }
});

router.get('/owner', [
], async (req, res) => {
    try {
        req.validate();
        res.json(await service.findAll(
            req.query, 
            req.session.ownerLogin.o_id));
       
    }
    catch (ex) { res.error(ex); }
});
//

module.exports = router;