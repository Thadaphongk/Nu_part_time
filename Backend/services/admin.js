const connection = require('../configs/database');
const config = require('../configs');
const { password_hash, password_verify } = require('../configs/security');
const table = 'tb_users';
module.exports = {
    onRegister(value) {
        return new Promise((resolve, reject) => {
            value.ad_password = password_hash(value.ad_password);
            connection.query('INSERT INTO tb_admin SET ?', value, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    },

    onLogin(value){
        return new Promise((resolve, reject) => {
            connection
            .query('SELECT * FROM tb_admin WHERE ad_username=?',[value.ad_username],(error, result)=>{
                if (error) return reject(error) ;
                if (result.length > 0) {
                    const adminLogin = result[0];
                    if (password_verify(value.ad_password,adminLogin.ad_password)) {
                        delete adminLogin.ad_password;
                        delete adminLogin.ad_created;
                        delete adminLogin.ad_updated;
                        return resolve(adminLogin);
                    }
                    
                }    
                reject (new Error('Invalid admin or password'));
                
            });

    });
   },
};