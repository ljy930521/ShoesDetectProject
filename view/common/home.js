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
                <div class="col-12"><h1>Shoes DC</h1></div>
                <div class="col-12"><hr></div>
                <div class="col-12">
                    <img id="home" src="home.gif" width="900" height="350"  class="rounded" alt="Cinque Terre">
                </div>
            </div>  
        </div>
    </div>
</div>
</body>
</html>
    `;
}
