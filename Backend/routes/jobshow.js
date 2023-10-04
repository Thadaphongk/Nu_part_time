const router = require('express').Router();
const { query, check, param } = require('express-validator/check');
const jobService = require('../services/job');
const applyService = require('../services/apply');
const { isInRoles } = require('../configs/security');

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

// แสดงข้อมูลอุปกรณ์ห้องประชุมเพื่อเอาไปทำ list checkbox
router.get('/่jobs', async (req, res) => {
    try {
        res.json(await jobService.findAll());
    }
    catch (ex) { res.error(ex); }
});
// แสดงประวัติการจองห้องประชุม
router.get('/history', [
    query('page').isInt()
], async (req, res) => {
    try {
        req.validate();
        res.json(await applyService.findHistory(
            req.query, 
            req.session.userLogin.u_id 
        ));
    }
    catch (ex) { res.error(ex); }
});

// แสดงรายละเอียดของห้องประชุม
router.get('/job/:id', async (req, res) => {
    try {
        const model = await jobService.findDetailForBooking(req.params.id);
        if (!model) throw new Error('Not found item.');
        res.json(model);
    }
    catch (ex) { res.error(ex); }
});

// ดึงข้อมูลห้องประชุมมาทำ Select
router.get('/job/select', async (req, res) => {
    try {
        res.json(await jobService.findSelect());
    }
    catch (ex) { res.error(ex); }
});






module.exports = router;