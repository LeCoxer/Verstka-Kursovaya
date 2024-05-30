const userNameInput = document.getElementById('userNameInput');
const inputContainer = document.getElementById('inputContainer');
const entryButton = document.getElementById('entryButton');
const userInfo = document.getElementById('Userinfo');

window.onload = naming;

function naming() {
    const usernameDisplay = document.getElementById('usernameDisplay');
    usernameDisplay.textContent = sessionStorage.getItem('Username');
    if (sessionStorage.getItem('Username') !== null) {
        inputContainer.style.display = 'none';
        entryButton.style.display = 'inline-block';
        userInfo.style.display = 'inline-block';
    };
}

submitButton.addEventListener('click', function () {
    const userName = userNameInput.value;
    if (localStorage.getItem(userName) !== null) {
        alert('Пользователь с таким никнеймом уже существует! Пожалуйста, введите другой никнейм!')
    } else {
        if (userName.trim() != '') {
            inputContainer.style.display = 'none';
            userInfo.style.display = 'inline-block';
            entryButton.style.display = 'inline-block';
            sessionStorage.setItem('Username', userName);
            naming();
        } else {
            alert('АЙ-АЙ-АЙ, без имени вход закрыт!!!');
        }
    }
})

playButton.addEventListener('click', function () {
    window.location.href = 'kursach.html';
})
ratingButton.addEventListener('click', function () {
    window.location.href = 'rating.html';
})


