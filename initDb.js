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
const createShoesListSql = `
CREATE TABLE IF NOT EXISTS tank (
    tid INT NOT NULL PRIMARY KEY,
    operating INT DEFAULT 0,
    fish VARCHAR(20) NOT NULL,
    temp FLOAT NOT NULL,
    ph FLOAT NOT NULL,
    oxygen FLOAT NOT NULL
    );
`;
// const createTankSql = `
//     CREATE TABLE IF NOT EXISTS tank (
//         tid INT NOT NULL PRIMARY KEY,
//         operating INT DEFAULT 0,
//         fish VARCHAR(20) NOT NULL,
//         temp FLOAT NOT NULL,
//         ph FLOAT NOT NULL,
//         oxygen FLOAT NOT NULL
//     );
// `;
// const createTankSetupSql = `
//     CREATE TABLE IF NOT EXISTS tankSetup (
//         tsId INT PRIMARY KEY AUTO_INCREMENT,
//         tsTime DATETIME DEFAULT CURRENT_TIMESTAMP,
//         tsPerson VARCHAR(12) NOT NULL,
//         tsTank JSON NOT NULL
//     );
// `;
// const createSenseTableSql = `
//     CREATE TABLE IF NOT EXISTS senseTable (
//         sid INT PRIMARY KEY AUTO_INCREMENT,
//         stank INT NOT NULL,
//         stemp FLOAT NOT NULL,
//         sph FLOAT NOT NULL,
//         stime DATETIME DEFAULT CURRENT_TIMESTAMP
//     );
// `;

const insertDeptSql = "INSERT INTO dept VALUES(?, ?)";
const insertUserSql = `INSERT INTO user(uid, password, name, deptId, tel) VALUES('admin', '1234', '관리자', 101, '010-2345-6789')`;
const insertTankSql = `INSERT INTO tank VALUES (?, ?, ?, ?, ?, ?)`;
const insertTankSetupSql = `INSERT INTO tankSetup(tsPerson, tsTank) VALUES(?, ?)`;

const deptData = [
    [101, '경영지원팀'],
    [102, '영업팀'],
    [103, '생산팀'],
    [104, '연구개발팀']
];
const tankData = [
    [1, 1, '장어 치어', 29.4, 5.6, 0.21],
    [2, 1, '장어 소', 29.4, 5.6, 0.21],
    [3, 1, '장어 소', 29.4, 6.3, 0.21],
    [4, 1, '장어 중', 29.4, 5.6, 0.21],
    [5, 1, '장어 중', 29.4, 5.4, 0.21],
    [6, 1, '장어 중', 29.4, 5.6, 0.21],
    [7, 1, '장어 대', 30.9, 5.5, 0.21],
    [8, 1, '장어 대', 29.4, 5.6, 0.21],
    [9, 1, '장어 대', 30.1, 5.6, 0.21],
    [10, 0, ' ', 0.0, 0.0, 0.0]
];

/* dm.executeQuery(createDeptSql, function() {
    console.log("Dept Table is created");
    for (let dept of deptData) {
        dm.executeQueryWithParams(insertDeptSql, dept, function() {
            console.log("dept record inserted");
        });
    }
});*/

/* dm.executeQuery(createUserSql, function() {
    console.log("User Table is created");
    dm.executeQuery(insertUserSql, function() {
        console.log("user record inserted");
    });
}); */

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

let senseData = [];
for (let i=0; i<15; i++) {
    for (let k=1; k<=10; k++) {
        let record = [];
        record.push(k);
        record.push(Math.random().toFixed(1)*3.0 + 28.0);
        record.push(Math.random().toFixed(1)*2.0 + 4.5);
        let hour = (i < 10) ? `0${i}` : `${i}`;
        record.push(`2020-05-15 ${hour}:00:00`);
        senseData.push(record);
    }
}
const insertSenseTableSql = `INSERT INTO senseTable(stank, stemp, sph, stime) VALUES (?, ?, ?, ?)`;
dm.executeQuery(createSenseTableSql, function() {
    console.log("Sense Table is created");
    for (let item of senseData) {
        dm.executeQueryWithParams(insertSenseTableSql, item, function() {
            process.stdout.write("+ ");
        });
    }
});