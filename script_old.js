let textArea = document.getElementById('textArea');
let textVariables = document.getElementById('textVariables');
let divWithBtn = document.getElementById('divWithBtn');
let divBlocks = document.getElementsByClassName('divBlocks')[0];
class Oper {

   constructor(n) {
      this.item = blocks[n];
   }
   showCode() {
      console.log(this.item.code);
   }
   createBlock(this.item, type, classBlock = "block") {
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

   createBtn() { }
   removeBlock() { }
   exportCodeInArr() { }
}


let oper1 = new Oper('centr');

let gO = {
   start: 0,
   blocks: 0,
   hasCut: 0,

   /**метод запуска рендера кнопок и шапки */
   generate() {
      if (gO.start === 0) {
         this.start = 1;
         gO.generateBtn();

         let btnSave = document.createElement('a');
         btnSave.id = 'save';
         btnSave.innerText = 'Собрать файл';
         btnSave.onclick = this.generateProg;
         divWithBtn.append(btnSave);
      };

      divBlocks.append(gO.createHeadBlock());
      divBlocks.append(createBlock('standart', 'code', 'head'));
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
   /**Функция смотрит, какие есть операции в объекте и генерирует кнопки*/
   generateBtn() {
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
   ,
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

/**Функция устанавливает переменную #531*/
function dlinaDetail() {
   let typeM = document.getElementById('divWrap#1');
   let diam = document.getElementById('divWrap#2');
   let dlina = document.getElementById('divWrap#531');
   // let razmerZag = typeM.children[1].value;
   if (typeM.children[1].value == "1") {
      dlina.children[1].value = diam.children[1].value * 1.155 + 1.0;
   } else {
      dlina.children[1].value = +diam.children[1].value + 1.0;
   }
}
/**
* Функция добавляет текст в поля textArea и textVariables
*/
function btnDo(e) {
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
      divBlocks.append(createBlock(e.target.id, 'code'));
   }
};
/** Функция вешает действия на кнопки в блоке "Проточка" */
btnProtochka = (e) => {
   let middleText = document.getElementById('protochkaMiddleText');
   middleText.value += blocks.protochka.code[e.target.dataset.kont].code.split(';').join('\n');
}

/**
* Функция получает свойсво обекта blocks[n] , делает из строки массив, возращает строку с переводом строки 
*@param n {blocks[n]} операция в обекте
*@param type { item|variable|code } выбор свойства операции
*/
function strToText(n, type) {
   let arr = blocks[n][type].split(';');
   return arr.join('\n');
}



/** Выводим кнопки с возможными операциями для проточки */
function createBtnForProtochka() {

   let div = document.createElement('div');
   div.classList.add('buttonsWrap');
   for (kontur in blocks.protochka.code) {
      if (kontur == 'start' || kontur == 'end') { continue; }
      let btn = document.createElement('button');
      btn.innerHTML = blocks.protochka.code[kontur].title;
      btn.dataset.kont = blocks.protochka.code[kontur].id;
      btn.onclick = btnProtochka;
      btn.classList.add('buttonsProtochka');
      div.append(btn);

   }
   return div;
}

/** Функция создает блок с операцией 
*@param n {blocks[n]} операция в обекте
*@param type { item|variable|} выбор свойства операции
*@param classBlock {задаем класс для создаваемого блока }
*/
function createBlock(n, type, classBlock = "block") {
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
/** читаем все изменения в шапке и пишем их в конечный массив */
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

/** Функция читает все текстовые поля в блоках и пишет все в массив */
function getBlockText() {
   let div = document.querySelectorAll('form > div:not(#head)');
   for (item of div) {
      existProg[1] += `${item.childNodes[1].childNodes[1].value}`;
   }
}

window.onload = gO.generate;