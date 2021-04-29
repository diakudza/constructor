let textArea = document.getElementById('textArea');
let textVariables = document.getElementById('textVariables');
let divWithBtn = document.getElementById('divWithBtn');

let goEgit = {
    start: 0,
    generate() { //метод запуска рендера кнопок и шапки 
        if (goEgit.start === 0) {
            generateBtn();
            document.getElementById('generate').remove();
            let btnSave = document.createElement('a');
            btnSave.id = 'save';
            btnSave.innerText = 'Собрать файл';
            btnSave.onclick = this.generateProg;
            divWithBtn.append(btnSave);
        };
        generateStandartVar();

    },
    generateProg() { //склеиваем собранную прогрмамму в массив, и выводим в файл
        existProg[0] = textVariables.innerHTML;
        existProg[2] = textArea.innerHTML;
        let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(existProg[0] + existProg[1].split(';').join('\n') + existProg[2] + existProg[3].split(';').join('\n'));
        this.href = myData;
        this.download = 'O0020.txt';
    }
}
/**
* Функция генерирует шапку программы со стандартными переменными
*/
function generateStandartVar() {
    for (let variables of standart) {
        textVariables.innerHTML += variables + '\n';
    }
}


/**
* Функция смотрит, какие есть операции в объекте и генерирует кнопки
*/
function generateBtn() {
    for (let oper in blocks) {
        let btn = document.createElement('button');
        btn.id = oper
        btn.innerText = blocks[oper].item;
        btn.onclick = btnDo;
        divWithBtn.append(btn);
    }
}


/**
* Функция добавляет текст в поля textArea и textVariables
*/
function btnDo(e) {
    let textArea = document.getElementById('textArea');
    let textVariables = document.getElementById('textVariables');
    textArea.innerHTML += strToText(e.target.id, 'code');
    textVariables.innerHTML += strToText(e.target.id, 'variables');
};


/**
* Функция получает свойсво обекта bloks[n] , делает из строки массив, возращает строку с переводом строки 
*@param n {blocks[n]} операция в обекте
*@param type { item|variable|code } выбор свойства операции
*/
function strToText(n, type) {
    let arr = blocks[n][type].split(';');
    return arr.join('\n');
}
