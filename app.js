const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('express-favicon');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const alert = require('./view/common/alertMsg');
const template = require('./view/common/template');
const wm = require('./weather-module');
const dbModule = require('./db-module');
const sm = require('./serial-module');
const ps = require('./python-shell');

const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
const userRouter = require('./userRouter');
const itemRouter = require('./itemRouter');

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect jQuery
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/js'));
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function () {}
    })
}));
app.use('/user', userRouter);

app.get('/home', function (req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        // dbModule.getCurrentSensor(function(sensor) {
        //     dbModule.getCurrentActuator(function(actuator) {
        wm.getWeather(function (weather) {
            let navBar = template.navBar(true, weather, req.session.userName);
            let menuLink = template.menuLink(template.DUMMY);
            let view = require('./view/common/home');
            let html = view.home(navBar, menuLink);
            // let html = view.home(navBar, menuLink, sensor, actuator);
            res.send(html);
        });
        //     });
        // });
    }
});
app.use('/item', itemRouter);
app.get('/conveyor', function (req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let uid = req.session.userId;
        try {
            sm.readSensor(function (result) {
                let restart = result.end;
                console.log(restart);
                dbModule.insertStep(restart, function(){
                    dbModule.getCurrentStep(function(step){
                        dbModule.getConItems(function (conItem) {
                            dbModule.getAllExams(function (examTable) {
                                wm.getWeather(function (weather) {
                                    let navBar = template.navBar(false, weather, req.session.userName);
                                    let menuLink = template.menuLink(template.CONVEYOR_MENU);
                                    let view = require('./view/conveyor/conveyor');
                                    let html = view.conveyor(navBar, menuLink, conItem, examTable, step);
                                    // console.log(step);
                                    // let s= step[0].aStep;
                                    // console.log(s);
                                    res.send(html);
                                })
                            });
                        });
                    })
                })
            });
        } catch (ex1) {
            console.log(ex1);
        }
    }
});
app.post('/conveyor', function (req, res) {
    let conStart = parseInt(req.body.start); //1
    let eItemName = req.body.itemChoose;
    let eUid = req.session.userId;
    let end = parseInt(req.body.aStep);
    console.log("end:",end);

    let actuator = new Object();
    actuator.start = conStart;
    let jsonData = JSON.stringify(actuator);

    if (eItemName !== undefined && conStart == 1) //시작버튼 누를때 시작
    {

        sm.writeActuator(jsonData, function () {
            setTimeout(function () {

                try {
                    res.redirect('/conveyor'); // home 화면으로 보내기
                } catch (ex) {
                    console.log(ex);
                }
            }, 10000);
        });
    } else if (end == 1) {//컨베이어 1 작동 후
        // ps.pythonRun(function(exam){//python start!
        //     let eSmr = exam[0];
        //     let eDeg = exam[1];
        //     let eImg = exam[1]+'.jpg';
        //     dbModule.getExamCount(eItemName, function(count){
        //         dbModule.getBadExamCount(eItemName, function(bads)
        //         {
        //             if(eDeg == 'bad')
        //             {
        //                 let eDefRate = (bads[0].count+1)/(count[0].count+1)*100;
        //                 let params = [eUid, eItemName, eSmr, eDeg, eDefRate, eImg];
        //                 dbModule.registerExam(params, function(){//Insert into examine 
        //                     res.redirect(`/conveyor`);
        //                 });
        //             }
        //             else
        //             {
        //                 let eDefRate = bads[0].count/(count[0].count+1)*100;
        //                 let params = [eUid, eItemName, eSmr, eDeg, eDefRate, eImg];
        //                 dbModule.registerExam(params, function(){
        //                     res.redirect(`/conveyor`);
        //                 });
        //             }
        //         });
        //     });
        // });
    } else if (conStart == 0) {//중지버튼누를때
        res.redirect(`/conveyor`);
    } else {
        let html = alert.alertMsg('검사 할 상품을 선택해주세요.', '/conveyor');
        res.send(html);
    }
});
// app.get('/sensor', function(req, res) {
//     if (req.session.userId === undefined) {
//         let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
//         res.send(html);
//     } else {
//         let uid = req.session.userId;
//         // Arduino 측정값 구하기
//         try {
//             sm.readSensor(function(sensor) {
//                 let temp = sensor.temperature;
//                 let humid = sensor.humidity;
//                 let cds = sensor.cds;
//                 let dist = sensor.distance;
//                 dist = dist.toFixed(1);
//                 // DB에 등록하기
//                 dbModule.insertSensor(temp, humid, cds, dist, uid, function() {
//                     // 화면에 보여주기
//                     dbModule.getCurrentSensor(function(sensor) {
//                         wm.getWeather(function(weather) {
//                             let navBar = template.navBar(false, weather, req.session.userName);
//                             let menuLink = template.menuLink(1);
//                             let view = require('./view/sensor');
//                             let html = view.sensor(navBar, menuLink, sensor);
//                             res.send(html);
//                         });
//                     });
//                 });
//             });
//         } catch (exception) {
//             console.log(exception);
//         }
//     }
// });
// app.get('/actuator', function(req, res) {
//     if (req.session.userId === undefined) {
//         let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
//         res.send(html);
//     } else {
//         dbModule.getCurrentActuator(function(actuator) {
//             wm.getWeather(function(weather) {
//                 let navBar = template.navBar(false, weather, req.session.userName);
//                 let menuLink = template.menuLink(2);
//                 let view = require('./view/actuator');
//                 let html = view.actuator(navBar, menuLink, actuator);
//                 res.send(html);
//             });
//         });
//     }
// });
// app.post('/actuator', function(req, res) {
//     let red = parseInt(req.body.redRange);
//     let green = parseInt(req.body.greenRange);
//     let blue = parseInt(req.body.blueRange);
//     let relay = parseInt(req.body.relay);
//     let reason = req.body.reason;
//     if (reason === '기타') {
//         let detail = req.body.detail;
//         reason += ` - ${detail}`;
//     }
//     let uid = req.session.userId;

//     let actuator = new Object();
//     actuator.red = red;
//     actuator.green = green;
//     actuator.blue = blue;
//     actuator.relay = relay;
//     let jsonData = JSON.stringify(actuator);

//     // DB에 삽입
//     dbModule.insertActuator(red, green, blue, relay, reason, uid, function() {
//         // 액츄에이터 구동
//         sm.writeActuator(jsonData, function() {
//             // home 화면으로 보내기
//             try {
//                 res.redirect('/home');
//             } catch (ex) {
//                 console.log(ex);
//             }  
//         });
//     });
// });
app.get('/gallery', function (req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let view = require('./view/common/gallery');
        wm.getWeather(function (weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(template.GALLERY_MENU);
            wm.weatherObj(function (result) {
                let html = view.gallery(navBar, menuLink, result);
                res.send(html);
            });
        });
    }
});
app.get('/weather', function (req, res) {
    if (req.session.userId === undefined) {
        let html = alert.alertMsg('시스템을 사용하려면 먼저 로그인하세요.', '/');
        res.send(html);
    } else {
        let view = require('./view/common/weather');
        wm.getWeather(function (weather) {
            let navBar = template.navBar(false, weather, req.session.userName);
            let menuLink = template.menuLink(template.DUMMY);
            wm.weatherObj(function (result) {
                let html = view.weather(navBar, menuLink, result);
                res.send(html);
            });
        });
    }
});



app.get('*', function (req, res) {
    res.status(404).send('File not found');
});
app.listen(3000);