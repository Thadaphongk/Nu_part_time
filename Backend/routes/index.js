const router = require('express').Router();
const { authenticated, isInRoles  } = require('../configs/security');
const { authenticatedowner, isInRolesowner  } = require('../configs/securityowner');

// สำหรับ เจ้าของร้าน route
router.use('/owner', require('./owner'));

// สำหรับ ผู้หางาน route
router.use('/account', require('./account'));

//สำหรับ admin route
router.use('/admin',require('./admin'));


//สำหรับ admin route
router.use('/ownerset',require('./ownerset'));
router.use('/accountset', require('./accountset'));


// สำหรับ ผู้ใช้ทั่วไป  และ ผู้สมัครงาน  route
router.use('/jobshow', authenticated,require('./jobshow'));
router.use('/jobapp', require('./jobapp'));
router.use('/jobs', require('./jobs'));
router.use('/showapply',require('./apply'));

router.use('/applyadmin', require('./applyadmin'));
//
router.use('/jobsadmin', require('./jobsadmin'));

// สำหรับ งาน route
router.use('/job', authenticatedowner, isInRolesowner(['owner']), require('./job'));


// สำหรับ การสมัครงาน route
router.use('/apply',authenticatedowner,require('./apply'));

module.exports = router;