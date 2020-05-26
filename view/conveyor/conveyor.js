const template = require('../common/template');
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
          <input type="radio" class="form-check-input" name="itemChoose" value="${item.itemName}">
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
      <button type="button" class="btn btn-dark" data-dismiss="modal" onclick="displayRadioValue()">Choose</button>
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
    <br>  
       
    <script> 
        function displayRadioValue() { 
            var ele = document.getElementsByName('itemChoose'); 

            for(i = 0; i < ele.length; i++) { 
                if(ele[i].checked)
                {
                  document.getElementById("result").innerHTML
                        = "Selected: "+ele[i].value;
                  document.getElementById("chooseShoes").src
                = "/images/"+ele[i].value+".jpg";
                }
            }
        }
    </script> 
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
          <div class="col-2">
          <br>
          <img id="chooseShoes" src="/images/Shoes Name.jpg" width="100" height="100"  class="rounded" alt="Cinque Terre"><br>
          <div id="result"></div>
          <br>${chooseModal}</div>
          </div>
          <div class="col-10">
          <img id="chooseShoes" src="/images/conveyor.png" width="600" height="200"  class="rounded" alt="Cinque Terre">
          <br>
          <button type="button" class="btn btn-dark">시작</button>
          <button type="button" class="btn btn-dark">중지</button>
          </div>
          <div class="col-12"><hr></div>
          <div class="col-12">
            <table class="table table-condensed table-hover">
                <thead class="thead-light">
                    <tr class="active">
                        <th scope="col">검사ID</th><th scope="col">검사ItemNum</th>
                        <th scope="col">검사시간</th><th scope="col">유사도</th>
                        <th scope="col">불량정도</th><th scope="col">불량률</th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>examine.examId</td><td>examine.examItem</td>
                    <td>examine.examTime</td><td>examine.examSmr</td><td>examine.exmDeg</td>
                    <td>examine.exmDefRate</td>
                  </tr>
                </tbody>
            </table>
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