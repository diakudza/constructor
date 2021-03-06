let divWithBtn = document.getElementById('divWithBtn');
let divBlocks = document.getElementsByClassName('divBlocks')[0];
class Oper {

    constructor(n) {
        this.item = n;
        this.title = blocks[n].item;
        this.code = blocks[n].code;
        this.variables = blocks[n].variables;
        this.idArr = massOfOper.length;//место в массиве, для поиска;
        this.img = blocks[n].img;
    }
    showCode() {
        console.log(this.item.code);
    }
    createBlock(item = this.item, code = this.code, classBlock = "block") {
        if (gO.hasCut === 1) {
            alert('Вы уже добавил отрезку!');
            return;
        }
        if (item === 'cut') {
            if (gO.hasCut !== 1) {
                gO.hasCut = 1;
                classBlock = 'end';
            }
        }
        let fragment = new DocumentFragment(),
            p = document.createElement('p'),
            textArea = document.createElement("textarea"),
            divWrapBlock = document.createElement("div"),
            btn = document.createElement('button'),
            div = document.createElement("div");
        gO.blocks++;
        divWrapBlock.id = item + 'Block' + gO.blocks;
        divWrapBlock.classList.add('block');
        divWrapBlock.dataset.name = item;
        divWrapBlock.classList.add(classBlock);
        textArea.classList.add('BlockTextArea');
        btn.onclick = gO.removeBlock;
        btn.classList.add('btnClose');
        btn.innerHTML = '&#10060;';
        div.classList.add('divLayout');
        p.innerText = blocks[item].item;
        if (item === 'groove') {
            let startBlock = document.createElement('textarea');
            let middleBlock = document.createElement('textarea');
            let endBlock = document.createElement('textarea');
            middleBlock.id = 'grooveMiddleText';
            startBlock.value = blocks[item].code.start.split(';').join('\n');
            middleBlock.value = '';//blocks[n].code['1'].split(';').join('\n');
            endBlock.value = blocks[item].code.end.split(';').join('\n');
            div.append(btn, p, startBlock, groove.createBtn(), middleBlock, endBlock);
            divWrapBlock.append(p, div);
            fragment.append(divWrapBlock);
            divBlocks.append(fragment);
            return;
        }
        textArea.value = blocks[item].code.split(';').join('\n');
        if (item === 'standart') {
            div.append(p, textArea);
        } else {
            div.append(btn, p, textArea);
        }

        divWrapBlock.append(p, div);
        for (let variable in blocks[item].variables) {
            gO.addHeadVar(variable, blocks[item].variables[variable].value, blocks[item].variables[variable].comment);
        }
        fragment.append(divWrapBlock);
        divBlocks.append(fragment);
    }

    createBtn() {
        let btn = document.createElement('button');
        let img = document.createElement('img');
        let span = document.createElement('span');
        img.src= 'img/'+this.img;
        btn.id = this.name;
        span.innerText += this.title;
        btn.append(img, span);

        btn.addEventListener('click', () => { massOfOper[this.idArr].createBlock() });
        btn.dataset.idArr = this.idArr;
        divWithBtn.append(btn);
    }
   // removeBlock() { }
   // exportCodeInArr() { }

}
let massOfOper = [];
let groove = {};

for (let oper in blocks) {
    massOfOper.push(new Oper(oper));
    if (oper === 'groove') {
        groove = new Oper(oper);
    }
}
groove.createBtn = function () {

    let div = document.createElement('div');
    div.classList.add('buttonsWrap');
    for (kontur in blocks.groove.code) {
        let img = document.createElement('img');
        let span = document.createElement('span');
        if (kontur === 'start' || kontur === 'end') { continue; }
        let btn = document.createElement('button');
        img.classList.add('grooveBtnImg');
        span.classList.add('grooveBtnSpan');
        span.innerHTML = blocks.groove.code[kontur].title;
        btn.dataset.kont = blocks.groove.code[kontur].id;
        img.src = 'img/' + blocks.groove.code[kontur].img;
        btn.onclick = groove.btnGroove;
        btn.classList.add('buttonsGroove');
        btn.append(img,span);
        div.append(btn);

    }
    return div;
}

groove.btnGroove = function (e) {
    let middleText = document.getElementById('grooveMiddleText');
    middleText.value += blocks.groove.code[e.target.dataset.kont].code.split(';').join('\n');
}
let gO = {
    start: 0,
    blocks: 0,
    hasCut: 0,
    progName: '',
    /**метод запуска рендера кнопок и шапки */
    generate() {
        if (gO.start === 0) {
            this.start = 1;

            for (let i of massOfOper) {
                if (i.item === 'standart') { continue; }
                i.createBtn();
            }

            let btnSave = document.createElement('a');
            btnSave.id = 'save';
            btnSave.innerText = 'Собрать файл';
            btnSave.onclick = gO.generateProg;
            divWithBtn.append(btnSave);
        };

        divBlocks.append(gO.createHeadBlock());//выводим блок HEAD
        massOfOper[massOfOper.length - 1].createBlock();//выводим блок Стандарт
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
            if (variables === "name") {
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

    /** склеиваем собранную прогрмамму в массив, и выводим в файл */
    generateProg() {
        existProg[0] = ''; existProg[1] = '';
        gO.dlinaDetail();
        gO.getExistHead();
        gO.getBlockText();
        let myData = 'data:application/txt;charset=utf-8,' + encodeURIComponent(existProg[0] + existProg[1].split(';').join('\n'));
        this.href = myData;
        this.download = gO.name;
    },
    /** удаляет выбранный блок */
    removeBlock(e) {
        let block = e.target.parentNode;
        if (e.target.parentNode.parentNode.id.substr(0, 3) === 'cut') {
            gO.hasCut = 0;
        }
        let oper = e.target.parentNode.parentNode.dataset.name;
        let arrOfVar = document.querySelectorAll('#headLayout > div');
        for (let item of arrOfVar) {
            for (let varOfBloc in blocks[oper].variables){
            if (item.id.substr(7) === varOfBloc){
                item.remove();
            }
        }
        }
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
    },
    dlinaDetail() {
        let typeM = document.getElementById('divWrap#1');
        let diam = document.getElementById('divWrap#2');
        let dlina = document.getElementById('divWrap#530');
        let diam1 = document.getElementById('divWrap#531');
        // let razmerZag = typeM.children[1].value;
        if(dlina.children[1].value === "0"){
            let par103 = document.getElementById('divWrap#103');
            let par104 = document.getElementById('divWrap#104');
            dlina.children[1].value = +par103+ +par104;
        }
        if (typeM.children[1].value === "1") {
            diam1.children[1].value = diam.children[1].value * 1.155 + 1.0;
        } else {
            diam1.children[1].value = +diam.children[1].value + 1.0;
        }
    },
    getExistHead() {
        let arrOfVar = document.querySelectorAll('#headLayout > div');
        for (let item of arrOfVar) {
            if (item.childNodes[1].name === 'name') {
                this.name = item.childNodes[1].value.substr(0,5);
                existProg[0] += `${item.childNodes[1].value}\n`;
                continue;
            }
            existProg[0] += `${item.childNodes[1].name}=${item.childNodes[1].value}${item.childNodes[2].innerHTML}\n`;
        }
    },
    getBlockText() {
        let div = document.querySelectorAll('.divBlocks > div:not(#head)');
        for (let item of div) {
            if(item.id === 'standartBlock1'){
                existProg[1] += `${item.childNodes[1].childNodes[0].value}`;//для стандартного блока
            }
            else if(item.dataset.name == 'groove'){
                existProg[1] += `${item.childNodes[1].childNodes[1].value+item.childNodes[1].childNodes[3].value+item.childNodes[1].childNodes[4].value}`;//для блока c проточками
            }
                else {
                existProg[1] += `${item.childNodes[1].childNodes[1].value}`;//для остальных блоков  
            }
    }
}
}

window.onload = gO.generate;