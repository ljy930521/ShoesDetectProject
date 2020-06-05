const template = require('./template');
const header = template.header();


// module.exports.home = function(navBar, menuLink, sensor, actuator) {
module.exports.chart = function(navBar, menuLink) {

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
                <canvas id="bar-chart" width="800" height="500"></canvas>
                    <script>
                    // Bar chart
                    new Chart(document.getElementById("bar-chart"), {
                    type: 'bar',
                    data: {
                        labels: ['5월28일','5월29일','6월02일','6월03일','6월4일'],
                        datasets: [
                        {
                            label: "평균 오차율", //����
                            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],//���� �׷����� ����
                            data: [77.5,83,87.5,90.65,90.4] //��Ʈ�� ���� ������ ��
                        }
                        ]
                    },
                    options: {
                        legend: { display: false },
                        title: {
                        display: true, 
                        text: '당일 모든 신발의 평균 오차율'
                        }
                    }
                    });
                    </script>
                </div>
                <div class="col-6"><script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
                </head>
                <body>
                    <canvas id="doughnut-chart" width="800" height="450"></canvas> 
                    <script>
                   new Chart(document.getElementById("doughnut-chart"), {
                    type: 'doughnut',
                    data: {
                      labels: ["Sacai x LDWaffle VB", "TRIPLE S TRAINERS YG", "Jordan 1 Retro High Off-White Chicago"],
                      datasets: [
                        {
                          label: "오차율",
                          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f",/"#e8c3b9","#c45850"/],
                          data: [77.5,88.6,94]
                        }
                      ]
                    },
                    options: {
                      title: {
                        display: true,
                        text: '신발 종류별 여태까지 모든 평균 오차율'
                      }
                    }
                });
                </script>
                </div>
                <div class="col-6"><script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"></script>
                </head>
                <body>
                    <canvas id="line-chart" width="800" height="450"></canvas>
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
                </script></div>
                <div class="col-6"><canvas id="pie-chart" width="800" height="450"></canvas>
                <script>
                new Chart(document.getElementById("pie-chart"), {
                type: 'pie',
                data: {
                  labels: ["양품", "미세불량품", "불량품"],
                  datasets: [{
                    label: "비율",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f",/"#e8c3b9","#c45850"/],
                    data: [0.45,0.33,0.22]
                  }]
                },
                options: {
                  title: {
                    display: true,
                    text: 'TRIPLE S TRAINERS YG 결과물 비율 그래프'
                  }
                }
            });
            </script></div>
            </div>  
        </div>
    </div>
</div>
</body>
</html>
    `;
}
