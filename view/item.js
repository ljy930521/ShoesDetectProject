const template = require('./template');
const header = template.header();
module.exports.item = function(navBar, menuLink, itemObj) {

    let items = '';
    for (item of itemObj) {
        items += `
        <div class="col-6"><img src="/images/${item.itemName}.jpg" width="280" height="280"  class="rounded" alt="Cinque Terre"><br><label class="form-check-label">
        <input type="checkbox" class="form-check-input" value="">
      </label><br>${item.iid}. ${item.itemName}<br>SKU : ${item.itemNum}</div>
            `;
    }
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
                <div class="col-12"><h3>신발 리스트</h3></div>
                <div class="col-12"><hr></div>
                
                ${items}
                
            </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}