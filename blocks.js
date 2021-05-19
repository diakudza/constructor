let standart = {//стандартные перменные, будут вставляться всегда в шапку

    name: 'O0001(BOLT/VINT UNI - HD1)',
    '#1': { value: 0, comment: '(0-KR,1-SK)' },
    '#2': { value: 10.0, comment: '(RAZMER ZAGOTOVKI)' },
    '#530': { value: 0, comment: '(DLINA DETALI)' },
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
    '#531': { value: 0, comment: '(DIAM ZAGOTOVKI+1mm)' },
};

let blocks = {
    //Объекст со стандартными блоками
    centr: {//название блока, используется для вставок в id кнопок и поиска
        item: "Центровка", //Обозначение блока на русском
        variables: {
            '#109': { value: 0, comment: '(IF LT0 HD2)(GLUBINA CENTROVKI)' }//переменные для блока, добавляются в шапку программы
        },
        code: "N14(CENTROVKA);T1400;G97S1300M3;M68;G0G99X0.0Z-2.0(Z-5.0)T14;M69;M1;M77;(M300);G1Z#109F0.03;G4U0.2;M68;G1Z-1.0F0.5;(M301);G0Z-2.0(Z-3.0);M69;M78;G0T0;M1; ;"//код блока
    },
    centrPoperechnaia: {
        item: "Центровка поперечная", 
        variables: {
            '#5': {value:1.2 , comment: '(DI SVERLA T3300)'},
            '#116': {value:20.0 , comment: '(Z DO OSI SVERLA)'}
                    },
        code: "N3331(CENTROVKA STAR-16,20);T3300;M5(STOP GLAVNII SPINDEL);M8(YPRAVLENIE OSI C VKLIUCENO);(G101)(PODACA MM/OB DLIA PRIVODNOGO INSTRYMENTA STAR-16);M36S2000;G28H0.0;G50C0(NASTR KOORD SYS);M68;G0X#531Y0.0C-5.0Z[#116]T33;M69;M6(ZAG GL SP VKL PRI M5);M1;G1X[#531]F0.03;G1X[#2-#5-3.0]F0.03;G1U-1.1;G4U0.1;G0X#531;M7(ZAG GLAV SP VIKL);G0H180.0;M6(ZAG GLAV SP VKL PRI M5);G1X[#2+1.0]F0.03;G1X[#2-#5-3.0]F0.03;G1U-1.1;G4U0.1;G0G99X#531;G0X20.0;M9(OS C VIKL);M38(PR SPL STOP);G0T0;M1;G99G97G40M9; ;"
    },
    sverlo: {
        item: "Сверло за 1 раз",
        variables: {
            '#7': {value:5.0 , comment: '(DIAMETR SVERLA)'}
        },
        code: "N13(SVERLO);T1300;G97S1000M3;G0G99X0.0Z-1.0T13;G83Z5.5R-1.0Q2000F0.03;G80;M68;G0Z-2.0;M69;G0T0;M1; ;"
    },
    sverloCikl: {
        item: "Сверления циклом",
        variables: {
            '#23': {value:10.0 , comment: '(GLYBINA OTVERSTIA,ESLI #23=#530-OTVERSTIE SKVOZNOE)'},
            '#7': {value:5.0 , comment: '(DIAMETR SVERLA)'},
            '#506': {value:18.0 , comment: '(SKOROST REZANIA NA SVERLO T1300)'},
            '#507': {value:0.06 , comment: '(PODACHA NA SVERLO T1300)'}
        },
        code: "N13(SVERLENIE CIKL GLYBOKOGO SVERLENIA);IF[#23EQ#530]THEN#23=[#530+#510+#509+3.0];#25=FUP[#23/#7](KOL-VO RAZ);#26=#23/#25(PRIRASHENIE Z);T1300;G97S[FIX[[#506*1000.0]/[3.14*#7]]]M3;M68;G0G99X0.0Z-1.0T13;M69;M1;(M162);WHILE[#25GE1]DO1;#27=[#23-#26*[#25-1.0]];#28=[#23-#26*[#25-1.0]-2.0];G1Z[ROUND[#27]]F#507;G4U0.1;M68;IF[#25EQ1.0]GOTO131;G0Z-2.0;M69;G4U1.0;G1Z[ROUND[#28]]F1.0;#25=[#25-1.0];END1;M68;M172;N131;G1Z-1.0F0.5;M172;G0Z-2.0;M69;G0T0;M1; ; "
    },
    sverloPoperechnoe: {
        item: "Сверло поперечное",
        variables: {
            '#5': {value:1.2 , comment: '(DI SVERLA T3300)'},
            '#134': {value:10.0 , comment: '(SKOROST REZANIA NA SVERLE)'},
            '#114': {value:0.02 , comment: '(PODACHA NA SVERLE)'}
        },
        code: "N3334(POPERECNOE SVERLENIE);T3400;M5;M8;(G101 STAR-16);M36S[FIX[[#134*1000.]/[3.14*#5]]];G28H0.0;G50C0;G0X#531Y0.0C-5.0Z[#103-#116]T34;M6;G1X[#2+1.0]F0.2;G4U0.1;G1X-2.0(+3.0)Q2000F#114;G80;G1X[#107+1.0]F1.0;G0G99X#531;M7(ZAG GLAV SP VIKL);G0H180.0;M6(ZAG GLAV SP VKL PRI M5);G1X[#2+1.0]F0.2;G4U0.1;G1X-2.0(+3.0)Q2000F#114;G80;G1X[#107+1.0]F1.0;G0G99X#531;G0X20.0;M9(OS C VIKL);M38(PR SPL STOP);G0T0;M1; ;"
    },
    rastochka: {
        item: "Расточка",
        variables: {
            '#8': {value:10.0 , comment: '(DIAMETR RASTACIVAEMOGO OTVERSTIA)'},
            '#112': {value:0.02 , comment: '(PODACHA NA RASTOCHKU)'},
            '#114': {value:0.4, comment: '(FASKA V OTVERSTII)'},
            '#121': {value:20.0 , comment: '(SKOROST REZANIA T1200)'},
            '#124': {value:0.25 , comment: '(PRIPYSK.NA.STORONY)'}
        },
        code: "N21300(T1200 RASTOCHKA,KORREKTOR T12);T1200;G96S#121M3;M68;G0G99X#7Z-1.0T12;M1;IF[[[#8-#7]/2.]GT#124]GOTO21310;GOTO21330;N21310(PEREHOD);(RASTOCKA BEZ FASKI CIKL);(RASTOCHKA PREDVARITELNO);(RASTOCKA BEZ KOMPENSACII RADIUSA);#27=[#8-#7]/2.0(RASCET PRIPYSKA NA OBRABOTKY NA STORONY);#28=FUP[#27/#124](KOL-VO PROHODOV);#29=#27/#28(PRIRASHENIE PO X NA STORONY,DEISTVITELNII PRIPYSK);WHILE[#28GE1.]DO1;M1;G1X[ROUND[#8-#29*2.*[#28-1.0]]]F#112;G1Z[#530+0.4]F#112;G1U-0.1;M68;G0Z-2.0;M69;IF[#28EQ1.0]GOTO21315;#28=[#28-1.0];M1;END1;N21315(KONEC RASTACHIVANIA);GOTO21398;N21320(RASTOCKA BEZ FASKI);IF[#114GT0]GOTO21330;G1Z[#530+#510]F#112;G1U-0.2;M68;G0Z-1.0;M69;N21325;GOTO21398;N21330(RASTOCKA S FASKOI BEZ KOMPENSACII RADIUSA);G0X[#8+#114*2.0+0.2];M1;G1Z-0.1F#112;G1X#8W[#114+0.1];G1Z[#530+0.3]F#112;G1X[#8-0.1];M68;G0Z-1.0;M69;N21335;GOTO21398;N21398;G0T0;M1; ;"
    },
    torcovka: {
        item: "Торцовка",
        code: "N301(TORCEVANIE);G10P3Q4R#501;T300;G97S1300M#502;G1G99X#531Z-1.0F1.0T3;G42G1U-1.0Z0.0F0.03;G1X-[#501*2.0]F0.04;G40G1W-1.0F0.2;M68;G0X60.0W-1.0;M69;G0T0;M1; ;"
    },
    protochka: {
        item: "Проточка",
        variables: {
            '#111': { value: 0.8, comment: '(DLINA FASKI POD REZBY)' },
            '#32': { value: 0.1, comment: '(OTKL OT DIAM REZBY DLIA PROTOCHKI)' },
            '#108': { value: 3.93, comment: '(DIAMETR GLADKOI CASTI)' }
        },
        code: {
            start: "N315;G10P3Q4R#501;T300(PROTOCHKA);G96S#503M#502;M68;G0G99X#531Z-1.0T3;M69;M161;G42G1U-0.9Z0.0F0.05;G1X-#501F#505;G96S#503; ;",
            '1': {
                id: 1,
                img: '1.png',
                title: 'фаска и проточка',
                code: '(kontur1);G41G1X[[#107-#32]-#111*2.0];G1U[#111*2.0]W#111F[#505/2.0];G1Z[#106-ROUND[[#108-#129]*0.866]-ROUND[[#107 -#32-#129]*0.866]]F#505;G1Z[#106-ROUND[[#108-#129]*0.866]]X#129;G1Z#106X#108; ;',
            },
            '2': {
                id: 2,
                img: '4.png',
                title: 'проточка после резьбы',
                code: '(kontur2);G41G1X[[#107-#32]-#111*2.0];G1U[#111*2.0]W#111F[#505/2.0];G1Z[#106-ROUND[[#108-#129]*0.866]-ROUND[[#107 -#32-#129]*0.866]]F#505;G1Z[#106-ROUND[[#108-#129]*0.866]]X#129;G1Z#106X#108; ;',
            },
            '3': {
                id: 3,
                img: '5.png',
                title: 'радиус под головой',
                code: '(kontur3);G41G1X[[#107-#32]-#111*2.0];G1U[#111*2.0]W#111F[#505/2.0];G1Z[#106-ROUND[[#108-#129]*0.866]-ROUND[[#107 -#32-#129]*0.866]]F#505;G1Z[#106-ROUND[[#108-#129]*0.866]]X#129;G1Z#106X#108; ;',
            },
            '4': {
                id: 4,
                img: '5.png',
                title: 'тело и голова под отр.',
                code: '(kontur4);G1G99X#531Z[#106-2.0]T3F1.0;M69;M161;G96S#503G41G1X[#108+0.05]W[#501]F0.06;Z[#103],A0.0,R#105;X[#119-0.25],A#135,R#130F0.08;Z[#530+#510+#509],A0.0F0.1;G1X#531W1.0F0.04;M171;M68;G40G0X60.0;M69;G0T0;M1; ;',
            },
            '5': {
                id: 5,
                img: '6.png',
                title: 'Винт не выпадающий без р.',
                code: '(kontur5);G1X-0.5F#505;G41,A90.0,R0.3F0.03;G1Z#111X#129,A20.0;G1,A0.0;G1Z[#106]X#108,A330.0;G1Z[#103-#105],A0.0;G3W#105U[#105*2.0]R#105;G1X[#119-#130*2.0];G2W#130U[#130*2.0]R#130;G1Z[#530+#509+#510]; ;',
            },
            '6': {
                id: 6,
                img: '4.png',
                title: 'Болт кр. без рез.',
                code: '(kontur6);G96S#503G41G1,A90.0,R#117F0.03;Z#111X#129,A#123F0.02;,A0.0F0.03;Z#106X#108,A30.;Z[#530-#104],A0.0,R#105;X#119,A#135,R#130F0.02;G1Z[#530+#510+#509],A0.0F0.03; ;',
            },
            '7': {
                id: 7,
                img: '4.png',
                title: 'Болт шк. без рез.',
                code: '(kontur7);G96S#503G41X[#129-ROUND[[#111*TAN[#123]]*2.]],R0.3;G1X#129Z#111F0.03;Z[#106-0.5];G3W0.5U1.0R0.5;G40G1X[#108-0.3];G41G1X#108W0.3;GOTO1252;G1Z[#106-ROUND[[#108-#129]*0.866]];Z#106X#108;N1252;G1Z[#103-#105];G3W#105U[#105*2.0]R#105F0.02;G96S40(S60)G1X[#531]F0.03; ;',
            },
            '8': {
                id: 8,
                img: '4.png',
                title: 'Торцовка гайки',
                code: '(kontur7)G96S65M#502;G1G99X[#531+1.0]Z-1.0F1.0T3;G4U#4;G42G1U-0.4Z[#530+#509+#510]F0.03;G1X[#3*1.155-#122];G1,A180.0F0.03;G1Z0.0X[#3-0.3](X[#3-0.3]),A[270.0-#135];G1X-0.5F0.03;G1U-0.2Z-0.5;G40G1W-1.0F0.2;(udalit standartnii konec); ;',
            },

            end: 'G1X#531W1.0F0.05;M68;G0Z-2.0(Z-5.0);G0X60.0;G40;M69;M171;G0T0;M1; ;'
        }


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
            '#129': { value: 3.46, comment: '(DIAM POD NAKATKY)(DIAM POD NAREZ DLIA VINTOV)' },
            '#17': { value: -3.0, comment: '(NACH TOCHKA REZBY, Z, MM)' },
            '#18': { value: 80, comment: '(PRIPYSK PERVOGO PROHODA, Q, MKM)' },
            '#19': { value: 30, comment: '(CISTOVOI PROHOD, Q, MKM)' },
            '#20': { value: -0.12, comment: '(DOPYSK NA POSLEDNII PROHOD, R, MM)' }
        },

        code: "N400(REZBA);IF[#4EQ0]GOTO100;#30=#24*[0.5/TAN[30.0]]*[17.0/24.0];(GLYBINA VREZANIA NARYGNAIA,P);T400;G97S800M3;M68;G0G99X#531Z#17T4;M69;G0X[#107+1.0];G76P030060Q#19R#20;G76X[#107-#30*2.]Z[#106]Q#18P[FIX[#30*1000]]F#24;G0X#531Z-2.0;G0X60.0;G0T0;M1; ;"
    },
    frezSk: {
        item: "Фрезеровка ШК",
        variables: {
            "#3": { value: 7.0, comment: '(FREZ SK)(0-NE FREZ)' }
        },
        code: "N32(FREZEROVKA SK);T3200;M5;M8;M36S2000;G28H0.0;G0C14.0;G50C0;G0X#3Y[#531+6.0]Z[#103+2.5]C0.0T32;#29=3.0;WHILE[#29LE360.0]DO1;#29=#29+60.0;G0C#29;M6;G1X[#3-0.1]F0.2;G1Y-[#3*1.155+5.0]F0.03;G0Y[#3*1.155+5.0];G0X#531;M7;END1;G0G99X#531;M68;G0X60.0Z-1.0;M69;G18;M9;M38;G0T0;M1; ;"

    },
    frezShlic: {
        item: "Фрезеровка Шлица",
        variables: "",
        code: "N3100(MODYL FREZEROVANIA SLITZCA);G65P8060F#9; ;"
    },
    frezLisok: {
        item: "Фрезеровка Лысок",
        variables: {
            "#136": {value:2.0, comment: '(R FREZY)'},
            "#31":{value:0, comment: '(RAZMER LISOK)'},
            "#32":{value:2.5, comment: '(RAZMER DO LISOK)'}, 
            "#33":{value:5.0, comment: '(DL LISOK)'}
            
    },
        code: "N31(FREZEROVKA LISOK);G10P32Q0R#136;T3200;M5;M8;G98;(G101);M36S4000;G28H0.0;G50C0;G0X#531Y15.0C0.0Z[#32+#136]T32;M6;G1X#31F200;G1Y-8.0F40;G1Y0.0;G1Z[#32+#33-#136];G1Y8.0;G1Y-15.0;M7;G0H180.0;G1Z[#32+#136]F40;M6;G1Y8.0F40;G1Y0.0;G1Z[#32+#33-#136];G1Y-8.0;G1Y15.0;G1X24.0F200;G0Z-11.0;G0G99X#531;G18;M9;M38;G0T0;M1; ;"
    },
        
    nakatka: {
        item: "Накатка",
        variables: "",
        code: "N2(NAKATKA);T200;G97S1500M3T2;G0G99X#531;G1Z[#530+0.7];G1X8.3F.1;G4U2.;G0X#531;G0T0;M1; ;"
    },
    metchik: {
        item: "Метчик",
        variables: {
            '#514': {value: 200, comment: '(OBOROTY NA METCHIK)'},
            '#126': {value:0.5, comment: '(SHAG METCHIKA)'},
            '#22': {value:8.0, comment: '(GLYBINA REZBY VNYTRENNEI)'}
    },
        code: "N11(MODYL GESTKOGO NAREZANIA REZBY METCHIKOM M29 G84);T1300(VIZOV METCHIKA);G97S#514M3;M68;G0G99Y0.0X0.0Z-2.0T13;M69;M1;(M304);G99M5;M29S#514;G84Z#22F#126;G80;M68;G0Z-2.;M69;(M305);G0T0;M1; ;"
    },
    kanavka: {
        item: "Канавка",
        variables: {
            '#30': {value: 3.0, comment: '(SHIRINA KANAVKI)'},
            '#31': {value: 10, comment: '(Z DO KANAVKI)'},
            '#32': {value: 2, comment: '(SHIRINA KANAVOCHNOGO)'},
            '#33': {value: 10, comment: '(DIAMETR KANAVKI)'}
        },
        code: "N200(KANAVKA);T200(KANAVKA);G96S30M3;G0G99X#531Z-3.0T6;G0Z[#31];G1X#33F0.03;G4U0.2;G0X#531;G0W[#30-#32];G1X#33;G4U0.2;G0X#531;G0X60.0;G0T0;M1; ;"
    },
    cut: {
        item: 'Отрезка',
        variables: '',
        code: 'N100(OTREZKA);G0G99G40G97M9(STANDART);T100;G97S1000M4(+M4+);G0G99X#531Z[#530+#510+#509]T1;M82;M40;G1X[#531-2.0]F0.015;G1X2.0F#511;G1X-#528F0.015;M41;M83;M80;/M98P7016;M81;G97S500M4(+M4+);M11;G4U0.3;G0Z-0.15T0;M10;G4U0.3;M5;G0W-0.2;G4U0.2;GOTO99;M99;%;'
    },
    standart: {
        item: 'Стандарт',
        code: 'G0G99G40G97M9(STANDART);G80M22;M98P6016;N99(PROGRAMM START);G99G97G40M9;G50S3000;M200(WARTECODE);M20(ONE CYCLE);/M25;G97S2000M3;M68;G1G99X#531W-12.0T0F1.0;M69;M27;G4U0.1; ;'
    }



}

let existProg = ['%\n', ''];//собранный массив с готовой программой

