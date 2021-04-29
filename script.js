
let textArea = document.getElementById('textArea');
let textVariables = document.getElementById('textVariables');

let divWithBtn = document.getElementById('divWithBtn');


let goEgit = {
    start: 0,
    generate() { //метод запуска рендера кнопок
        if (goEgit.start === 0) {
            generateBtn();
            document.getElementById('generate').remove();


        };
        generateStandartVar();
    }
}
function generateStandartVar() {
    for (let variables of standart) {
        textVariables.innerHTML += variables + '\n';
    }
}

function generateBtn() {
    for (let oper in blocks) {
        let btn = document.createElement('button');
        btn.id = oper
        btn.innerText = blocks[oper].item;
        btn.onclick = btnDo;
        divWithBtn.append(btn);
    }
}

function btnDo(e) {
    textArea.innerHTML += strToText(e.target.id, 'code');
    textVariables.innerHTML += strToText(e.target.id, 'variables');
};

function strToText(n, type) {
    let arr = blocks[n][type].split(';');
    return arr.join('\n');
}