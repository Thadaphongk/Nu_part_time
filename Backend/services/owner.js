const connection = require('../configs/database');
const config = require('../configs');
const {password_hasho,password_verifyo } = require('../configs/securityowner');
const table = 'tb_owner';
module.exports = {
    onRegister(value) {
        return new Promise((resolve, reject) => {
            value.o_password = password_hasho(value.o_password);
            connection.query('INSERT INTO tb_owner SET ?', value, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    },

    onLogin(value){
        return new Promise((resolve, reject) => {
            connection
            .query('SELECT * FROM tb_owner WHERE o_username=?',[value.o_username],(error, result)=>{
                if (error) return reject(error) ;
                if (result.length > 0) {
                    const ownerLogin = result[0];
                    if (password_verifyo(value.o_password,ownerLogin.o_password)) {
                        delete ownerLogin.o_password;
                        delete ownerLogin.o_created;
                        delete ownerLogin.o_updated;
                        return resolve(ownerLogin);
                    }
                    
                }    
                reject (new Error('Invalid username or password'));
                
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
onUpdate(id, value) {
    return new Promise((resolve, reject) => {
        
        const $query = `
            UPDATE ${table} SET
            o_firstname = ?,
            o_lastname = ?,
            o_jobname = ?,
            o_jobphone = ?,
            o_joblocation = ?
            WHERE 
            o_id = ?;`;
        connection.query($query, [ value.o_firstname, value.o_lastname, value.o_jobname, value.o_jobphone, value.o_joblocation, id], (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
},
find(value, tb_owner_o_id) {
    return new Promise((resolve, reject) => {
        const limitPage = config.limitPage;
        const startPage = ((value.page || 1) - 1) * limitPage;
        const sqls = {
            count: `SELECT COUNT(*) AS row_count FROM ${table} WHERE o_id = ?`,
            select: `SELECT * FROM ${table}  WHERE o_id = ?`
        };

        if (value.search_key && value.search_text) {
            const key = value.search_key;
            const txt = value.search_text;
            const sqlSearch = ` AND ${connection.escapeId(key)} LIKE ${connection.escape(`%${txt}%`)}`;
            sqls.count += sqlSearch;
            sqls.select += sqlSearch;
        }

        // หาจำนวนแถว
        connection.query(sqls.count, [tb_owner_o_id], (error, countResult) => {
            if (error) return reject(error);

            const totalRows = countResult[0].row_count;

            // แบ่งหน้า page
            sqls.select += ` LIMIT ${startPage},${limitPage}`;
            connection.query(sqls.select, [tb_owner_o_id], (error, dataResult) => {
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


   
};