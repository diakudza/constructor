let blocks = {
    centr: "N14(CENTROVKA);T1400;G97S1300M3;M68;G0G99X0.0Z-2.0(Z-5.0)T14;M69;M1;M77;G1Z#109F0.03;G4U0.2;M68;G1Z-1.0F0.5;G0Z-2.0(Z-3.0);M69;M78;G0T0;M1",
    sverlo: "N13(SVERLO);T1300;G97S1000M3;G0G99X0.0Z-1.0T13;G83Z5.5R-1.0Q2000F0.03;G80;M68;G0Z-2.0;M69;G0T0;M1",
    torcovka: "N301(TORCEVANIE);G10P3Q4R#501;T300;G97S1300M#502;G1G99X#531Z-1.0F1.0T3;G42G1U-1.0Z0.0F0.03;G1X-[#501*2.0]F0.04;G40G1W-1.0F0.2;M68;G0X60.0W-1.0;M69;G0T0;M1",
    rezba: "N400(REZBA);IF[#4EQ0]GOTO100;#30=#24*[0.5/TAN[30.0]]*[17.0/24.0];(GLYBINA VREZANIA NARYGNAIA,P);T400;G97S800M3;M68;G0G99X#531Z#17T4;M69;G0X[#107+1.0];G76P030060Q#19R#20;G76X[#107-#30*2.]Z[#106]Q#18P[FIX[#30*1000]]F#24;G0X#531Z-2.0;G0X60.0;G0T0;M1"
}
