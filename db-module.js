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
    getUserInfo:    function(uid, callback) { // 로그인 하기위해
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
    getConItems: function(callback){
        const conn = this.getConnection();
        const sql = `SELECT i.iid, i.itemNum, i.itemName, i.itemImg FROM item AS i`;
        
        conn.query(sql, function(err, rows, fields) {
            if (err)
                console.log(err);
            else
                callback(rows);
        });
        conn.end();
    },
    getAllItems: function(pageNo, callback) {
        const conn = this.getConnection();
        let offset = (pageNo - 1) * 10;
        const sql = `SELECT i.iid, i.itemNum, i.itemName FROM item AS i WHERE i.isDeleted=0 limit ${offset}, 10`;
        
        conn.query(sql, function(err, rows, fields) {
            if (err)
                console.log(err);
            else
                callback(rows);
        });
        conn.end();
    },    
    getItemInfo:    function(iid, callback) { // 아이템 넘버비교
        const conn = this.getConnection();
        const sql = 'select * from item where iid = ?';   // DATE_FORMAT(createdDate, '%Y-%m-%d %T')

        conn.query(sql, iid, function(err, row, fields) {
            if (err)
                console.log(err);
            else
                callback(row);
        });
        conn.end();
    },
    getItemNumInfo:    function(itemNum, callback) { // 아이템 넘버비교
        const conn = this.getConnection();
        const sql = 'select * from item where itemNum = ?';   // DATE_FORMAT(createdDate, '%Y-%m-%d %T')

        conn.query(sql, itemNum, function(err, row, fields) {
            if (err)
                console.log(err);
            else
                callback(row);
        });
        conn.end();
    },
    getItemCount:  function(callback) {
        const conn = this.getConnection();
        const sql = `select count(*) as \`count\` from item where isDeleted=0`;

        conn.query(sql, function(err, row, fields) {
            if (err)
                console.log(err);
            else
                callback(row);
        });
        conn.end();
    },
    registerItem:    function(params, callback) {
        const conn = this.getConnection();
        const sql = `insert into item(itemNum, itemName, itemImg) values (?, ?, ?)`;

        conn.query(sql, params, function(err, result) {
            if (err)
                console.log(err);
            else {
                callback();
            }
        });
        conn.end();
    },
    updateItem: function(params, callback) {
        const conn = this.getConnection();
        const sql = `update item set itemNum=?, itemName=?, itemImg=? where iid = ?`;

        conn.query(sql, params, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    },
    deleteItem: function(iid, callback) {
        const conn = this.getConnection();
        const sql = `update item set isDeleted=1 where iid = ?`;

        conn.query(sql, iid, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    },
    deleteItemRearrange: function(iid, callback) {
        const conn = this.getConnection();
        const sql = `ALTER TABLE item AUTO_INCREMENT=1 set @COUNT=0 UPDATE item SET item.iid = @COUNT:=@COUNT+1`;

        conn.query(sql, iid, function(err, result) {
            if (err)
                console.log(err);
            else
                callback();
        });
        conn.end();
    },
    getAllExams: function(callback) {
        const conn = this.getConnection();
        const sql = `SELECT e.eid, e.e_uid, e.e_itemName, e.eTime, e.eSmr, e.eDeg, e.eDefRate FROM examine AS e`;
        
        conn.query(sql, function(err, rows, fields) {
            if (err)
                console.log(err);
            else
                callback(rows);
        });
        conn.end();
    },    
    registerExam:    function(params, callback) {
        const conn = this.getConnection();
        const sql = `INSERT INTO examine(e_uid, e_itemName, eSmr, eDeg, eDefRate, eImg) VALUES(?, ?, ?, ?, ?, ?)`;

        conn.query(sql, params, function(err, result) {
            if (err)
                console.log(err);
            else {
                callback();
            }
        });
        conn.end();
    },
    getExamCount:  function(eItemName, callback) {
        const conn = this.getConnection();
        const sql = `select count(*) as \`count\` from examine where e_itemName = ?`;

        conn.query(sql, eItemName, function(err, row, fields) {
            if (err)
                console.log(err);
            else
                callback(row);
        });
        conn.end();
    },
    getBadExamCount:  function(eItemName, callback) {
        const conn = this.getConnection();
        const sql = `select count(*) as \`count\` from examine where e_itemName = ? and eDeg = 'bad'`;

        conn.query(sql, eItemName, function(err, row, fields) {
            if (err)
                console.log(err);
            else
                callback(row);
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