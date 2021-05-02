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

        divBlocks.append(createHeadBlock());
        divBlocks.append(createBlock('standart', 'code', 'head'));
    },
    generateProg() { //склеиваем собранную прогрмамму в массив, и выводим в файл
        existProg[0] = '', existProg[1] = '';
        getExistHead();
        getBlockText();
        let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(existProg[0] + existProg[1].split(';').join('\n'));
        this.href = myData;
        this.download = 'O0020.txt';
    },
    removeBlock(e) {
        let block = e.target.parentNode;
        block.parentNode.remove();
    },
    addHeadVar(va, value, comment) {
        if (document.getElementById('divWrap' + va)) {
            return;
        }
        let span = document.createElement('span');
        let input = document.createElement('input');
        let divWrap = document.createElement("div");
        let spanVar = document.createElement('span');
        divWrap.classList.add('divWrap');
        divWrap.id = 'divWrap' + va;
        input.type = 'text';
        spanVar.innerHTML = va;
        input.value = value;
        span.innerHTML = comment;
        input.name = va;
        input.classList.add('inputVar');
        let div = document.getElementById('headLayout');
        divWrap.append(spanVar, input, span);
        div.append(divWrap);
    }
}

/**
* Функция смотрит, какие есть операции в объекте и генерирует кнопки
*/
function generateBtn() {
    for (let oper in blocks) {
        if (oper == 'standart') {
            continue;
        }
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
    if (e.target.id == 'cut') {
        divBlocks.append(createBlock(e.target.id, 'code', 'end'));
    } else {
        divBlocks.append(createBlock(e.target.id, 'code'));
    }
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
    let divLayout = document.createElement("div");
    let div = document.createElement("div");
    let title = document.createElement('span');
    title.innerHTML = 'HEAD1';
    div.id = 'head';
    div.classList.add('block', 'head');
    divLayout.classList.add('divLayout');
    divLayout.id = 'headLayout';
    for (let variables in standart) {
        let span = document.createElement('span');
        let input = document.createElement('input');
        let divWrap = document.createElement("div");
        let spanVar = document.createElement('span');
        divWrap.classList.add('divWrap');
        divWrap.id = 'divWrap' + variables;
        input.type = 'text';
        input.name = variables;
        input.classList.add('inputVar');
        if (variables == "name") {
            spanVar = '';
            span.innerHTML = 'Name';
            input.value = standart.name;
            input.style = 'width:250px;';
        } else {
            spanVar.innerText = variables;
            spanVar.style = 'width:25px;';
            span.innerHTML = standart[variables].comment;
            input.value = standart[variables].value;
        }
        divWrap.append(spanVar, input, span)
        divLayout.append(divWrap);

    }
    div.append(title, divLayout);
    fragment.append(div);
    return fragment;
}

function createBlock(n, type, classBlock = "block") {
    let fragment = new DocumentFragment(),
        p = document.createElement('p'),
        span = document.createElement("span"),
        textArea = document.createElement("textarea"),
        divWrapBlock = document.createElement("div"),
        btn = document.createElement('button');
    div = document.createElement("div");
    goEgit.blocks++;
    divWrapBlock.id = n + 'Block' + goEgit.blocks;
    divWrapBlock.classList.add('block');
    divWrapBlock.classList.add(classBlock);
    textArea.classList.add('BlockTextArea');
    btn.onclick = goEgit.removeBlock;
    btn.innerHTML = 'Удалить';
    p.innerText = blocks[n].item;
    textArea.value = strToText(n, type);
    div.classList.add('divLayout');
    div.append(btn, p, textArea);
    divWrapBlock.append(p, div);
    for (variable in blocks[n].variables) {
        goEgit.addHeadVar(variable, blocks[n].variables[variable].value, blocks[n].variables[variable].comment);
    }
    fragment.append(divWrapBlock);
    return fragment;
}

function getExistHead() {
    let arrOfVar = document.querySelectorAll('#headLayout > div');
    for (item of arrOfVar) {
        if (item.childNodes[1].name == 'name') {
            existProg[0] += `${item.childNodes[1].value}\n`;
            continue;
        }
        existProg[0] += `${item.childNodes[1].name}=${item.childNodes[1].value}${item.childNodes[2].innerHTML}\n`;
    }
}
function getBlockText() {
    let div = document.querySelectorAll('form > div:not(#head)');
    for (item of div) {
        existProg[1] += `${item.childNodes[1].childNodes[1].value}`;
    }
}