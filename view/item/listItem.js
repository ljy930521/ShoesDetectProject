const template = require('../common/template');
const header = template.header();

module.exports.listItem = function(navBar, menuLink, itemObj, totalPage, pageNo) {
    let items = '';
    
    for (item of itemObj) {
        items += `
            <tr>
                <td class="align-middle">${item.iid}</td>
                <td class="align-middle">
                    <img src="/images/${item.itemName}.jpg" width="70" height="70"  class="rounded" alt="Cinque Terre"></td>
                <td class="align-middle">${item.itemName}</td>
                <td class="align-middle">${item.itemNum}</td>
                <td class="align-middle"><a href="/item/update/iid/${item.iid}"><i class="fas fa-edit"></i></a></td>
                <td class="align-middle">
                    <a href="/item/delete/iid/${item.iid}"><i class="fas fa-trash-alt"></i></td>
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
            pages += `<li class="page-item"><a class="page-link" href="/item/list/page/${page}">${page}</a></li>`;
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
        <div class="row" style="text-align: center;">
            <div class="col-2">
                ${menuLink}
            </div>
            <div class="col-10">
                <div class="row" style="margin-left: 10px">
                    <div class="col-12"><h3>상품 조회</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-12">
                        <table class="table table-condensed table-hover">
                            <thead class="thead-light">
                                <tr class="active">
                                    <th scope="col">No</th><th scope="col">Image</th>
                                    <th scope="col">Name</th><th scope="col">Number</th>
                                    <th scope="col">Update</th><th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${items}
                            </tbody>
                        </table>
                        <ul class="pagination justify-content-center">
                            ${pages}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}