import { Constants } from '../../utils/constants';

const imgLogoSvg = `
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="120px" height="150px" viewBox="0 0 835.000000 835.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,835.000000) scale(0.100000,-0.100000)"
fill="#545454" stroke="none">
<path d="M1170 4175 l0 -3835 3005 0 3005 0 0 2718 0 2719 -282 279 c-156 153
-377 372 -493 486 -115 113 -393 388 -617 610 -225 221 -512 505 -639 631
l-231 227 -1874 0 -1874 0 0 -3835z m3510 2420 l0 -1085 1085 0 1085 0 0
-2420 0 -2420 -2675 0 -2675 0 0 3505 0 3505 1590 0 1590 0 0 -1085z m555 634
c105 -103 357 -353 562 -556 204 -202 473 -468 597 -590 124 -122 226 -227
226 -233 0 -7 -260 -10 -805 -10 l-805 0 0 801 c0 762 1 801 18 788 9 -7 103
-97 207 -200z"/>
<path d="M5468 4763 c-21 -9 -38 -20 -38 -24 0 -5 -5 -9 -11 -9 -14 0 -79 -65
-100 -100 -39 -64 -46 -142 -24 -246 12 -53 86 -137 150 -170 52 -26 69 -29
149 -29 72 0 100 4 136 22 61 28 124 91 151 150 31 66 31 180 2 243 -20 43
-92 130 -107 130 -4 0 -14 7 -22 15 -9 8 -24 15 -34 15 -10 0 -22 5 -25 10
-10 16 -184 10 -227 -7z"/>
<path d="M3438 4315 c-20 -14 -43 -35 -49 -47 -7 -13 -15 -25 -18 -28 -3 -3
-26 -32 -50 -65 -25 -33 -48 -61 -53 -63 -4 -2 -8 -8 -8 -14 0 -10 -45 -71
-82 -112 -10 -11 -18 -23 -18 -27 0 -4 -6 -14 -12 -21 -7 -7 -33 -40 -58 -73
-25 -33 -48 -61 -52 -63 -5 -2 -8 -8 -8 -14 0 -9 -48 -76 -77 -106 -7 -7 -13
-17 -13 -21 0 -4 -8 -16 -18 -27 -34 -38 -132 -173 -132 -182 0 -6 -4 -12 -8
-14 -5 -1 -28 -30 -53 -63 -24 -33 -46 -62 -49 -65 -3 -3 -16 -22 -30 -42 -14
-21 -28 -38 -32 -38 -5 0 -8 -5 -8 -11 0 -6 -6 -17 -12 -24 -30 -33 -38 -45
-38 -54 0 -5 -4 -11 -8 -13 -5 -1 -42 -48 -82 -103 -40 -55 -77 -101 -82 -103
-4 -2 -8 -8 -8 -13 0 -6 -5 -15 -10 -22 -51 -60 -64 -76 -82 -107 -12 -19 -24
-37 -27 -40 -4 -3 -26 -32 -51 -65 -25 -33 -48 -62 -51 -65 -4 -3 -9 -15 -13
-27 -4 -13 -12 -23 -17 -23 -17 0 -10 -119 8 -148 24 -37 44 -57 70 -71 16 -8
498 -11 1825 -11 1519 0 1810 2 1849 14 57 17 89 37 89 53 0 7 4 13 9 13 5 0
16 22 24 50 12 40 12 56 3 82 -17 48 -36 80 -63 105 -12 12 -23 26 -23 32 0 5
-4 11 -8 13 -4 2 -23 23 -42 48 -19 25 -45 55 -57 67 -13 12 -23 24 -23 27 0
6 -33 47 -62 78 -10 10 -18 22 -18 27 0 5 -3 11 -7 13 -5 2 -21 19 -38 40 -61
74 -94 114 -132 159 -45 55 -57 70 -103 129 -19 25 -45 55 -57 67 -13 12 -23
26 -23 32 0 5 -4 11 -8 13 -4 2 -23 23 -42 48 -19 25 -38 47 -41 50 -3 3 -36
43 -74 90 -38 47 -71 87 -75 90 -3 3 -21 25 -40 50 -19 25 -39 50 -45 56 -22
24 -91 108 -105 128 -24 35 -64 71 -93 84 -35 15 -111 16 -140 1 -27 -13 -105
-97 -113 -121 -3 -10 -10 -18 -15 -18 -5 0 -9 -5 -9 -11 0 -6 -6 -17 -12 -24
-30 -33 -38 -45 -38 -55 0 -5 -3 -10 -7 -10 -5 0 -19 -17 -33 -38 -14 -20 -27
-39 -30 -42 -17 -17 -60 -80 -60 -89 0 -6 -4 -11 -9 -11 -5 0 -20 -17 -32 -37
-13 -21 -32 -48 -43 -60 l-19 -22 -24 27 c-12 15 -23 30 -23 34 0 4 -6 13 -13
20 -7 7 -38 49 -70 93 -31 44 -61 85 -67 92 -5 6 -46 63 -92 125 -45 62 -88
119 -95 126 -7 7 -13 17 -13 21 0 4 -8 16 -17 27 -10 10 -30 37 -44 59 -15 22
-38 54 -53 70 -14 17 -26 33 -26 37 0 4 -6 13 -12 20 -7 7 -30 34 -51 60 -20
26 -51 54 -69 62 -47 24 -116 19 -160 -9z m115 -455 c9 -11 17 -23 17 -26 0
-2 11 -17 25 -32 14 -15 25 -32 25 -39 0 -6 4 -13 8 -15 12 -4 122 -155 122
-167 0 -5 4 -11 8 -13 5 -1 42 -48 82 -103 40 -55 77 -101 82 -103 4 -2 8 -10
8 -18 0 -8 4 -14 9 -14 5 0 12 -8 15 -17 3 -10 22 -36 41 -58 19 -22 37 -48
41 -57 3 -10 10 -18 15 -18 5 0 9 -7 9 -15 0 -8 4 -15 9 -15 5 0 12 -8 15 -18
4 -10 14 -27 24 -38 37 -41 82 -102 82 -112 0 -6 4 -12 8 -14 12 -4 122 -155
122 -167 0 -5 4 -11 8 -13 10 -4 92 -112 92 -121 0 -4 -405 -7 -900 -7 l-901
0 12 23 c7 12 15 24 19 27 4 3 44 56 89 119 46 63 89 121 97 128 8 8 14 18 14
22 0 4 8 16 19 27 10 11 56 72 102 135 46 63 86 116 90 119 3 3 11 14 17 26 9
18 37 54 92 121 6 7 10 17 10 23 0 5 3 10 8 10 4 0 23 23 42 50 19 27 38 50
43 50 4 0 7 4 7 10 0 13 62 100 72 100 4 0 8 6 8 13 0 7 11 24 25 39 14 15 25
32 25 38 0 5 4 10 8 10 4 0 15 12 24 28 9 15 28 41 42 57 14 17 26 33 26 38 0
14 26 7 43 -13z m1245 -335 c13 -19 36 -47 50 -62 15 -16 43 -48 62 -73 19
-25 39 -50 45 -56 20 -22 50 -60 85 -104 19 -25 37 -47 40 -50 3 -3 21 -25 40
-50 35 -44 65 -82 85 -104 6 -6 26 -31 45 -56 19 -25 37 -47 40 -50 4 -3 37
-43 75 -90 38 -47 80 -96 92 -110 13 -14 23 -33 23 -42 0 -17 -21 -18 -318
-18 -352 0 -322 -5 -369 67 -10 15 -26 37 -36 48 -10 11 -28 36 -40 55 -12 19
-29 44 -39 54 -10 11 -18 23 -18 26 0 4 -11 20 -25 36 -14 16 -35 45 -47 64
-12 19 -25 37 -28 40 -12 10 -80 108 -80 115 0 9 72 109 82 113 5 2 8 8 8 14
0 9 54 85 70 98 4 3 15 20 25 38 11 17 23 32 27 32 4 0 8 5 8 11 0 11 60 89
69 89 3 0 17 -16 29 -35z"/>
</g>
</svg>

                
`;

export const soundLogoSvg = `
    <svg class="word-sound-svg" focusable="false" viewBox="0 0 24 24" 
    aria-hidden="true" width="25" height="25" fill="#545454">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 
        2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 
        7-4.49 7-8.77s-2.99-7.86-7-8.77z">
        </path>
    </svg> 
`;

const wordContainerHTML = `
    <div class="word-container">
        <div class="word-img-container">
            ${imgLogoSvg}
        </div>
        <div class="word-text-container"> 
            <h4 class="word"></h4>
            <p class="word-text word-meaning"></p>
            <p class="word-text word-example"></p>
            <h4 class="word-translate"></h4>
            <p class="word-text word-meaning-translate"></p>
            <p class="word-text word-example-translate"></p>                                                 
        </div>
        <div class="word-btns-container">
        <p class="word-btns-title">Звук:</p>
        <div class="word-btns-subcontainer">
            <div class="word-btn word-sound-btn">${soundLogoSvg}</div>
            <div class="word-btn word-stop-sound-btn">❚❚</div>
        </div>
        <div class="word-btn word-description">Значение ВЫКЛ</div>
        <div class="word-btn word-translate">Перевод ВЫКЛ</div>
        <div class="word-btn word-btn-learned">Изученное</div>
        <div class="word-btn word-btn-hard">Сложное</div>
    </div>
    </div>
`.repeat(Constants.WORDS_PER_GROUP);

export const wordsPageHTML = `
    <div class="words-page-btns-container">
        <div class="words-partitions-btns-container">
            <div class="words-partition-btn" >Часть 1</div>
            <div class="words-partition-btn">Часть 2</div>
            <div class="words-partition-btn">Часть 3</div>
            <div class="words-partition-btn">Часть 4</div>
            <div class="words-partition-btn">Часть 5</div>
            <div class="words-partition-btn">Часть 6</div>
        </div>
        <div class="func-btns-container">
            <div class="games-btns-container">    
                <div class="func-btn games game-audiochallenge">Игра Аудиовызов</div>
                <div class="func-btn games game-sprint">Игра Спринт</div>
            </div>
            <div class="settings-btns-container">
                <div class="func-btn global-description">Значение ВЫКЛ</div>
                <div class="func-btn global-translate-on-btn">Перевод ВЫКЛ</div>
                <div class="func-btn sort-btn">Слова по алфавиту</div>
                <div class="func-btn shuffle-btn">Слова перемешать</div>
                <div class="func-btn reset-btn">Сбросить настройки</div>
            </div>  
        </div>
    </div>
    <div class="words-container-border-top"></div>
    <div class="words-container-border-bottom"></div>
    <div class="words-container-border-left"></div>
    <div class="words-container-border-right"></div>
    <div class="words-container">${wordContainerHTML}</div>
    <div class="words-pagination">
        <div class="pagination-page-btn pagination-page-previous" data-page="previos"> ❰❰❰ </div>
        <h3 class="page-number-title">Стр.:</h3>
        <div class="input-container">
            <input class="input-page-number" type="text">
            <input class="submit-page-number" placeholder="⎆" readonly="readonly">
        </div>
        <h3 class="page-number-title">из 30</h3>
        <div class="pagination-page-btn pagination-page-next" data-page="next"> ❱❱❱ </div>
    </div>
`;
