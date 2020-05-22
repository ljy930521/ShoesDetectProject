const fs = require('fs');
const mysql = require('mysql');
const data = fs.readFileSync(__dirname + '/public/mysqlConf.json');
const conf = JSON.parse(data);

module.exports = {
    getConnection:     function() {
        const connection = mysql.createConnection({
            host: conf.host,
            user: conf.user,
            password: conf.password,
            port: conf.port,
            database: conf.database
        });
        connection.connect(function(err) {
            if (err) {
                console.log('mysql connection error :' + err);
            } else {
                //console.log('mysql is connected successfully.');
            }
        });
        return connection;
    },
    getUserInfo:    function(uid, callback) {
        const conn = this.getConnection();
        const sql = 'select * from user where uid = ?';   // DATE_FORMAT(createdDate, '%Y-%m-%d %T')

        conn.query(sql, uid, function(err, row, fields) {
            if (err)
                console.log(err);
            else
                callback(row);
        });
        conn.end();
    },
    getUsers:  function(pageNo, callback) {
        const conn = this.getConnection();
        let offset = (pageNo - 1) * 10;
        const sql = `SELECT u.uid, u.name, d.name AS deptName, u.tel, DATE_FORMAT(u.regDate, '%Y-%m-%d') as ts FROM user AS u \
            INNER JOIN dept AS d ON u.deptId=d.did WHERE u.isDeleted=0 limit ${offset}, 10`;   // limit offset, 갯수

        conn.query(sql, function(err, rows, fields) {
            if (err)
                console.log(err);
            else
                callback(rows);
        });
        conn.end();
    },
    getUserCount:  function(callback) {
        const conn = this.getConnection();
        const sql = `select count(*) as \`count\` from user where isDeleted=0`;

        conn.query(sql, function(err, row, fields) {
            if (err)
                console.log(err);
            else
                callback(row);
        });
        conn.end();
    },
    registerUser:    function(params, callback) {
        const conn = this.getConnection();
        const sql = `insert into user(uid, password, name, deptId, tel) values (?, ?, ?, ?, ?)`;

        conn.query(sql, params, function(err, result) {
            if (err)
                console.log(err);
            else {
                //console.log('registerUser(),', result);
                callback();
            }
        });
        conn.end();
    },
    updateUser: function(params, callback) {
        const conn = this.getConnection();
        const sql = `update user set password=?, name=?, deptId=?, tel=? where uid = ?`;

        conn.query(sql, params, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    },
    deleteUser: function(uid, callback) {
        const conn = this.getConnection();
        const sql = `update user set isDeleted=1 where uid = ?`;

        conn.query(sql, uid, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    },
    getBeforeUserCount: function(uid, callback) {           // 페이지 지원 - update/delete 시
        const conn = this.getConnection();
        const sql = "select count(*) as \`count\` from user where uid < (select uid from user where uid = ? and isDeleted=0)";

        conn.query(sql, uid, function(err, row, fields) {
            if (err)
                console.log(err);
            else
                callback(row);
        });
        conn.end();
    },
    getAllDepts:  function(callback) {
        const conn = this.getConnection();
        const sql = `select * from dept`;

        conn.query(sql, function(err, rows, fields) {
            if (err)
                console.log(err);
            else
                callback(rows);
        });
        conn.end();
    },
    getAllItems: function(callback) {
        const conn = this.getConnection();
        const sql = `SELECT i.iid, i.itemNum, i.itemName, i.itemAmount FROM item AS i`;
        
        conn.query(sql, function(err, rows, fields) {
            if (err)
                console.log(err);
            else
                callback(rows);
        });
        conn.end();
    },

    getTanks:  function(group, callback) {
        const conn = this.getConnection();
        let offset = (group - 1) * 10;
        const sql = `select * from tank limit ${offset}, 10`;   // limit offset, 갯수

        conn.query(sql, function(err, rows, fields) {
            if (err)
                console.log(err);
            else
                callback(rows);
        });
        conn.end();
    },
    getTankSeupData: function(callback) {
        const conn = this.getConnection();
        const sql = `select tsId, date_format(tsTime, '%Y-%m-%d %T') as tsTime, tsPerson, tsTank from tankSetup order by tsid desc limit 1`;

        conn.query(sql, function(err, rows, fields) {
            if (err)
                console.log(err);
            else {
                callback(rows);
            }
        });
        conn.end();
    },
    addTankSetupData: function(params, callback) {
        const conn = this.getConnection();
        const sql = `insert into tankSetup(tsPerson, tsTank) values (?, ?)`;
        conn.query(sql, params, function(err, result) {
            if (err)
                console.log(err);
            else {
                //console.log('addTankSetupData(),', result);
                callback();
            }
        });
        conn.end();
    },
    getTankSenseData: function(tankNo, callback) {
        const conn = this.getConnection();
        const sql = `select * from (select stemp, sph, date_format(stime, '%Y-%m-%d %T') as stime \
            from senseTable where stank=? order by sid desc limit 10) as subview order by stime`;

        conn.query(sql, tankNo, function(err, rows, fields) {
            if (err)
                console.log(err);
            else {
                callback(rows);
            }
        });
        conn.end();
    },
    
    

    executeQuery: function(sql, callback) {
        const conn = this.getConnection();
        conn.query(sql, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    },
    executeQueryWithParams: function(sql, params, callback) {
        const conn = this.getConnection();
        conn.query(sql, params, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    }
}