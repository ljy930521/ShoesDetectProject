const template = require('../common/template');
const header = template.header();

module.exports.listUser = function(navBar, menuLink, userObj, totalPage, pageNo) {
    let users = '';
    for (user of userObj) {
        users += `
            <tr>
                <td>${user.uid}</td><td>${user.name}</td>
                <td>${user.deptName}</td><td>${user.tel}</td><td>${user.ts}</td>
                <td><a href="/user/update/uid/${user.uid}"><i class="fas fa-edit"></i></a>&nbsp;&nbsp;
                    <a href="/user/delete/uid/${user.uid}"><i class="fas fa-trash-alt"></i></td>
            </tr>`;
    }
    // 페이지 지원
    let pages = `<li class="page-item disabled">
                    <a class="page-link active" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span></a>
                </li>`;
    for (let page=1; page <= totalPage; page++) {
        if (page == pageNo)
            pages += `<li class="page-item active" aria-current="page">
                        <span class="page-link">
                            ${page}<span class="sr-only">(current)</span>
                        </span>
                    </li>`;
        else
            pages += `<li class="page-item"><a class="page-link" href="/user/list/page/${page}">${page}</a></li>`;
    }
    pages += `<li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span></a>
            </li>`;

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
                    <div class="col-12"><h3>사용자 조회</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-11">
                        <table class="table table-condensed table-hover">
                            <thead class="thead-light">
                                <tr class="active">
                                    <th scope="col">아이디</th><th scope="col">이름</th>
                                    <th scope="col">부서</th><th scope="col">전화번호</th>
                                    <th scope="col">등록일자</th><th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${users}
                            </tbody>
                        </table>
                        <ul class="pagination justify-content-center">
                            ${pages}
                        </ul>
                    </div>
                    <div class="col-1"></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}