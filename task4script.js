//Получаем элементы HTML по их идентификаторам
var btn = document.querySelector("#Пусто");
var aa = document.getElementById("words");
var strok = document.getElementById("stroka");
var buttons = document.getElementById("bttns");
var str = aa.value;

var squares = document.getElementsByClassName('square');    //наши передвигающиеся элементы
var rightBox = document.getElementById('col');
var leftBox = document.getElementById('left');
var description = document.getElementById('added_words');

//Обработчик события ажатия на кнопку
btn.onclick = function () {
    //Проверка, что поле ввода не пустое
    if (aa.value === null || aa.value === ""){
        aa.placeholder="Напишите несколько слов разделенных знаком - (тире) "; //Установка надписи, если поле пустое
    }
    else if(aa.value!==""){
        description.innerHTML=''; //Очистка описания
        leftBox.innerHTML=''; //Очистка левого блока
        buttons.innerHTML=''; //Очистка блока с кнопками
        str = aa.value; //Сохранение введенного значения
        strok.innerHTML = 'Строка: ' + str; //Обновление текста строки
        zapoln(); //Запуск функции обработки строки
    }
    
};

//Функция для обработки строки, разделения ее на слова и числа, сортировки и заполнения элементов HTML
function zapoln() { 
    var arr = str.split("-"); //Разделяем строку на массив по разделителю
    var map = new Array(arr.length);  //Массив для хранения отсортированных слов и чисел
    var arr1 = new Array(); //массив слов
    var arr2 = new Array(); //массив цифр
    var count1 = 0; //Счетчик слов 
    var count2 = 0; //Счетчик чисел
    
//Выражение для удаления лишних пробелов
    const regex = new RegExp(/(\s{2,})/, "g"); 
    for (var ind in arr) { //Проходим по каждому элементу массива                      
        if (!/^\s*$/.test(arr[ind])) {  //Проверка что элемент не пустой
            arr[ind] = arr[ind].trim().replace(regex, " "); //убираем лишние пробелы
            if (/^\d+$/.test(arr[ind])) {   //если элемент явялется числом
                arr2[count2] = arr[ind];
                count2++;
            } else {                        //если элемент является словом
                arr1[count1] = arr[ind];
                count1++;
            }
        }
    }

    arr1.sort((a, b) => a.localeCompare(b));    //сортировка слов по алфавиту

    arr2.sort(function (a, b) {     //сортировка чисел по возрастанию
        return a - b
    });

    //Заполнение словарей map отсортированными словами и числами
    for (var i = 0; i < count1; i++) {   
        map["a" + (i + 1)] = arr1[i];
        console.log(map["a" + (i + 1)])
    }
    for (var j = 0; j < count2; j++) {  
        map["n" + (j + 1)] = arr2[j];
        console.log(map["n" + (j + 1)])
    }

    //Создание элементов HTML и добавление их в блок buttons
    for (var k in map) {   
        var sq = document.createElement('div');  //создание элемента div
        sq.innerHTML = k + "   " + map[k]; //заполнение элемента текстом
        sq.id = k; //Установка id элемента
        sq.classList.add('square'); //Добавление класса square
        sq.draggable = true; //Делаем элемент перетаскиваемым
        buttons.appendChild(sq); //Добавление элемента в блок buttons
    }

    var txt=''; //Перемннная для хранения текста
    
    //Добавление событий dragstart и drop для перетаскиваемых элементов
    for(subj of squares){
        subj.addEventListener("dragstart", function(e){
            let selected = e.target;

            leftBox.addEventListener("dragover", function(e){
                e.preventDefault(); //Предотвращаем поведение по умолчанию
            });
            leftBox.addEventListener("drop", function(e){
                leftBox.insertBefore(selected, leftBox.firstChild);  //Перемещаем элемент в левый блок
                txt = leftBox.innerText; //Обновляем текст перемещенных элементов

                description.innerHTML = txt; //Обновляем описание
                selected=null;
            });
        })
    }
}  