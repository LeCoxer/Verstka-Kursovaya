const userList = document.getElementById('userList');
const data = [];

window.onload = ratingShow;

function ratingShow() {
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const username = key;
            const value = localStorage.getItem(key);
            const item = { username, value: parseInt(value, 10) }; // Преобразуем значение в число
            data.push(item);
        }
    };

    data.sort((a, b) => {
        if (a.value === b.value) {
            return 0;
        } else if (a.value === 0) {
            return 1; // Перемещаем нулевые значения вниз
        } else if (b.value === 0) {
            return -1; // Перемещаем нулевые значения вниз
        } else {
            return b.value - a.value;
        }
    });

    for (const item of data) {
        const listItem = document.createElement('li');
        listItem.textContent = item.username + ' - ' + item.value;
        userList.appendChild(listItem);
    }
}
goBack.addEventListener('click', function () {
    window.location.href = 'entry.html';
})