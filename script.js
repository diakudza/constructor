
let textArea = document.getElementById('textArea');
let divWithBtn = document.getElementById('divWithBtn');

function strToText(n) {
    var arr = blocks[n].split(';');
    return arr.join('\n');
}
let goEgit = {
    start: 0,
    generate() { //метод запуска рендера кнопок
        if (goEgit.start === 0) {
            generateBtn();
            document.getElementById('generate').remove();


        }
    }
}

function generateBtn() {
    for (let oper in blocks) {
        let btn = document.createElement('button');
        btn.id = oper;
        btn.innerText = oper;
        btn.onclick = btnDo;
        divWithBtn.append(btn);
    }
}

function btnDo(e) {
    textArea.innerHTML += strToText(e.target.id);
};
