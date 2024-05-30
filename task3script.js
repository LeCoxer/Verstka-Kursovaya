questions = [
    {
        question: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        correctly: "Полдеревни, зараз",
        note: "Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом.",
        wrongAns: [
            "Пол-деревни, за раз",
            "Пол деревни, за раз"
        ]
    },
    {
        question: "А эти слова как пишутся?",
        correctly: "Капучино и эспрессо",
        note: "По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо».",
        wrongAns: [
            "Капуччино и эспрессо",
            "Каппуччино и экспресо"
        ]
    },
    {
        question: "Как нужно писать?",
        correctly: "Чересчур",
        note: "Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур».",
        wrongAns: [
            "Черезчур",
            "Черес-чур"
        ]
    },
    {
        question: "Где допущена ошибка?",
        correctly: "Эпелепсия",
        note: "Ошибка в слове Эпелепсия. Слово пишется так: «эпИлепсия». Радостно, если это слово касается вас только в формате 'Как писать правильно'.",
        wrongAns: [
            "Аккордеон",
            "Белиберда"
        ]
    }
]

//Переменные для отслеживания текущего вопроса, правильного ответа, последнего овпроса и счетчика правильных ответов
var nowQuestionIndex = 0;
const questBlock = document.getElementById('questions');
let correctly = null;
let lastQuestion = null;
let counterCorrectly = 0;
let wrongAns = [];

//Перемешивание массива вопросов
questions = rndArray(questions)

//Функция для перемешивания элементов массива(алгоритм Фишера-Йетса)
function rndArray(array) { 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Создание и отображение отдельного вопроса на странице
function createQuestion(questionIndex) {
    if (questionIndex >= questions.length) {
        showResult(); //Если вопросов больше нет, показ результатов
        return;
    }
    if (questBlock.innerHTML !== '') {  //Если внутри элемента questBlock уже есть контент,
        let breakElement = document.createElement('div'); //создаем элемент разделения
        breakElement.setAttribute('class', 'flex-break');
        questBlock.appendChild(breakElement);
    }

    //Создание блока вопроса
    let question = questions[questionIndex];           
    let questionDiv = document.createElement('div');
    questionDiv.setAttribute('class', 'question');
    questionDiv.setAttribute('num', questionIndex);
    questionDiv.innerHTML = (questionIndex + 1) + ". " + question.question;
    questBlock.appendChild(questionDiv);
    lastQuestion = questionDiv;

    //Создание перемешанных ответов и обработка выбора
    let allAnswers = rndArray(question.wrongAns.concat([question.correctly])); 
    allAnswers.forEach(element => {
        answerDiv = document.createElement('div');
        answerDiv.setAttribute('class', 'answer');
        answerDiv.innerHTML = element;
        questBlock.appendChild(answerDiv);
        if (element === question.correctly) {
            correctly = answerDiv; //Сохараняем правильный ответ
        } else {
            wrongAns.push(answerDiv); //Сохраняем неправильные ответы
        }
        answerDiv.addEventListener('click', (event) => onClickAnswer(event)); //Обработчик клика по ответу
    });
}

//Смещение элементов после ответа
function hideElement(element) { 
    element.style.transition = "transform 5s, opacity 5s";
    element.style.transform = "translateY(500%)";
    element.style.opacity = 0;
    setTimeout(function () {
        element.remove(); //Удаление элемента после анимации
    }, 2000);
}

//Обработка клика пользователя на элемент ответа
function onClickAnswer(event) {
    wrongAns.forEach(element => hideElement(element)); //Скрытие всех неправильных ответов
    hideElement(correctly); //Скрытие правильного ответа
    setTimeout(() => {  //Задержка перед показом результата
        if (correctly != null && event.srcElement === correctly) { //Если выбран правильный ответ
            imgElement = document.createElement("img");
            imgElement.src = "corectly.svg"; //Показ картинки правильного ответа
            lastQuestion.appendChild(imgElement);
            counterCorrectly += 1; //Увеличение счетчика правильных ответов
        } else {
            imgElement = document.createElement("img");
            imgElement.src = "wrong.svg"; //Показ картинки неправильного ответа
            lastQuestion.appendChild(imgElement);
            lastQuestion.innerHTML += '';
        }
        note = document.createElement('div'); //Пояснение к вопросу
        note.setAttribute('class', 'note');
        questBlock.appendChild(note);
        note.innerHTML = questions[nowQuestionIndex].note;
        setTimeout( //Последовательные скрытия и переход к следующему вопросу
            () => {
                hideElement(note)
                setTimeout(() => {
                    nowQuestionIndex += 1;
                    createQuestion(nowQuestionIndex);
                }, 2000);
            }, 2000
        );
    }, 2000);
}

//Функция для показа результата после завершения всех вопросов
function showResult() {
    let resultDiv = document.createElement("a");
    resultDiv.setAttribute("class", "results flex-break");
    resultDiv.innerHTML = "ВОПРОСЫ ЗАКОНЧИЛИСЬ! Результат: " + counterCorrectly + "/" + questions.length;
    resultDiv.style.marginLeft = "1%";
    resultDiv.style.fontSize= "40px";
    resultDiv.style.color= "white";
    questBlock.insertBefore(resultDiv, questBlock.firstChild)
    let i = 0
    //Добавление обработчиков для показа правильного ответа по клику на вопрос
    questBlock.querySelectorAll("div.question").forEach(
        question => {
            question.addEventListener(
                'click',
                (event) => {
                    questBlock.querySelectorAll("div.answer").forEach((element) => element.remove());
                    answerDiv = document.createElement("div");
                    answerDiv.setAttribute("class", "answer");
                    answerDiv.innerHTML = questions[parseInt(question.getAttribute('num'))].correctly;
                    questBlock.insertBefore(answerDiv, question.nextSibling);
                }
            )
            i++;
        }
    )
}

//Показ вопроса
createQuestion(nowQuestionIndex);