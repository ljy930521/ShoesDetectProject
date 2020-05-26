const template = require('./template');
const header = template.header();


// module.exports.home = function(navBar, menuLink, sensor, actuator) {
module.exports.home = function(navBar, menuLink) {

    return `
<!DOCTYPE html>
<html lang="ko">
<head>
	${header}
</head>
<body>
<div class="container">
    ${navBar}
	<div class="row" style="margin-top: 30px">
        <div class="col-2">
            ${menuLink}
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
                <div class="col-12"><h3>신발공장 상태</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-11">
                    <h4>Shoes List</h4>
                    <table class="table table-condensed table-hover">
                        <thead class="thead-light">
                        <tr class="active">
                            <th>항목</th><th>범위</th>
                            <th style="text-align: center;">값</th>
                            <th>측정자</th>
                        </tr>
                        </thead>
                        <tbody>
                       
                        </tbody>
                    </table>
                </div>
                <div class="col-1"></div><br>
                <div class="col-11">
                    <h4>컨베이어 가동</h4>
                    <table class="table table-condensed table-hover">
                        <thead class="thead-light">
                        <tr class="active">
                            <th scope="col">항목</th><th>범위</th>
                            <th scope="col" style="text-align: center;">값</th>
                            <th scope="col">조작자</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                </div>
                <div class="col-1"></div><br>
                </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}
