const template = require('./template');
const header = template.header();
module.exports.conveyor = function (navBar, menuLink, itemObj) {

let items = '';
for (item of itemObj) {
items += `
<div class="col-4"><img src="/images/${item.itemName}.jpg" width="100" height="100" class="rounded"
    alt="Cinque Terre"></div>
  <div class="col-4">
      <br>${item.itemName}
  </div>
  <div class="col-4"><div class="form-check">
        <label class="form-check-label">
          <input type="radio" class="form-check-input" name="itemChoose" value="${item.iid}">
        </label>
      </div></div>
`;
}

let chooseModal = `
<button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#myModal">
Open modal
</button>

<!-- The Modal -->
<div class="modal fade" id="myModal">
<div class="modal-dialog modal-lg">
  <div class="modal-content">
  
    <!-- Modal Header -->
    <div class="modal-header">
      <h4 class="modal-title">선택해주세요.</h4>
      <button type="button" class="close" data-dismiss="modal">&times;</button>
    </div>
    
    <!-- Modal body -->
    <div class="modal-body">
    <div class="container">
     <div class="row" style="text-align: center;">
      ${items}
    </div>
    </div>
    </div>
    
    <!-- Modal footer -->
    <div class="modal-footer">
      <button type="button" class="btn btn-dark" data-dismiss="modal">Choose</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
    
  </div>
</div>`


return `
<!DOCTYPE html>
<html lang="ko">

<head>
  ${header}
</head>

<body>
  <div class="container">
    ${navBar}
    <div class="row " style="margin-top: 30px">
      <div class="col-2">
        ${menuLink}
      </div>
      <div class="col-10">
        <div class="row" style="text-align: center;">
          <div class="col-2"><h3>신발선택</h3></div>
          <div class="col-10"><h3>컨베이어 작동</h3></div>
          <div class="col-12"><hr></div>
          <div class="col-2"><img src="/images/Shoes.jpg" width="100" height="100"  class="rounded" alt="Cinque Terre"><br>${chooseModal}</div>
          <div class="col-10"></div>

        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
</body>

</html>
`;
}