const connection = require('../configs/database');
const config = require('../configs');
const { password_hash, password_verify } = require('../configs/security');
const table = 'tb_users';
module.exports = {
    onRegister(value) {
        return new Promise((resolve, reject) => {
            value.u_password = password_hash(value.u_password);
            connection.query('INSERT INTO tb_users SET ?', value, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    },

    onLogin(value){
        return new Promise((resolve, reject) => {
            connection
            .query('SELECT * FROM tb_users WHERE u_username=?',[value.u_username],(error, result)=>{
                if (error) return reject(error) ;
                if (result.length > 0) {
                    const userLogin = result[0];
                    if (password_verify(value.u_password,userLogin.u_password)) {
                        delete userLogin.u_password;
                        delete userLogin.u_created;
                        delete userLogin.u_updated;
                        return resolve(userLogin);
                    }
                    
                }    
                reject (new Error('Invalid username or password'));
                
            });

    });
   },

   onUpdate(id, value) {
    return new Promise((resolve, reject) => {
        const $query = `
            UPDATE ${table} SET
            u_firstname = ?,
            u_lastname = ?,
            u_stuid = ?,
            u_fac = ?,
            u_age = ?,
            u_sex = ?,
            u_po = ?
            WHERE 
            u_id = ?;`;
        connection.query($query, [value.u_firstname, value.u_lastname, value.u_stuid, value.u_fac, value.u_age, value.u_sex, value.u_po, id], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
},

find(value, tb_users_u_id) {
    return new Promise((resolve, reject) => {
        const limitPage = config.limitPage;
        const startPage = ((value.page || 1) - 1) * limitPage;
        const sqls = {
            count: `SELECT COUNT(*) AS row_count FROM ${table} WHERE u_id = ?`,
            select: `SELECT * FROM ${table}  WHERE u_id = ?`
        };

        if (value.search_key && value.search_text) {
            const key = value.search_key;
            const txt = value.search_text;
            const sqlSearch = ` AND ${connection.escapeId(key)} LIKE ${connection.escape(`%${txt}%`)}`;
            sqls.count += sqlSearch;
            sqls.select += sqlSearch;
        }

        // หาจำนวนแถว
        connection.query(sqls.count, [tb_users_u_id], (error, countResult) => {
            if (error) return reject(error);

            const totalRows = countResult[0].row_count;

            // แบ่งหน้า page
            sqls.select += ` LIMIT ${startPage},${limitPage}`;
            connection.query(sqls.select, [tb_users_u_id], (error, dataResult) => {
                if (error) return reject(error);

                const items = {
                    result: dataResult,
                    rows: totalRows,
                    limit: limitPage
                };

                resolve(items);
            });
        });
    });
},
findOne(column) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, column, (error, result) => {
            if (error) return reject(error);
            resolve(result.length > 0 ? result[0] : null);
        });
    });
},

};