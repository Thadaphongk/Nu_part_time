const router = require('express').Router();
const { query, check, param } = require('express-validator/check');
const jobService = require('../services/jobs');
const applyService = require('../services/applyadmin');
const base64Img = require('base64-img');
const fs = require('fs');
const path = require('path');
const uploadDir = path.resolve('uploads');
const applyDir = path.join(uploadDir, 'jobs');
const { isInRoles } = require('../configs/security');
const { isInRolesowner } = require('../configs/securityowner');
// แสดงรายการห้องประชุมที่จะทำการจอง
router.get('/', [
    query('page').isInt()
], async (req, res) => {
    try {
        req.validate();
        res.json(await jobService.find(req.query));
    }
    catch (ex) { res.error(ex); }
});
// แสดงประวัติการจองห้องประชุม
router.get('/history', [
    query('page').isInt()
], async (req, res) => {
    try {
        req.validate();
        res.json(await applyService.findHistory(req.query));
    }
    catch (ex) { res.error(ex); }
});

// แสดงข้อมูลอุปกรณ์ห้องประชุมเพื่อเอาไปทำ list checkbox
router.get('/่jobs', async (req, res) => {
    try {
        res.json(await jobService.findAll());
    }
    catch (ex) { res.error(ex); }
});


// แสดงรายละเอียดของงาน
router.get('/job/:id', async (req, res) => {
    try {
        const model = await jobService.findDetailForBooking(req.params.id);
        if (!model) throw new Error('Not found item.');
        res.json(model);
    }
    catch (ex) { res.error(ex); }
});
// แสดงรายละเอียดของผู้สมัครงาน
router.get('/jobs/:id', async (req, res) => {
    try {
        const model = await jobService.findDetailJob(req.params.id);
        if (!model) throw new Error('Not found itemssss');
        res.json(model);
    }
    catch (ex) { res.error(ex); }
});


// เพิ่มการจองห้องประชุม
router.post('/', [
    check('tb_detailJob_j_id').isInt(),
    check('a_name').not().isEmpty(),
    check('a_photo').not().isEmpty(),
    check('a_lastname').not().isEmpty(),
    check('a_studentid').isInt(),
    check('a_faculty').not().isEmpty(),
    check('a_sex').not().isEmpty(),
    check('a_phone').not().isEmpty(),
    check('a_resume').not().isEmpty(),
    check('a_date').not().isEmpty(),
    check('a_set').not().isEmpty(),
], async (req, res) => {
    try {
        req.validate();
        req.body.tb_users_u_id = req.session.userLogin.u_id;
          // ตรวจสอบ Folder หากไม่มีก็ทำการสร้าง
          if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
          if (!fs.existsSync(applyDir)) fs.mkdirSync(applyDir);
  
          // แปลงข้อมูลรูปภาพ
          req.body.a_photo = base64Img
          .imgSync(req.body.a_photo, applyDir, `job-${Date.now()}`)
          .replace(`${applyDir}\\`, '');
       
    res.json(await applyService.onCreate(req.body));
    }
    catch (ex) { 
           // หากว่ามีการ Insert ไม่ผ่านก็ลบทิ้ง
           const delImg = path.join(applyDir, req.body.a_photo || '');
           if (fs.existsSync(delImg)) fs.unlink(delImg, () => null);
           res.error(ex);
         }
});

//#region สำหรับผู้ดูและระบบ 


// แสดงรายการจองห้องประชุมของสมาชิก
router.get('/manage', [
    query('page').isInt()
], async (req, res) => {
    try {
        req.validate();
        res.json(await applyService.findHistorys(req.query));
    }
    catch (ex) { res.error(ex); }
});

// แก้ไขสถานะการจองเป็น อนุมัติ กับ ไม่อนุมัติ
router.put('/manage/:id', [
    param('id').isInt(),
    check('a_status').isIn(['allowed', 'not allowed'])
], async (req, res) => {
    try {
        req.validate();
        const findItem = await applyService.findById(req.params.id);
        if (!findItem) throw new Error('Not found item.');
        res.json(await applyService.onUpdate(findItem.a_id, req.body));
    }
    catch (ex) { res.error(ex); }
});

// ลบข้อมูลห้องประชุม
router.delete('/manage/:id', [
    param('id').isInt()
], async (req, res) => {
    try {
        req.validate();
        const findItem = await applyService.findById(req.params.id);
        if (!findItem) throw new Error('Not found item.');
        res.json(await applyService.onDelete(findItem.a_id));
    }
    catch (ex) { res.error(ex); }
});

//#endregion

module.exports = router;