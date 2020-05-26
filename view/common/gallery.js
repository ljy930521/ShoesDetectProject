const template = require('./template');
const header = template.header();

module.exports.gallery = function(navBar, menuLink, result) {
    let row1 = '';
    for (let i=1; i<=8; i++) {         
        let number = (i < 10) ? `0${i}`: `${i}`;
        row1 += `<td><img class="img-thumbnail" src="/photo/photo${number}.jpg" width="80"></td>`;
    }
    let row2 = '';
    for (let i=9; i<=16; i++) {         
        let number = (i < 10) ? `0${i}`: `${i}`;
        row2 += `<td><img class="img-thumbnail" src="/photo/photo${number}.jpg" width="80"></td>`;
    }
    let indicator = `<ol class="carousel-indicators">`;
    let items = '';
    for (let i=1; i<=16; i++) {
        indicator += (i == 1) ? `<li data-target="#carouselControl" data-slide-to="${i-1}" class="active"></li>`: `<li data-target="#carouselControl" data-slide-to="${i-1}"></li>`;
        let number = (i < 10) ? `0${i}`: `${i}`;
        items += (i == 1) ? `<div class="carousel-item active">`: `<div class="carousel-item">`;
        items += `<img src="/photo/photo${number}.jpg" class="d-block w-100" alt="라즈베리파이와 아두이노에서 동작하는 사진">
                </div>`;
    }
    indicator += '</ol>';

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
                    <div class="col-12"><h3>갤러리</h3></div>
                    <div class="col-12"><hr></div>
                    <div class="col-12">
                        <div id="carouselControl" class="carousel slide" data-ride="carousel">
                            ${indicator}
                            <div class="carousel-inner">
                                ${items}
                            </div>
                            <a class="carousel-control-prev" href="#carouselControl" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselControl" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div><br>
                        <table class="table table-condensed">
                            <tr>
                                ${row1}
                            </tr>
                            <tr>
                                ${row2}
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}