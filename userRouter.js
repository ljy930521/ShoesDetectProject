const express = require('express');
const dbModule = require('./db-module');
const alert = require('./view/alertMsg');
const template = require('./view/template');
const wm = require('./weather-module');

const router = express.Router();
router.get('/list/page/:page', function(req, res) {        // 로그인만 하면 누구나 할 수 있음.
    if (req.session.userId === undefined) {
        let html = alert.alertMsg(`시스템을 사용하려면 먼저 로그인하세요.`, '/');
        res.send(html);
    } else {
        let pageNo = parseInt(req.params.page);
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(3);
            dbModule.getUsers(pageNo, function(users) {
                dbModule.getUserCount(function(result) {        // 페이지 지원
                    let totalPage = Math.ceil(result[0].count / 10);
                    let view = require('./view/listUser');
                    let html = view.listUser(navBar, menuLink, users, totalPage, pageNo);
                    //console.log(rows);
                    res.send(html);
                });
            });
        });
    }
});
router.get('/register', function(req, res) {    // 관리자로 로그인해야 할 수 있음.
    if (req.session.userId === undefined) {
        let html = alert.alertMsg(`시스템을 사용하려면 먼저 로그인하세요.`, '/');
        res.send(html);
    } else if (req.session.userId != 'admin') {
        let html = alert.alertMsg(`사용자를 등록할 권한이 없습니다.`, '/user/list/page/1');
        res.send(html);
    } else {
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(3);
            dbModule.getAllDepts(function(rows) {
                let view = require('./view/registerUser');
                let html = view.registerUser(navBar, menuLink, rows);
                //console.log(rows);
                res.send(html);
            });
        });
    }
});
router.post('/register', function(req, res) {
    let uid = req.body.uid;
    let pswd = req.body.pswd;
    let pswd2 = req.body.pswd2;
    let name = req.body.name;
    let deptId = parseInt(req.body.dept);
    let tel = req.body.tel;
    //console.log(uid, pswd, pswd2, deptId, tel);
    dbModule.getUserInfo(uid, function(row) {
        //console.log(row);
        if (row[0] === undefined) {
            if (pswd.length < 4) {
                let html = alert.alertMsg('패스워드 길이가 너무 작습니다.', '/user/register');
                res.send(html);
            } else if (pswd === pswd2) {
                let params = [uid, pswd, name, deptId, tel];
                dbModule.registerUser(params, function() {
                    // 페이지 지원
                    dbModule.getUserCount(function(count) {
                        let pageNo = Math.ceil(count[0].count/10);
                        res.redirect(`/user/list/page/${pageNo}`);
                    });
                });
            } else {
                let html = alert.alertMsg('패스워드가 일치하지 않습니다.', '/user/register');
                res.send(html);
            }
        } else {
            let html = alert.alertMsg(`${uid} 아이디가 중복입니다.`, '/user/register');
            res.send(html);
        }
    });
});
router.get('/update/uid/:uid', function(req, res) {     // 본인 것만 수정할 수 있음.
    let uid = req.params.uid;
    if (req.session.userId === undefined) {
        let html = alert.alertMsg(`시스템을 사용하려면 먼저 로그인하세요.`, '/');
        res.send(html);
    } else if (uid !== req.session.userId) {
        let html = alert.alertMsg(`본인 것만 수정할 수 있습니다.`, '/user/list/page/1');
        res.send(html);
    } else {
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(3);
            dbModule.getAllDepts(function(depts) {
                dbModule.getUserInfo(uid, function(user) {
                    //console.log(user[0]);
                    let view = require('./view/updateUser');
                    let html = view.updateUser(navBar, menuLink, depts, user[0]);
                    res.send(html);
                });
            });
        });
    }
});
router.post('/update', function(req, res) {
    let uid = req.body.uid;
    let oldPswd = req.body.oldPswd;
    let changePswd = req.body.changePswd;
    let pswd = req.body.pswd;
    let pswd2 = req.body.pswd2;
    let name = req.body.name;
    let deptId = parseInt(req.body.dept);
    let tel = req.body.tel;

    dbModule.getUserInfo(uid, function(user) {
        if (changePswd === undefined) {         // 패스워드 변경 체크박스가 uncheck 되었을 때
            let params = [user[0].password, name, deptId, tel, uid];
            dbModule.updateUser(params, function() {
                res.redirect(`/user/list/page/1`);
            });
        } else {    // check 되었을 때
            if (oldPswd !== user.password) {    // 현재 패스워드가 틀렸을 때
                let html = alert.alertMsg(`현재 패스워드가 틀립니다.`, `/user/update/uid/${uid}`);
                res.send(html);
            } else if (pswd.length < 4) {        // 입력한 패스워드의 길이가 4 미만일 때
                let html = alert.alertMsg(`신규 입력한 패스워드의 길이가 작습니다.`, `/user/update/uid/${uid}`);
                res.send(html);
            } else if (pswd !== pswd2) {        // 입력한 패스워드가 다를 때
                let html = alert.alertMsg(`신규 입력한 패스워드가 다릅니다.`, `/user/update/uid/${uid}`);
                res.send(html);
            } else {            // 모든 조건을 만족시켰을 때
                let params = [pswd, name, deptId, tel, uid];
                dbModule.updateUser(params, function() {
                    res.redirect(`/user/list/page/1`);
                });
            }
        }
    });
});
router.get('/delete/uid/:uid', function(req, res) {     // 관리자로 로그인해야 할 수 있음.
    if (req.session.userId === undefined) {
        let html = alert.alertMsg(`시스템을 사용하려면 먼저 로그인하세요.`, '/');
        res.send(html);
    } else if (req.session.userId !== 'admin') {
        let html = alert.alertMsg(`사용자를 삭제할 권한이 없습니다.`, '/user/list/page/1');
        res.send(html);
    } else {
        let uid = req.params.uid;
        if (uid === 'admin') {
            let html = alert.alertMsg(`사용자를 삭제할 권한이 없습니다.`, '/user/list/page/1');
            res.send(html);
        } else {
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);
                let menuLink = template.menuLink(3);
                let view = require('./view/deleteUser');
                let html = view.deleteUser(navBar, menuLink, uid);  
                res.send(html);
            });
        }
    }
});
router.post('/delete', function(req, res) {
    let uid = req.body.uid;
    dbModule.deleteUser(uid, function() {
        res.redirect(`/user/list/page/1`);
    });
});
router.post('/login', function(req, res) {
    let uid = req.body.uid;
    let pswd = req.body.pswd;
    dbModule.getUserInfo(uid, function(user) {
        //console.log(user[0]);
        if (user === undefined) {
            let html = alert.alertMsg('아이디가 없습니다.', '/');
            res.send(html);
        } else if (pswd !== user[0].password) {
            let html = alert.alertMsg('패스워드가 일치하지 않습니다.', '/');
            res.send(html);
        } else {                // Login 성공
            //console.log(`${uid} login 성공`);
            req.session.userId = uid;
            req.session.userName = user[0].name;
            //let html = alert.alertMsg(`${user[0].name} 님 환영합니다.`, '/home');
            //res.send(html);
            res.redirect('/home');
        }
    });
});
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');    
});

module.exports = router;