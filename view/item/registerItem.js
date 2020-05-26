const template = require('../common/template');
const header = template.header();

module.exports.registerItem = function(navBar, menuLink) {
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
                    <div class="col-12"><h3>Shoes Register</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-2"></div>
                    <div class="col-7">
                        <form action="/item/register" method="POST">
                            <table class="table table-borderless">
                                <tr>
                                    <td><span style="color:blue"></span>상품 번호</td>
                                    <td><input type="text" class="form-control" id="itemNum" name="itemNum"></td>
                                </tr>
                                <tr>
                                    <td><span style="color:blue"></span>상품 이름</td>
                                    <td><input type="text" class="form-control" id="itemName" name="itemName"></td>
                                </tr>
                                <tr>
                                    <td><span style="color:blue"></span>상품 이미지</td>
                                    <td><input type="text" class="form-control" id="itemImg" name="itemImg"></td>
                                </tr>
                                
                                <tr>
                                    <td colspan="2" style="text-align: center;">
                                        <button type="submit" class="btn btn-primary">등록</button>&nbsp;&nbsp;
                                        <button type="reset" class="btn btn-secondary" onclick="location.href='/item/list/page/1'">취소</button>
                                        
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div class="col-3"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}
