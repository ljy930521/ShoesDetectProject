const dm = require('./db-module.js');

const createDeptSql = `
    CREATE TABLE IF NOT EXISTS dept (
        did INTEGER NOT NULL PRIMARY KEY,
        name VARCHAR(20) NOT NULL)
`;
const createUserSql = `
    CREATE TABLE IF NOT EXISTS user (
        uid VARCHAR(12) PRIMARY KEY,
        password VARCHAR(80) NOT NULL,
        name VARCHAR(20) NOT NULL,
        deptId INTEGER NOT NULL,
        tel VARCHAR(20),
        isDeleted INT DEFAULT 0,
        regDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(deptId) REFERENCES dept(did))
`;
const createItemSql = `
    CREATE TABLE IF NOT EXISTS item (
        iid INTEGER AUTO_INCREMENT,
        itemNum varchar(45) NOT NULL,
        itemName varchar(50) NOT NULL,
        itemImg varchar(45) NOT NULL,
        isDeleted INTEGER DEFAULT 0,
        PRIMARY KEY (iid)
    )
`;
const createExamineSql = `
    CREATE TABLE IF NOT EXISTS examine (
        eid INTEGER NOT NULL AUTO_INCREMENT,
        e_uid varchar(12) NOT NULL,
        e_itemName varchar(50) NOT NULL,
        eTime datetime DEFAULT CURRENT_TIMESTAMP,
        eSmr float NOT NULL,
        eDeg varchar(30) NOT NULL,
        eDefRate float NOT NULL,
        eImg varchar(30) DEFAULT NULL,
        PRIMARY KEY (eid)
    ) 
`;
const createActuatorSql = `
    CREATE TABLE IF NOT EXISTS actuator (
        aid INTEGER NOT NULL AUTO_INCREMENT,
        aStep INTEGER NOT NULL DEFAULT 0,
        aTime datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (aid)
    )
`;
const insertDeptSql = "INSERT INTO dept VALUES(?, ?)";
const insertUserSql = `INSERT INTO user(uid, password, name, deptId, tel) VALUES(?, ?, ?, ?, ?)`;
const insertExamineSql = `INSERT INTO examine(eid, e_uid, e_itemName, eSmr, eDeg, eDefRate, eImg) VALUES(?, ?, ?, ?, ?, ?, ?)`;
const insertItemSql = `INSERT INTO item(itemNum, itemName, itemImg) VALUES(?, ?, ?)`;
const userData = ['admin', '1234', '관리자', 101, '010-3750-4572']
const deptData = [
    [101, '경영지원팀'],
    [102, '디자인팀'],
    [103, '생산팀'],
    [104, '시설팀'],
    [105, '개발팀']
];
const examData = [
    [1, '관리자', 'Sacai x LDWaffle VB', 96.6, 'perfect', 0, 'perfect.jpg']
];
const itemData = [
    ['483513W06E37070', 'TRIPLE S TRAINERS YG', 'TRIPLE S TRAINERS YG.jpg'],
    ['AA3834 101', 'Jordan 1 Retro High Off-White Chicago', 'Jordan 1 Retro High Off-White Chicago.jpg'],
    ['bv0073-400', 'Sacai x LDWaffle VB', 'Sacai x LDWaffle VB.jpg']
];
// Table에 입력하는 순서에 주의
dm.executeQuery(createDeptSql, function () {
    for (let dept of deptData) {
        dm.executeQueryWithParams(insertDeptSql, dept, function () {

        });
    }
    console.log("dept inserted");
});
dm.executeQuery(createUserSql, function () {
    console.log("User Table is created");
    for (let user of userData) {
        dm.executeQuery(insertUserSql, user, function () {
            console.log("user inserted");
        });
    }
});
dm.executeQuery(createExamineSql, function () {
    for (let exam of examData) {
        dm.executeQueryWithParams(insertExamineSql, exam, function () {

        });
    }
    console.log("exam inserted");
});
dm.executeQuery(createItemSql, function () {
    for (let item of itemData) {
        dm.executeQueryWithParams(insertItemSql, item, function () {

        });
    }
    console.log("item inserted");
});
dm.executeQuery(createActuatorSql, function () {
    console.log("actuator inserted");
});
/* dm.executeQuery(createTankSql, function() {
    console.log("Tank Table is created");
    for (let tank of tankData) {
        dm.executeQueryWithParams(insertTankSql, tank, function() {
            console.log("tank record inserted");
        });
    }
}); */

/*
const tankSetupJson = `[
    {"id": 1, "ph": 5.1, "food": 120, "oper": 1, "temp": 29.1}, 
    {"id": 2, "ph": 5.2, "food": 140, "oper": 1, "temp": 29.2}, 
    {"id": 3, "ph": 5.3, "food": 160, "oper": 1, "temp": 29.3}, 
    {"id": 4, "ph": 5.4, "food": 180, "oper": 1, "temp": 29.4}, 
    {"id": 5, "ph": 5.5, "food": 200, "oper": 1, "temp": 29.5}, 
    {"id": 6, "ph": 5.6, "food": 220, "oper": 1, "temp": 29.6}, 
    {"id": 7, "ph": 5.7, "food": 240, "oper": 1, "temp": 29.7}, 
    {"id": 8, "ph": 5.8, "food": 260, "oper": 1, "temp": 29.8}, 
    {"id": 9, "ph": 5.9, "food": 280, "oper": 1, "temp": 29.9}, 
    {"id": 10, "ph": 6, "food": 300, "oper": 1, "temp": 30}
]`;
dm.executeQuery(createTankSetupSql, function() {
    console.log("TankSetup Table is created");
    
    let params = ['admin', tankSetupJson];
    dm.executeQueryWithParams(insertTankSetupSql, params, function() {
        dm.getTankSeupData(function(tsList) {
            for (let tsData of tsList) {
                console.log(tsData.tsId, tsData.tsTime, tsData.tsPerson);
                console.log(JSON.parse(tsData.tsTank));
            }
        });
    });
});
*/

// let senseData = [];
// for (let i=0; i<15; i++) {
//     for (let k=1; k<=10; k++) {
//         let record = [];
//         record.push(k);
//         record.push(Math.random().toFixed(1)*3.0 + 28.0);
//         record.push(Math.random().toFixed(1)*2.0 + 4.5);
//         let hour = (i < 10) ? `0${i}` : `${i}`;
//         record.push(`2020-05-15 ${hour}:00:00`);
//         senseData.push(record);
//     }
// }
// const insertSenseTableSql = `INSERT INTO senseTable(stank, stemp, sph, stime) VALUES (?, ?, ?, ?)`;
// dm.executeQuery(createSenseTableSql, function() {
//     console.log("Sense Table is created");
//     for (let item of senseData) {
//         dm.executeQueryWithParams(insertSenseTableSql, item, function() {
//             process.stdout.write("+ ");
//         });
//     }
// });