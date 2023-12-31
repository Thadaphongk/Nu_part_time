const crypto = require('crypto');

const securityad = {
    password_hash(password) {
        return crypto.createHash('sha1').update(password).digest('hex');
    },
    password_verify(password, password_hash) {
        return securityad.password_hash(password) === password_hash;
    },
    
    // ตรวจสอบการเข้าสู่ระบบ
    authenticated(req, res, next) {
        try {
            if (req.session.adminLogin) {
                return next();
            }
            throw new Error('Unauthorized.');
        }
        catch (ex) {
            res.error(ex, 401);
        }
    },
    // ตรวจสอบสิทธิ์การเข้าถึงหน้า
    isInRoles(roles = []) {
        return function (req, res, next) {
            try {
                if (roles.indexOf(req.session.admin.ad_role) >= 0)
                    return next();
                throw new Error('Forbidden');
            }
            catch (ex) { res.status(403).json({ message: ex.message }); }
        }
    },

};

module.exports = securityad;