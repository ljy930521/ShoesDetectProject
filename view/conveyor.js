const template = require('./template');
const header = template.header();
module.exports.conveyor = function (navBar, menuLink, itemObj) {

    let items = '';
    for (item of itemObj) {
        items += `
        <div class="col-6"><img src="/images/${item.itemName}.jpg" width="100" height="100"  class="rounded" alt="Cinque Terre"><br><label class="form-check-label">
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
	<div class="row justify-content-center" style="margin-top: 30px" >
        <div class="col-2">
            ${menuLink}
        </div>
        <div class="col-10">
            <div class="row" style="margin-left: 10px">
                <div class="col-12"><h3>컨베이어 작동</h3></div>
                <div class="col-12"><hr></div>
                <div class="col-4"></div>
                <div class="col-4"><img src="/images/${itemObj[0].itemName}.jpg" width="100" height="100"  class="rounded" alt="Cinque Terre"></div>
                <div class="col-4"> <br><br><br><br><br> <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                신발선택
              </button><div class="modal fade" id="myModal">
              <div class="modal-dialog">
                <div class="modal-content">
                
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <h4 class="modal-title">신발종류</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  
                  <!-- Modal body -->
                  <div class="modal-body">
                  <div class="form-check-inline">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="optradio">신발1
                    </label>
                    </div>
                    <div class="form-check-inline">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="optradio">신발2
                    </label>
                    </div>
                    <div class="form-check-inline disabled">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="optradio">신발3
                    </label>
                    </div>
                    
                  </div>
                  
                  <!-- Modal footer -->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Choose</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
                  
                </div>
              </div>
            </div></div>
                <div class="col-12"><hr></div>
                <div class="col-5"></div>
                <div class="col-3"><button type="button" class="btn btn-dark">시작</button>
                <button type="button" class="btn btn-dark">중지</button></div>
                <div class="col-4"></div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}