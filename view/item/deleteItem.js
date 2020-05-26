const template = require('../common/template');
const header = template.header();

module.exports.deleteItem = function(navBar, menuLink, iid) {
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
                    <div class="col-12"><h3>Product Delete</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-2"></div>
                    <div class="col-4">
                    <form action="/item/delete" class="form-horizontal" method="POST">
                        <input type="hidden" name="iid" value="${iid}"><br>
                        <p style="text-align: center;">${iid} 상품을 삭제하시겠습니까?</p><br>
                        <p style="text-align: center;"><input class="btn btn-primary" type="submit" value="확인">&nbsp;&nbsp;&nbsp;
                            <button class="btn btn-secondary" type="reset" onclick="location.href='/item/list/page/1'">취소</button></p>
                    </form>
                    </div>
                    <div class="col-6"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}