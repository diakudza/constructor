let textArea = document.getElementById('textArea');
let textVariables = document.getElementById('textVariables');
let divWithBtn = document.getElementById('divWithBtn');
let divBlocks = document.getElementsByClassName('divBlocks')[0];
class Oper {

    constructor(n) {
        this.name = n;
        this.title = blocks[n].item;
        this.code = blocks[n].code;
        this.variables = blocks[n].variables;
        this.idArr = massOfOper.length;//место в массиве, для поиска;
    }
    showCode() {
        console.log(this.item.code);
    }
    createBlock(item, type, classBlock = "block") {
        let fragment = new DocumentFragment(),
            p = document.createElement('p'),
            span = document.createElement("span"),
            textArea = document.createElement("textarea"),
            divWrapBlock = document.createElement("div"),
            btn = document.createElement('button');
        div = document.createElement("div");
        gO.blocks++;
        divWrapBlock.id = n + 'Block' + gO.blocks;
        divWrapBlock.classList.add('block');
        divWrapBlock.dataset.name = n;
        divWrapBlock.classList.add(classBlock);
        textArea.classList.add('BlockTextArea');
        btn.onclick = gO.removeBlock;
        btn.classList.add('btnClose');
        btn.innerHTML = '&#10060;';
        div.classList.add('divLayout');
        p.innerText = blocks[n].item;
        if (n == 'protochka') {
            let startBlock = document.createElement('textarea');
            let middleBlock = document.createElement('textarea');
            let endBlock = document.createElement('textarea');
            middleBlock.id = 'protochkaMiddleText';
            startBlock.value = blocks[n].code.start.split(';').join('\n');
            middleBlock.value = '';//blocks[n].code['1'].split(';').join('\n');
            endBlock.value = blocks[n].code.end.split(';').join('\n');
            div.append(btn, p, startBlock, createBtnForProtochka(), middleBlock, endBlock);
            divWrapBlock.append(p, div);
            fragment.append(divWrapBlock);
            return fragment;
        }
        textArea.value = strToText(n, type);
        if (n == 'standart') {
            div.append(p, textArea);
        } else {
            div.append(btn, p, textArea);
        }

        divWrapBlock.append(p, div);
        for (variable in blocks[n].variables) {
            gO.addHeadVar(variable, blocks[n].variables[variable].value, blocks[n].variables[variable].comment);
        }
        fragment.append(divWrapBlock);
        return fragment;
    }

    createBtn() {
        let btn = document.createElement('button');
        btn.id = this.name;
        btn.innerText = this.title;
        btn.onclick = gO.btnDo;
        btn.dataset.idArr = this.idArr;
        divWithBtn.append(btn);
    }
    removeBlock() { }
    exportCodeInArr() { }
}
let massOfOper = [];
for (let oper in blocks) {
    massOfOper.push(new Oper(oper));
}
console.log(massOfOper);

let gO = {
    start: 0,
    blocks: 0,
    hasCut: 0,

    /**метод запуска рендера кнопок и шапки */
    generate() {
        if (gO.start === 0) {
            this.start = 1;

            for (let i of massOfOper) {
                i.createBtn();
            }

            let btnSave = document.createElement('a');
            btnSave.id = 'save';
            btnSave.innerText = 'Собрать файл';
            btnSave.onclick = this.generateProg;
            divWithBtn.append(btnSave);
        };

        divBlocks.append(gO.createHeadBlock());
        // divBlocks.append(standart.createBlock('standart', 'code', 'head'));
    },

    /** Функция создает первый блок (шапку программы) */
    createHeadBlock() {
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
                spanVar.innerHTML = 'Name';
                span = '';
                input.value = standart.name;
                input.style = 'width:250px;';
            } else {
                spanVar.innerText = variables;
                spanVar.style = 'width:30px;';
                span.innerHTML = standart[variables].comment;
                input.value = standart[variables].value;
            }
            divWrap.append(spanVar, input, span)
            divLayout.append(divWrap);

        }
        div.append(title, divLayout);
        fragment.append(div);
        return fragment;
    },

    btnDo(e) {
        if (gO.hasCut == 1) {
            alert('После отрезки блоки добавлять нельзя!');
            return;
        }
        let textArea = document.getElementById('textArea');
        let textVariables = document.getElementById('textVariables');
        if (e.target.id == 'cut') {
            if (gO.hasCut !== 1) {
                gO.hasCut = 1;
                divBlocks.append(createBlock(e.target.id, 'code', 'end'));
            } else {
                alert('Вы уже добавил отрезку!');
            }
        } else {
            divBlocks.append(createBlock(e.target.id, 'code').bind(massOfOper[e.target.dataset.idArr]));
        }
    },
    /** склеиваем собранную прогрмамму в массив, и выводим в файл */
    generateProg() {
        existProg[0] = '', existProg[1] = '';
        dlinaDetail();
        getExistHead();
        getBlockText();
        let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(existProg[0] + existProg[1].split(';').join('\n'));
        this.href = myData;
        this.download = 'O0020.txt';
    },
    /** удаляет выбранный блок */
    removeBlock(e) {
        let block = e.target.parentNode;
        if (e.target.parentNode.parentNode.id.substr(0, 3) == 'cut') {
            go.hasCut = 0;
        }
        let oper = e.target.parentNode.parentNode.dataset.name;

        block.parentNode.remove();
        //надо удалить переменные из шапки..


    },
    /** добавляет переменные из блока в шапку */
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

window.onload = gO.generate;