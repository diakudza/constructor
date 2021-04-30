let textArea = document.getElementById('textArea');
let textVariables = document.getElementById('textVariables');
let divWithBtn = document.getElementById('divWithBtn');
let divBlocks = document.getElementsByClassName('divBlocks')[0];
let goEgit = {
    start: 0,
    blocks: 0,
    generate() { //метод запуска рендера кнопок и шапки 
        if (goEgit.start === 0) {
            this.start = 1;
            generateBtn();
            document.getElementById('generate').remove();
            let btnSave = document.createElement('a');
            btnSave.id = 'save';
            btnSave.innerText = 'Собрать файл';
            btnSave.onclick = this.generateProg;
            divWithBtn.append(btnSave);
        };
        //generateStandartVar();
        divBlocks.append(createHeadBlock());
    },
    generateProg() { //склеиваем собранную прогрмамму в массив, и выводим в файл
        existProg[0] = textVariables.value;
        existProg[2] = textArea.value;
        let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(existProg[0] + existProg[1].split(';').join('\n') + existProg[2] + existProg[3].split(';').join('\n'));
        this.href = myData;
        this.download = 'O0020.txt';
    },
    removeBlock(e) {

    }
}
/**
* Функция генерирует шапку программы со стандартными переменными
*/
function generateStandartVar() {
    for (let variables of standart) {
        textArea.value += variables + '\n';
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

    //textArea.value += strToText(e.target.id, 'code');
    //textVariables.value += strToText(e.target.id, 'variables');
    divBlocks.append(createBlock(e.target.id, 'code'));
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
function createHeadBlock() {
    let fragment = new DocumentFragment();

    let div = document.createElement("div");
    div.classList.add('block'),
        div.classList.add('head'),
        br = document.createElement('br');
    for (let variables in standart) {
        let span = document.createElement('span');
        let input = document.createElement('input');
        input.type = 'text';
        input.classList.add('inputVar');
        if (variables == "name") {
            span.innerHTML = 'Название программы';
            input.value = variables;
        } else {
            span.innerHTML = standart[variables].comment;
            input.value = standart[variables].value;
        }
        div.append(span, input, br);


    }
    fragment.append(div);
    return fragment;

}
function createBlock(n, type) {
    let fragment = new DocumentFragment(),
        p = document.createElement('p'),
        span = document.createElement("span"),
        textArea = document.createElement("textarea"),
        div = document.createElement("div");

    goEgit.blocks++;
    div.id = n + 'Block' + goEgit.blocks;
    div.classList.add('block');
    textArea.classList.add('BlockTextArea');

    p.innerText = blocks[n].item;
    textArea.value = strToText(n, type);

    div.append(p, textArea);
    fragment.append(div);
    return fragment;
}