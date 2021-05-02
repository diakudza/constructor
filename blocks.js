let standart = {//стандартные перменные, будут вставляться всегда в шапку
    //standart['#1'].value
    name: 'O0001(BOLT/VINT UNI - HD1)',
    '#1': { value: 0, comment: '(0-KR,1-SK)' },
    '#2': { value: 10.0, comment: '(RAZMER ZAGOTOVKI)' },
    '#530': { value: 0, comment: '(DLINA DETALI)' },
    '#103': { value: 20.0, comment: '(DL DO GOLOVI)' },
    '#104': { value: 2.8, comment: '(DLINA GOLOVY)' },
    '#119': { value: 8.05, comment: '(DIAMETR BYRTA)' },
    '#130': { value: 0.3, comment: '(R PR BURTA)' },
    '#135': { value: 90.0, comment: '(NAKLON GOLOVY / YGOL FASKI NA SK)' },
    '#32': { value: 0.1, comment: '(OTKLONENIE OT DIAMETRA REZBY DLIA PROTOCHKI)' },
    '#501': { value: 0.2, comment: '(RADIUS PROHODNOI PLASTINY)' },
    '#502': { value: 4, comment: '(NAPRAVLENIE VRASHENIA M3 / M4)' },
    '#503': { value: 20, comment: '(SKOROST REZANIA DLIA PROHODNOGO)' },
    '#505': { value: 0.02, comment: '(PODACHA DLIA PROHODNOGO)' },
    '#529': { value: 1500, comment: '(OBOROTY NA OTREZKE)' },
    '#510': { value: 3.0, comment: '(SHIRINA OTREZNOGO)' },
    '#511': { value: 0.03, comment: '(PODACHA NA OTREZKE)' },
    '#509': { value: 0, comment: '(PRIPUSK NA HEAD - 2)' },
    '#528': { value: 1.0, comment: '(OTREZAT DO X -)' },
    '#508': { value: 11.0, comment: '(15.0++ +)(OVER - TRAVEL Z1)' },
    '#531': { value: 0, comment: '(DLINA DETALI)' },
};

// IF[#530EQ0]THEN#530=[#103+#104](DLINA DETALI)
// IF[#106EQ0]THEN#106=[#530-#104](DLINA T,L0)
// IF[#1EQ0]THEN#531=[#2+1.0](DIAM ZAGOTOVKI KRYG+1MM)
// IF[#1EQ1]THEN#531=[#2*1.155+1.0](DIAM ZAGOTOVKI SK+1MM)


let blocks = {
    //Объекст со стандартными блоками
    centr: {//название блока, используется для вставок в id кнопок и поиска
        item: "Центровка", //Обозначение блока на русском
        variables: {
            '#109': { value: 0, comment: '(IF LT0 HD2)(GLUBINA CENTROVKI)' }//переменные для блока, добавляются в шапку программы
        },
        code: "N14(CENTROVKA);T1400;G97S1300M3;M68;G0G99X0.0Z-2.0(Z-5.0)T14;M69;M1;M77;(M300);G1Z#109F0.03;G4U0.2;M68;G1Z-1.0F0.5;(M301);G0Z-2.0(Z-3.0);M69;M78;G0T0;M1; ;"//код блока
    },

    sverlo: {
        item: "Сверло за 1 раз",
        variables: {},
        code: "N13(SVERLO);T1300;G97S1000M3;G0G99X0.0Z-1.0T13;G83Z5.5R-1.0Q2000F0.03;G80;M68;G0Z-2.0;M69;G0T0;M1; ;"
    },
    torcovka: {
        item: "Торцовка",
        code: "N301(TORCEVANIE);G10P3Q4R#501;T300;G97S1300M#502;G1G99X#531Z-1.0F1.0T3;G42G1U-1.0Z0.0F0.03;G1X-[#501*2.0]F0.04;G40G1W-1.0F0.2;M68;G0X60.0W-1.0;M69;G0T0;M1; ;"
    },
    protichkaPodRezbu: {
        item: "Проточка под резьбу болт",
        variables: {
            '#111': { value: 0.8, comment: '(DLINA FASKI POD REZBY)' },
            '#32': { value: 0.1, comment: '(OTKLONENIE OT DIAMETRA REZBY DLIA PROTOCHKI)' },
            '#108': { value: 3.93, comment: '(DIAMETR GLADKOI CASTI)' }
        },
        code: "N315;G10P3Q4R#501;T300(PROTOCHKA POD REZBY NA STANKE, BOLT);G96S#503M#502;M68;G0G99X#531Z-1.0T3;M69;M161;G42G1U-0.9Z0.0F0.05;G1X-#501F#505;G96S#503;G41G1X[[#107-#32]-#111*2.0];G1U[#111*2.0]W#111F[#505/2.0];G1Z[#106-ROUND[[#108-#129]*0.866]-ROUND[[#107 -#32-#129]*0.866]]F#505;G1Z[#106-ROUND[[#108-#129]*0.866]]X#129;G1Z#106X#108;G1X#531F0.05;M68;G0Z-2.0(Z-5.0);G0X60.0;G40;M69;M171;G0T0;M1; ;"

    },


    rezba: {
        item: "Резьба",
        variables: {
            '#4': { value: 1, comment: "(1-REZBA,0-BEZ REZBY)" },
            '#107': { value: 4.0, comment: '(NOMINALNII DIAMETR REZBY)' },
            '#24': { value: 0.7, comment: '(SHAG REZBY)' },
            '#106': { value: 14.2, comment: '(DLINA REZBY PO Z)' },
            '#111': { value: 0.8, comment: '(DLINA FASKI POD REZBY)' },
            '#123': { value: 20.0, comment: '(UGOL FASKI POD REZBU)' },
            '#117': { value: 0.2, comment: '(RADIYS SKRYGLENIA YGLA)' },
            '#129': { value: 3.46, comment: '(DIAMETR POD NAKATKY)(DIAM POD NAREZ DLIA VINTOV)' },
            '#17': { value: -3.0, comment: '(NACHALNAIA TOCHKA REZBY, Z, MM)' },
            '#18': { value: 80, comment: '(PRIPYSK PERVOGO PROHODA, Q, MKM)' },
            '#19': { value: 30, comment: '(CISTOVOI PROHOD, Q, MKM)' },
            '#20': { value: -0.12, comment: '(DOPYSK NA POSLEDNII PROHOD, R, MM)' }
        },

        code: "N400(REZBA);IF[#4EQ0]GOTO100;#30=#24*[0.5/TAN[30.0]]*[17.0/24.0];(GLYBINA VREZANIA NARYGNAIA,P);T400;G97S800M3;M68;G0G99X#531Z#17T4;M69;G0X[#107+1.0];G76P030060Q#19R#20;G76X[#107-#30*2.]Z[#106]Q#18P[FIX[#30*1000]]F#24;G0X#531Z-2.0;G0X60.0;G0T0;M1; ;"
    },
    frezSk: {
        item: "Фрезеровка ШК",
        variables: {
            "#3": { value: 7.0, comment: '(FREZ SK)(0-NE FREZ)' },
            code: "N32(FREZEROVKA SK);T3200;M5;M8;M36S2000;G28H0.0;G0C14.0;G50C0;G0X#3Y[#531+6.0]Z[#103+2.5]C0.0T32;#29=3.0;WHILE[#29LE360.0]DO1;#29=#29+60.0;G0C#29;M6;G1X[#3-0.1]F0.2;G1Y-[#3*1.155+5.0]F0.03;G0Y[#3*1.155+5.0];G0X#531;M7;END1;G0G99X#531;M68;G0X60.0Z-1.0;M69;G18;M9;M38;G0T0;M1; ;"
        }
    },
    protochkaDoGoloviSK: {
        item: "Проточка до головы ШК",
        variables: {
            '#108': { value: 3.93, comment: '(DIAMETR GLADKOI CASTI)' },
            '#105': { value: 0.2, comment: '(RADIYS POD GOLOVOI)' },
            '#31': { value: 0.25, comment: '(OTKLONENIE DIAMETRA FASKI OT SK T300)' }
        },
        code: "N325;T300(PROTOCHKA DO GOLOVY S FASKOI NA SK);G96S80M#502;G0G99X#531Z[#106-2.0]T3;M161;G41G1X[#107-#32-0.05]W[#501]F0.04;G1Z[#106-0.1]X[#108-0.015];G1Z[#106+1.5]X#108F0.03;G1Z[#103-#105]F0.03;G3W#105U[#105*2.0]R#105;G1X[#531];G40G0W1.0U2.0;G42G1X[#531]Z[#103+[#531/2.-#2/2. +#31/2.]/TAN[90.-#135]]F0.2;G1X[#2-#31-#501*2.0]Z[#103-#501/TAN[90.-#135]]F0.06;G41G1X#531;M171;M68;G40G0X60.0W-2.0;M69;G0T0;M1; ;"
    },
    frezShlic: {
        item: "Фрезеровка Шлица",
        variables: "",
        code: "N3100(MODYL FREZEROVANIA SLITZCA);G65P8060F#9; ;"
    },
    cut: {
        item: 'Отрезка',
        variables: '',
        code: 'N100(OTREZKA);G0G99G40G97M9(STANDART);T100;G97S1000M4(+M4+);G0G99X#531Z[#530+#510+#509]T1;M82;M40;G1X[#531-2.0]F0.015;G1X2.0F#511;G1X-#528F0.015;M41;M83;M80;/M98P7016;M81;G97S500M4(+M4+);M11;G4U0.3;G0Z-0.15T0;M10;G4U0.3;M5;G0W-0.2;G4U0.2;GOTO99;M99;%;'
    },
    standart: {
        item: 'Стандарт',
        code: 'G0G99G40G97M9(STANDART);G80M22;M98P6016;N99(PROGRAMM START);G99G97G40M9;G50S3000;M200(WARTECODE);M20(ONE CYCLE);/M25;G97S2000M3;M68;G1G99X#531W-12.0T0F1.0;M69;M27;G4U0.1;'
    }



}

let existProg = ['',
    '',
    '',
    ''
];//собранный массив с готовой программой

