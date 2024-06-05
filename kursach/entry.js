const userNameInput = document.getElementById('userNameInput');
const inputContainer = document.getElementById('inputContainer');
const entryButton = document.getElementById('entryButton');
const userInfo = document.getElementById('Userinfo');
const diff = document.getElementById('Difficulty');

window.onload = naming;

function naming() {
    const usernameDisplay = document.getElementById('usernameDisplay');
    usernameDisplay.textContent = sessionStorage.getItem('Username');
    if (sessionStorage.getItem('Username') !== null) {
        inputContainer.style.display = 'none';
        entryButton.style.display = 'inline-block';
        userInfo.style.display = 'inline-block';
        diff.style.display = 'inline-block';
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
            diff.style.display = 'inline-block';
            sessionStorage.setItem('Username', userName);
            naming();
        } else {
            alert('АЙ-АЙ-АЙ, без имени вход закрыт!!!');
        }
    }
})

easy.addEventListener('click', function () {
    easy.style.backgroundColor = '#808080';
    medium.style.backgroundColor = '#8b0000';
    hard.style.backgroundColor = '#8b0000';
    sessionStorage.setItem('Difficulty', 45);
})

medium.addEventListener('click', function () {
    medium.style.backgroundColor = '#808080';
    easy.style.backgroundColor = '#8b0000';
    hard.style.backgroundColor = '#8b0000';
    sessionStorage.setItem('Difficulty', 30);
})

hard.addEventListener('click', function () {
    hard.style.backgroundColor = '#808080';
    medium.style.backgroundColor = '#8b0000';
    easy.style.backgroundColor = '#8b0000';
    sessionStorage.setItem('Difficulty', 15);
})

playButton.addEventListener('click', function () {
    if (sessionStorage.getItem('Difficulty') !== null) {
        window.location.href = 'kursach.html';
    } else {
        alert('Сложность не выбрана!')
    }
})
ratingButton.addEventListener('click', function () {
    window.location.href = 'rating.html';
})


