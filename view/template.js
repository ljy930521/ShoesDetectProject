module.exports = {
    navBar: function(isHome, weather, userName) {
        let homeLink = isHome ? `<a class="nav-link active" href="#">Home</a>`: `<a class="nav-link" href="/home">Home</a>`;
        return `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <img src="/shoes.png" width="100" height="100" class="d-inline-block align-top" alt="">&nbsp;&nbsp;&nbsp;
                <ul class="nav nav-pills mr-auto">
                    <li class="nav-item">
                        ${homeLink}
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/user/logout">Logout</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"> </a>
                    </li>
                </ul>
                <div class="navbar-text">
                    <p>${weather}</p>
                    <p>Welcome to our zone${userName}.</p>
                </div>
            </nav>
        `;
    },
    menuLink: function(menu) {
        let itemLink = `<a class="nav-link" href="/item">Shoes List</a>`;
        let conveyorLink = `<a class="nav-link" href="/conveyor">Conveyor Actuator</a>`;
        let userLink = `<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
        let galleryLink = `<a class="nav-link" href="/gallery">갤러리</a>`;
        switch(menu) {
            case 1:     // Sensor 메뉴를 눌렀을 경우
                itemLink = `<a class="nav-link active" href="#">Shoes List</a>`;
                break;
            case 2:     // Actuator 메뉴를 눌렀을 경우
                conveyorLink = `<a class="nav-link active" href="#">Conveyor Actuator</a>`;
                break;
            case 3:     // User 메뉴를 눌렀을 경우
                userLink = `<a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`;
                break;
            case 4:     // Gallery 메뉴를 눌렸을 경우
                galleryLink = `<a class="nav-link active" href="#">갤러리</a>`;
                break;
            default:
                break;
        }
        return `
            <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                    ${itemLink}
                </li>
                <li class="nav-item">
                    ${conveyorLink}
                </li>
                <li class="nav-item dropdown">
                    ${userLink}
                        사용자
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/user/register">등록(C)</a>
                        <!-- 페이지를 지원하기 위해 /user/list/page/1 으로 변경 -->
                        <a class="dropdown-item" href="/user/list/page/1">조회(R)</a>
                    </div>
                </li>
                <li class="nav-item">
                    ${galleryLink}
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true"></a>
                </li>
            </ul>
        `;
    },
    weather: function(temp, humid, ico) {
        return `
            <a href='/weather'><button type="button" class="btn btn-secondary btn-sm">날씨</button></a>&nbsp;
            <img src="${ico}" width="32" height="32">&nbsp;
            기온: ${temp}&#8451;, 습도: ${humid}% &nbsp;&nbsp;&nbsp;
        `;
    },
    header: function() {
        return `
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <!-- ==================================================================== -->
            <title>강남 스마트팜</title>
            <link rel="stylesheet" href="/css/bootstrap.min.css">
            <script src="/fontawesome/all.min.js"></script>
            <script src="/jquery/jquery.min.js"></script>
            <script src="/js/bootstrap.bundle.min.js"></script>
        `;
    }
}
//<script src="/popper/popper.min.js"></script>
//<script src="/js/bootstrap.min.js"></script>