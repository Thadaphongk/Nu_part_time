const crypto = require('crypto');

const securityo = {
    password_hasho(password) {
        return crypto.createHash('sha1').update(password).digest('hex');
    },
    password_verifyo(password, password_hash) {
        return securityo.password_hasho(password) === password_hash;
    },


authenticatedowner(req, res, next) {
    try {
        if (req.session.ownerLogin) {
            return next();
        }
        throw new Error('Unauthorized.');
    }
    catch (ex) {
        res.error(ex, 401);
    }
},
// ตรวจสอบสิทธิ์การเข้าถึงหน้า
isInRolesowner(roles = []) {
    return function (req, res, next) {
        try {
            if (roles.indexOf(req.session.ownerLogin.o_role) >= 0)
                return next();
            throw new Error('Forbidden');
        }
        catch (ex) { res.status(403).json({ message: ex.message }); }
    }
}
};
module.exports = securityo;