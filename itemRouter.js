const express = require('express');
const dbModule = require('./db-module');
const alert = require('./view/common/alertMsg');
const template = require('./view/common/template');
const wm = require('./weather-module');

const router = express.Router();
router.get('/list/page/:page', function (req, res) { // 로그인만 하면 누구나 할 수 있음.
    if (req.session.userId === undefined) {
        let html = alert.alertMsg(`시스템을 사용하려면 먼저 로그인하세요.`, '/');
        res.send(html);
    } else {
        let pageNo = parseInt(req.params.page);
        wm.getWeather(function (weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(template.ITEM_MENU);
            dbModule.getAllItems(pageNo, function (items) {
                dbModule.getItemCount(function (result) { // 페이지 지원
                    let totalPage = Math.ceil(result[0].count / 10);
                    let view = require('./view/item/listItem');
                    let html = view.listItem(navBar, menuLink, items, totalPage, pageNo);
                    //console.log(rows);
                    res.send(html);
                });
            });
        });
    }
});
router.get('/register', function (req, res) { // 관리자로 로그인해야 할 수 있음.
    if (req.session.userId === undefined) {
        let html = alert.alertMsg(`시스템을 사용하려면 먼저 로그인하세요.`, '/');
        res.send(html);
    } else if (req.session.userId != 'admin') {
        let html = alert.alertMsg(`사용자를 등록할 권한이 없습니다.`, '/item/list/page/1');
        res.send(html);
    } else {
        wm.getWeather(function (weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(template.ITEM_MENU);
            // dbModule.getAllDepts(function(rows) {
            let view = require('./view/item/registerItem');
            let html = view.registerItem(navBar, menuLink);
            //console.log(rows);
            res.send(html);
            // });
        });
    }
});
router.post('/register', function (req, res) {

    let itemNum = req.body.itemNum;
    let itemName = req.body.itemName;
    let itemImg = req.body.itemImg;
    dbModule.getItemNumInfo(itemNum, function (row) {
        //console.log(row);
        if (row[0] === undefined) {
            if (itemName.length < 10) {
                let html = alert.alertMsg('신발 이름 길이가 너무 작습니다.', '/item/register');
                res.send(html);
            } else {
                let params = [itemNum, itemName, itemImg];
                dbModule.registerItem(params, function () {
                    // 페이지 지원
                    dbModule.getItemCount(function (count) {
                        let pageNo = Math.ceil(count[0].count / 10);
                        res.redirect(`/item/list/page/${pageNo}`);
                    });
                });
            }
        } else {
            let html = alert.alertMsg(`${itemNum} 상품번호가 중복입니다.`, '/item/register');
            res.send(html);
        }
    });
});
router.get('/update/iid/:iid', function (req, res) { // 본인 것만 수정할 수 있음.
    let iid = parseInt(req.params.iid);
    if (req.session.userId === undefined) {
        let html = alert.alertMsg(`시스템을 사용하려면 먼저 로그인하세요.`, '/');
        res.send(html);
        // } else if (uid !== req.session.userId) {
        //     let html = alert.alertMsg(`본인 것만 수정할 수 있습니다.`, '/item/list/page/1');
        //     res.send(html);
    } else {
        wm.getWeather(function (weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(template.ITEM_MENU);
            // dbModule.getAllDepts(function(depts) {
            dbModule.getItemInfo(iid, function (item) {
                //console.log(user[0]);
                let view = require('./view/item/updateItem');
                let html = view.updateItem(navBar, menuLink, item[0]);
                res.send(html);
            });
            // });
        });
    }
});
router.post('/update', function (req, res) {
    let iid = parseInt(req.body.iid);
    let itemNum = req.body.NewItemNum;
    let itemName = req.body.NewItemName;
    let itemImg = req.body.NewItemImg;
    console.log(req.body.NewItemNum);

    dbModule.getItemNumInfo(itemNum, function (row) {
        if (itemName.length < 10) { // 입력한 패스워드의 길이가 4 미만일 때
            let html = alert.alertMsg(`신규 입력한 상품이름의 길이가 작습니다.`, `/item/update/iid/${iid}`);
            res.send(html);
        } else if (row[0] !== undefined) { // 입력한 패스워드가 다를 때
            let html = alert.alertMsg(`이미 있는 상품번호입니다.`, `/item/update/iid/${iid}`);
            res.send(html);
        } else { // 모든 조건을 만족시켰을 때
            let params = [itemNum, itemName, itemImg, iid];
            dbModule.updateItem(params, function () {
                res.redirect(`/item/list/page/1`);
            });
        }
    });
});
router.get('/delete/iid/:iid', function (req, res) { // 관리자로 로그인해야 할 수 있음.
    let iid = parseInt(req.params.iid);
    if (req.session.userId === undefined) {
        let html = alert.alertMsg(`시스템을 사용하려면 먼저 로그인하세요.`, '/');
        res.send(html);
    } else if (req.session.userId !== 'admin') {
        let html = alert.alertMsg(`상품을 삭제할 권한이 없습니다.`, '/item/list/page/1');
        res.send(html);
    } else {
        wm.getWeather(function (weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(template.ITEM_MENU);
            let view = require('./view/item/deleteItem');
            let html = view.deleteItem(navBar, menuLink, iid);
            res.send(html);
        });
    }
});
router.post('/delete', function (req, res) {
    let iid = parseInt(req.body.iid);
    dbModule.deleteItem(iid, function () {
        res.redirect(`/item/list/page/1`);
    });
});
router.post('/login', function (req, res) {
    let uid = req.body.uid;
    let pswd = req.body.pswd;
    dbModule.getUserInfo(uid, function (user) {
        //console.log(user[0]);
        if (user === undefined) {
            let html = alert.alertMsg('아이디가 없습니다.', '/');
            res.send(html);
        } else if (pswd !== user[0].password) {
            let html = alert.alertMsg('패스워드가 일치하지 않습니다.', '/');
            res.send(html);
        } else { // Login 성공
            //console.log(`${uid} login 성공`);
            req.session.userId = uid;
            req.session.userName = user[0].name;
            //let html = alert.alertMsg(`${user[0].name} 님 환영합니다.`, '/home');
            //res.send(html);
            res.redirect('/home');
        }
    });
});
router.get('/logout', function (req, res) {
    req.session.destroy(function () {
        req.session;
    });
    res.redirect('/');
});

module.exports = router;