const router = require('express').Router();
const service = require('../services/accountset');
const { check, query } = require('express-validator/check');
const { onRegister, onLogin } = require('../services/account');

// หน้าลงทะเบียน
router.post('/register', [
    check('u_username').not().isEmpty(),
    check('u_password').not().isEmpty(),
    check('u_firstname').not().isEmpty(),
    check('u_lastname').not().isEmpty()
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
router.get('/getUserLogin',(req, res)=>{
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

 ], async (req, res) => {
     try {
         req.validate();
 
         // หาข้อมูลที่จะแก้ไข
         const item = await service.findOne({ u_id: req.params.id });
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
 
 router.get('/', [
    query('page').not().isEmpty().isInt().toInt()
], async (req, res) => {
    try {
        req.validate();
        res.json(await service.find( req.query));
       
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

router.delete('/:id', async (req, res) => {
    try {
        const item = await service.findOne({ u_id: req.params.id });
        if (!item) throw new Error('Not found item.');
        const deleteItem = await service.onDelete(item.u_id);
       
       
        res.send(deleteItem);
    }
    catch (ex) { res.error(ex); }
});



module.exports = router;