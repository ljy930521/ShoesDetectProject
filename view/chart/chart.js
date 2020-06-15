const template = require('../common/template');
const header = template.header();


module.exports.chart = function(navBar, menuLink, examDatas, examNames) {
  let exams = '';
  for (exam of examDatas) {
      exams += `
        <tr>
          <td>${exam.date} </td><td>${exam.sum} </td><br>
          <td>${exam.count} </td>
        </tr>`;
  }
  let exams2 = 0;
  for (exam of examDatas){
    exams2 += parseInt(exam.eSmr)/parseInt(examDatas.length);
  }
  let examDate = '';
  for (exam of examDatas){
    examDate += `'${exam.date}',`;
  }
  let smrAverage = '';
  for (exam of examDatas){
    smrAverage += `'${exam.sum/exam.count}',`;
  }
  let examName = '';
  for (name of examNames){
    examName += `'${name.name}',`;
  }
  let nameSmrAverage = '';
  for (name of examNames){
    nameSmrAverage += `'${name.sum/name.count}',`;
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
      <div class="row" style="text-align: center;">
        <div class="col-12"><h1><img src="favicon.png">&nbsp;&nbsp;&nbsp;Shoes DC Chart</h1></div>
        <div class="col-12"><hr></div>
        <div class="col-6">
        ${examDatas.length}
        ${examName}
        ${nameSmrAverage}
        <canvas id="bar-chart" width="800" height="500"></canvas>
            <script>
            // Bar chart
            new Chart(document.getElementById("bar-chart"), {
            type: 'bar',
            data: {
                labels: [${examDate}'Date'],
                datasets: [
                {
                    label: "평균 오차율", 
                    backgroundColor: ["#8e5ea2", "#1c86a3", "#3e95cd", "#1ca37d", "#3cba9f", "#abb04a", "#dbb769", "#f0af7a", "#e8c3b9", "#c45850"],
                    data: [${smrAverage}'0']
                }
                ]
            },
            options: {
                legend: { display: false },
                title: {
                display: true, 
                text: '날짜별 유사도 평균'
                }
            }
            });
            </script>
        </div>
        <div class="col-6">
          <canvas id="doughnut-chart" width="800" height="600"></canvas> 
          <script>
            new Chart(document.getElementById("doughnut-chart"), {
            type: 'doughnut',
            data: {
              labels: [${examName}],
              datasets: [
                {
                  label: "유사도",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: [${nameSmrAverage}]
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: '신발 종류별 전체 평균 오차율'
              }
            }
          });
          </script>
        </div>
        <div class="col-6">
          <canvas id="canvas" width="800" height="600"></canvas>
          <script>
            var config = {
              type: 'line',
              data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                  type: 'line',
                  label: 'Perfect(90-100) Cutline',
                  fill: true,
                  data: [100,100,100,100,100,100,100],
                  borderColor: '#3cba9f'
                }, {
                  type: 'line',
                  label: 'Good(75-90) Cutline',
                  fill: true,
                  data: [90,90,90,90,90,90,90],
                  borderColor: '#e8c3b9'
                }, {
                  type: 'line',
                  label: 'BAD(0-70) Cutline',
                  fill: true,
                  data: [70,70,70,70,70,70,70],
                  borderColor: '#c45850'
                }]
              },
              options: {
                responsive: true,
                title: {
                  display: true,
                  text: 'Grid Line Settings'
                },
                scales: {
                  y: {
                    gridLines: {
                      drawBorder: false,
                      color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                      stepSize: 10
                      
                    }
                  }
                }
              }
            };
          window.onload = function() {
          var ctx = document.getElementById('canvas').getContext('2d');
          window.myLine = new Chart(ctx, config);
          };
          </script>
        </div>
        <div class="col-6">
          <canvas id="line-chart" width="800" height="600"></canvas>
          <script>
            new Chart(document.getElementById("line-chart"), {
              type: 'line',
              data: {
              labels: ['5월28일','5월29일','6월02일','6월03일','6월4일'],
              datasets: [{ 
                data: [80.5,0,0,0,0],
                label: "Sacai x LDWaffle VB",
                borderColor: "#3e95cd",
                fill: false
              }, { 
                data: [0,0,87.5,90.5,90.4],
                label: "TRIPLE S TRAINERS YG",
                borderColor: "#8e5ea2",
                fill: false
              }, { 
                data: [0,0,0,94,0],
                label: "Jordan 1 Retro High Off-White Chicago",
                borderColor: "#3cba9f",
                fill: false
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: '신발별 당일 평균 유사도'
              }
            }
          });
          </script>
        </div>        
        <div class="col-12">
          <div class="row">
            <div class="col-sm-4">
              <canvas id="pie-chart1" height="225"></canvas>
              <script>
                new Chart(document.getElementById("pie-chart1"), {
                type: 'pie',
                data: {
                  labels: ["양품(Perfect)", "미세불량품(Good)", "불량품(Bad)"],
                  datasets: [{
                    label: "비율",
                    backgroundColor: ["#3e95cd", "#3cba9f","#f0af7a",/"#e8c3b9","#c45850"/],
                    data: [0.45,0.33,0.22]
                  }]
                },
                options: {
                  title: {
                    display: true,
                    text: 'Sacai x LDWaffle VB'
                    }
                  }
                });
              </script>
            </div>
            <div class="col-sm-4">
              <canvas id="pie-chart2" height="225"></canvas>
              <script>
                new Chart(document.getElementById("pie-chart2"), {
                type: 'pie',
                data: {
                  labels: ["양품(Perfect)", "미세불량품(Good)", "불량품(Bad)"],
                  datasets: [{
                    label: "비율",
                    backgroundColor: ["#3e95cd", "#3cba9f","#f0af7a",/"#e8c3b9","#c45850"/],
                    data: [0.45,0.33,0.22]
                  }]
                },
                options: {
                  title: {
                    display: true,
                    text: 'TRIPLE S TRAINERS YG'
                    }
                  }
                });
              </script>
            </div>
            <div class="col-sm-4">
              <canvas id="pie-chart3" height="225"></canvas>
              <script>
                new Chart(document.getElementById("pie-chart3"), {
                type: 'pie',
                data: {
                  labels: ["양품(Perfect)", "미세불량품(Good)", "불량품(Bad)"],
                  datasets: [{
                    label: "비율",
                    backgroundColor: ["#3e95cd", "#3cba9f","#f0af7a",/"#e8c3b9","#c45850"/],
                    data: [0.45,0.33,0.22]
                  }]
                },
                options: {
                  title: {
                    display: true,
                    text: 'Jordan 1 Retro High Off-White Chicago'
                    }
                  }
                });
              </script>
            </div>
          </div>
        </div>
        <div class="col-12">
          <br>
          <h6>신발 종류별 검사 결과물(Perfect, Good, Bad)</h6>
        </div>
      </div>  
    </div>
  </div>
</div>
</body>
</html>
    `;
}
