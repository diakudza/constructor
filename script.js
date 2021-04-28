
let textArea = document.getElementById('textArea');
let btn1 = document.getElementById('torcovka');
let btn2 = document.getElementById('centrovka');
let btn3 = document.getElementById('sverlo');
let btn4 = document.getElementById('rezba');

function strToText(n) {
    var arr = blocks[n].split(';');
    return arr.join('\n');
}

btn1.onclick = function () { textArea.innerHTML += strToText('centr'); };
btn2.onclick = function () { textArea.innerHTML += strToText('torcovka'); };
btn3.onclick = function () { textArea.innerHTML += strToText('sverlo'); };
btn4.onclick = function () { textArea.innerHTML += strToText('rezba'); };