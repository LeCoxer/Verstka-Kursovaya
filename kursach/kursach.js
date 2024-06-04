let timerInterval; //Переменная для хранения интервала таймера
let lives; //Переменная для хранения количества жизней игрока
let currentLevel = 1; //Переменная для хранения текущего уровня игры
let gameDuration = 30; //Переменная для хранения продолжительности игры в секундах
let score = 0; //Переменная для хранения счета игрока


//Функция для обновления отображаемого счета игрока
function updateScore(scoreElement, score) {
    scoreElement.textContent = "Счет: " + score; //Обновление текста элемента с текущим счетом игрока
}

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("levelDescriptionModal"); //Модальное окно с описанием уровня
    const modalText = modal.querySelector("p"); //Текст в модальном окне
    const modalHeader = modal.querySelector("h2"); //Заголовок в модальном окне
    const gameContainer = document.getElementById("colorGame"); //Контейнер игры
    const startButton = document.getElementById("startLevelButton"); //Кнопка для начала уровня
    const heartsContainer = document.querySelector(".hearts-container"); //Контейнер жизней игрока
    const timerElement = document.getElementById("timer"); //Элемент, отображающий таймер
    const progressBar = document.getElementById("progressBar"); //Полоса прогресса для таймера
    const scoreElement = document.getElementById("score"); //Элемент, отображающий счет
    lives = heartsContainer.children.length; //Количество жизней игрока

    let timerActive = true; //Флаг, указывающий, активен ли таймер в данный момент
    let timerInterval; //Переменная для хранения интервала таймера

    //Функция для запуска таймера с заданной продолжительностью, обновляющегося каждую секунду
    function startTimer(duration, display, progressBar) { 
        let timer = duration; //Продолжительность таймера
        progressBar.style.width = '100%'; //Начальная ширина полосы прогресса
        progressBar.style.backgroundColor = '#8b0000'; //Цвет полосы прогресса
        display.textContent = timer; //Отображение начального значения таймера
    
        clearInterval(timerInterval); //Очищаем предыдущий таймер, если он был запущен
        timerInterval = setInterval(function () { //Устанавливаем новый интервал
            if (!timerActive) return; //Если таймер не активен, выходим из функции
    
            let percentage = (timer / duration) * 100; //Вычисляем процент оставшегося времени
            progressBar.style.width = percentage + '%'; //Обновляем ширину полосы прогресса
            display.textContent = timer; //Обновляем отображаемое значение таймера
    
            if (--timer < 0) { //Если таймер достиг нуля
                clearInterval(timerInterval); //Останавливаем таймер
                display.textContent = 'Время вышло!'; //Отображаем сообщение о завершении времени
                nextLevel(); //Переход на следующий уровень или окончание игры
            }
        }, 1000); //Интервал обновления таймера - 1 секунда
    }

    //Обработчики событий click для кнопок Start Level
    document.getElementById("startLevelButton1").onclick = function() {
        startGame(); //Начало игры при нажатии кнопки старт уровня 1
    };
    document.getElementById("startLevelButton2").onclick = function() {
        startGame(); //Начало игры при нажатии кнопки старт уровня 2
    };

    //Потеря жизни, и если жизней не осталось заканчиваем игру
    function removeHeart(heartsContainer) {
        if (lives > 0) { //Проверка, остались ли жизни
            lives--; // Уменьшаем количество жизней на 1
            heartsContainer.children[lives].style.visibility = 'hidden'; // Скрываем одно из сердечек
            if (lives === 0) { //Если жизней не осталось
                clearInterval(timerInterval); // Останавливаем таймер
                endGame(); // Обработка окончания игры
            }
        }
    }

// Получаем элемент заголовка уровня
const levelHeader = document.querySelector('#gameInfo h2');

// При переходе на новый уровень, обновляем текст заголовка
function updateLevelHeader(level) {
    levelHeader.textContent = `Уровень: ${level}`; //Устанавливаем новый текст заголовка
}

    // Функция для отображения модального окна с заголовком и текстом, переданными в качестве параметров
    function showModal(title, text) {
        modalHeader.textContent = title; //Устанавливаем текст заголовка модального окна
        modalText.textContent = text; //Устанавливаем текст модального окна
        modal.style.display = "block"; //Отображаем модальное окно
        startButton.style.display = "block"; //Отображаем кнопку начала уровня
    }

    //Сокрытие модального окна
    function hideModal() {
        modal.style.display = "none";
    }

    //Описание текущего уровня игры
    function getLevelDescription(level) {
        switch (level) {
            case 1: return "Заполните пропуски в словах.";
            case 2: return "Упорядочьте слова, чтобы получилось осмысленное предложение.";
            case 3: return "Выберите все синонимы или антонимы для предложенного слова.";
            default: return "Игра завершена! Ваш счет: " + score;
        }
    }

    //Сокрытие лишних элементов, отображение описания текущего уровня, обновление счета, обработка клика кнопки Начать
    function setupGame() {
        showModal(`Уровень ${currentLevel}`, getLevelDescription(currentLevel)); //Отображаем модальное окно с заголовком и описанием текущего уровня
        updateScore(scoreElement, score); //Обновляем счет на экране
        startButton.onclick = function() {
            startGame(); //Обработка клика на кнопку 'Начать'
        };
    }

    function startGame() {
        hideModal(); //Сокрытие модального окна
        timerActive = true; //Активируем таймер


        updateLevelHeader(currentLevel); //Обновляем заголовок текущего уровня
        startButton.style.display = "none"; //Скрываем кнопку 'Начать'
        gameContainer.style.display = "block"; //Отображаем контейнер игры
        switch (currentLevel) { //Запуск соответствующей игры
            case 1: startFillInTheBlanksGame(); break;
            case 2: startOrderingWordsGame(); break;
            case 3: startSynonymsAntonymsGame(); break;
            default: endGame(); //Завершение игры, если нет больше уровней
        }
    }

    //Остановка таймера, запуск следующего уровня если он не последний
    function nextLevel() {
        timerActive = false; //Деактивация таймера
        if (currentLevel < 3) { //Проверка, не достиг ли последний уровень
            currentLevel++; //Увеличиваем номер текущего уровня
            setupGame(); //Настройка уровня для следующего уровня
        } else {
            endGame(); //Завершение игры, если достигнут последний уровень
        }
    }
    
    //Отображение таблицы лидеров, сокрытие лишних элементов, форма ввода для имени
    function endGame() {
        showRatings();
    }
    
    //Функция для запуска игры на заполнение пропусков
    function startFillInTheBlanksGame() {
        const wordsWithBlanks = [
            { word: "мы_ка", correct: "ш" },
            { word: "прог_аммирование", correct: "р" },
            { word: "ком_ьютер", correct: "п" },
            { word: "клав_атура", correct: "и" },
            { word: "про_ессор", correct: "ц" },
            { word: "но_тбук", correct: "у" }
        ];
        
        // Перемешиваем массив слов
        shuffleArray(wordsWithBlanks);
    
        let currentWordIndex = 0; // Индекс текущего слова
        startTimer(gameDuration, timerElement, progressBar); //Запуск таймера
        
        function displayCurrentWord() {
            if (currentWordIndex < wordsWithBlanks.length) { //Проверка, есть ли еще слова
                const item = wordsWithBlanks[currentWordIndex];
                // Создаем input для каждой буквы с максимальной длиной 1
                const inputHTML = item.word.replace(/_/g, '<input type="text" maxlength="1" class="blank" style="width: 30px; margin-right: 5px;">');
                gameContainer.innerHTML = `<p>${inputHTML}</p>`;
                document.querySelector(".blank").focus(); // Ставим фокус на поле ввода
            } else {
                nextLevel(); // Переход на следующий уровень
            }
        }
        
        gameContainer.addEventListener('input', function(event) {
            if (event.target.classList.contains('blank')) { //Проверяем, что ввод происходит в поле с классом 'blank'
                const userLetter = event.target.value.trim().toLowerCase(); //Получаем введенную букву
                const correctLetter = wordsWithBlanks[currentWordIndex].correct; //Получаем правильную букву
                if (userLetter === correctLetter) { //Проверка на правильность введенной буквы
                    score += 5; // Начисляем очки за правильный ответ
                    updateScore(scoreElement, score); //Обновление счета на экране
                    currentWordIndex++; // Переходим к следующему слову
                    displayCurrentWord(); // Отображаем следующее слово с пропуском
                } else {
                    // Если введена неправильная буква, убираем одно сердечко
                    removeHeart(heartsContainer);
                    event.target.value = ''; // Очищаем поле ввода
                }
            }
        });
        
        displayCurrentWord(); // Первый вызов для отображения слова
    }
    
    // Функция для перемешивания массива
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    //Функция для запуска игры на упорядочивание слов
    function startOrderingWordsGame() {
        const sentences = [
            { words: ["Баг", "фиче", "не", "товарищ"], correctOrder: ["Баг", "фиче", "не", "товарищ"] },
            { words: ["Старый", "баг", "лучше", "новых", "двух"], correctOrder: ["Старый", "баг", "лучше", "новых", "двух"] },
            { words: ["Код", "рефакторингом", "не", "испортишь"], correctOrder: ["Код", "рефакторингом", "не", "испортишь"] }
        ];

        //Обработчик для элементов на странице
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.querySelectorAll('.word, .synonym, .antonym');
            elements.forEach(element => {
                element.addEventListener('click', function() {
                    elements.forEach(el => el.classList.remove('clicked')); // Удаляем класс clicked у всех элементов
                    this.classList.add('clicked'); // Добавляем класс clicked только к текущему элементу
                });
            });
        });

        // Перемешиваем массив предложений
        sentences.forEach(sentence => {
            shuffleArray(sentence.words);
        });
        shuffleArray(sentences);
    
        let currentSentenceIndex = 0; // Индекс текущего предложения
        startTimer(gameDuration, timerElement, progressBar);
    
        function displayCurrentSentence() {
            if (currentSentenceIndex < sentences.length) { //ПРоверяем, есть ли еще предложения
                const sentence = sentences[currentSentenceIndex];
                const wordsHTML = sentence.words.map(word => `<div class="word" draggable="true">${word}</div>`).join('');
                gameContainer.innerHTML = `<div class="sentence">${wordsHTML}</div><button id="checkButton">Проверить</button>`;
                const checkButton = document.getElementById('checkButton');
                checkButton.addEventListener('click', checkOrder); //Добавляем обработчик для кнопки проверки
                const words = document.querySelectorAll('.word');
                words.forEach(word => {
                    word.addEventListener('dragstart', dragStart); //Обработчик начала перетаскивания
                    word.addEventListener('dragover', dragOver); //Обработчик перетаскивания
                    word.addEventListener('drop', drop); //Обработчик окончания перетаскивания
                });
            } else {
                nextLevel(); // Переход на следующий уровень
            }
        }
    
        function checkOrder() {
            const sentence = sentences[currentSentenceIndex];
            const userOrder = Array.from(document.querySelectorAll('.word')).map(word => word.textContent);
            if (arraysEqual(userOrder, sentence.correctOrder)) { //Проверяем, совпадает ли порядок слов с правильным порядком
                score += 10; // Начисляем очки за правильное упорядочивание слов
                updateScore(scoreElement, score); //Обновляем счет на экране
                currentSentenceIndex++; // Переходим к следующему предложению
                displayCurrentSentence(); // Отображаем следующее предложение
            } else {
                removeHeart(heartsContainer); // Убираем сердечко за неправильное упорядочивание слов
            }
        }
    
        let draggedWord = null;
    
        function dragStart(event) {
            draggedWord = event.target; //Запоминаем перетаскиваемое слово
        }
    
        function dragOver(event) {
            event.preventDefault(); //Предотвращаем стандартное поведение при перетаскивании
        }
    
        function drop(event) {
            event.preventDefault();
            if (draggedWord !== event.target) { //Проверяем, не является ли целевой элемент перетаскиваемым элементом
                const parent = event.target.parentNode; //Находим родительский элемент
                const rect = parent.getBoundingClientRect(); //Получаем размеры родительского элемента
                const offset = event.clientX - rect.left - (draggedWord.offsetWidth / 2); //Вычисляем смещение
                if (offset > 0) {
                    parent.insertBefore(draggedWord, event.target.nextSibling); //Всталяем перетаскиваемый элемент после целевого
                } else {
                    parent.insertBefore(draggedWord, event.target); //Вставляем перетаскиваемый элемент перед целевым
                }
            }
        }
    
        displayCurrentSentence(); // Первый вызов для отображения предложения
    }
    
    // Функция для перемешивания массива
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Функция для сравнения двух массивов на равенство
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }
    
    //Функция для запуска игры на подбор синонимов и антонимов
    function startSynonymsAntonymsGame() {
        const words = [
            { word: "большой", synonym: "крупный", antonym: "маленький" },
            { word: "быстрый", synonym: "скорый", antonym: "медленный" },
            { word: "яркий", synonym: "светлый", antonym: "темный" },
            { word: "горячий", synonym: "жаркий", antonym: "холодный" }
        ];
    
        shuffleArray(words); // Перемешаем массив слов
    
        let currentWordIndex = 0; // Индекс текущего слова
    
        startTimer(gameDuration, timerElement, progressBar); //Запускаем таймер
    
        // Функция для отображения текущего слова и его синонима или антонима
        function displayWord() {
            const currentWord = words[currentWordIndex];
            const { word, synonym, antonym } = currentWord;
            const isSynonym = Math.random() < 0.5; // Случайное определение, будет ли синоним правильным вариантом
            const correctOption = isSynonym ? 'synonym' : 'antonym'; // Определение правильного варианта ответа
            const correctAnswer = isSynonym ? synonym : antonym; // Правильный ответ
            const incorrectAnswer = isSynonym ? antonym : synonym; // Неправильный ответ
    
            const optionDescription = isSynonym ? 'Выберите синоним для слова:' : 'Выберите антоним для слова:';
            const html = `
                <div>${optionDescription} <strong>${word}</strong></div>
                <div>
                    <button class="option" data-option="${correctOption}">${correctAnswer}</button>
                    <button class="option" data-option="incorrect">${incorrectAnswer}</button>
                </div>
            `;
            gameContainer.innerHTML = html;
    
            const optionButtons = document.querySelectorAll('.option');
            optionButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const selectedOption = this.getAttribute('data-option');
                    checkAnswer(selectedOption, correctOption);
                });
            });
        }
    
        // Функция для проверки ответа пользователя
        function checkAnswer(selectedOption, correctOption) {
            if (selectedOption === correctOption) {
                score += 10; // Увеличиваем счет за правильный ответ
                updateScore(scoreElement, score); //Обнволяем счет на экране
            } else {
                removeHeart(heartsContainer); // Отнимаем сердечко за неправильный ответ
            }
    
            currentWordIndex++; // Переходим к следующему слову
            if (currentWordIndex === words.length) {
                // Все слова угаданы, переходим к следующему уровню
                gameContainer.innerHTML = ''; //Очищаем контейнер игры
                nextLevel(); //Переходим к следующему уровню
            } else {
                displayWord(); // Отображаем следующее слово
            }
        }
    
        displayWord(); // Первый вызов для отображения текущего слова
    }
    



// Функция, вызываемая в конце игры
function showRatings() {
    userName = sessionStorage.getItem('Username');
    localStorage.setItem(userName, score);
    sessionStorage.clear();
    window.location.href = 'rating.html';
}

    setupGame(); // Вызов функции настройки игры при загрузке страницы
});
