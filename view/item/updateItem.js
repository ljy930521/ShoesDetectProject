const template = require('../common/template');
const header = template.header();

module.exports.updateItem = function(navBar, menuLink, item) {

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
                    <div class="col-12"><h3>상품 리스트 수정</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-2"></div>
                    <div class="col-7">
                        <form action="/item/update" method="POST">
                            <input type="hidden" name="iid" value="${item.iid}">
                            <table class="table table-borderless">
                                <tr>
                                    <td>상품 등록 순번</td>
                                    <td>${item.iid}</td>
                                </tr>
                                <tr>
                                    <td>상품 번호</td>
                                    <td><input type="text" class="form-control" name="NewItemNum" value="${item.itemNum}"></td>
                                </tr>
                                <tr>
                                    <td>상품 이름</td>
                                    <td><input type="text" class="form-control" name="NewItemName" value="${item.itemName}"></td>
                                </tr>
                                <tr>
                                    <td>상품 이미지명</td>
                                    <td><input type="text" class="form-control" name="NewItemImg" value="${item.itemImg}"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;">
                                        <button type="submit" class="btn btn-primary">수정</button>&nbsp;&nbsp;
                                        <button type="reset"" class="btn btn-secondary" onclick="location.href='/item/list/page/1'">취소</button>
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
//<img src="greenlogo.png" class="d-inline-block align-top" alt="">&nbsp;&nbsp;&nbsp;