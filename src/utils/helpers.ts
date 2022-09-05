export function createHTMLElement(tag: string, className = '', innerHTML = ''): HTMLElement {
    const htmlElement = document.createElement(tag);
    if (className !== '') {
        htmlElement.className = className;
    }
    htmlElement.innerHTML = innerHTML;
    return htmlElement;
}

export function getAudioSvg(): string {
    return `<svg class="word-sound-svg" focusable="false" viewBox="0 0 24 24" 
    aria-hidden="true" width="30" height="30" fill="#545454">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 
    2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 
    7-4.49 7-8.77s-2.99-7.86-7-8.77z">
    </path>
    </svg>`;
}

export function getAuthInSvg(): string {
    return `<svg class="auth-in-svg" focusable="false"
    width="30px" height="30px" viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet" fill="#424242" stroke="none">
   <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
   <path d="M2060 4679 c-581 -41 -935 -162 -1191 -406 -258 -246 -386 -615 -429
   -1233 -13 -187 -13 -773 0 -960 43 -614 164 -966 419 -1221 256 -256 613 -378
   1226 -419 193 -13 756 -13 950 0 618 41 991 171 1238 429 249 261 367 613 407
   1216 13 193 13 757 0 950 -40 603 -158 955 -407 1216 -246 258 -615 386 -1233
   429 -168 11 -811 11 -980 -1z m630 -849 c267 -42 501 -211 624 -450 63 -122
   87 -211 93 -356 12 -265 -75 -476 -273 -663 -68 -64 -106 -91 -187 -131 -145
   -71 -232 -92 -387 -92 -96 0 -144 5 -205 21 -320 85 -565 339 -629 653 -20 97
   -21 255 -1 348 93 443 521 740 965 670z m200 -1920 c499 -36 807 -165 985
   -415 65 -90 85 -140 85 -210 0 -150 -100 -243 -350 -323 -188 -60 -394 -87
   -782 -103 -275 -12 -690 -2 -898 21 -335 37 -611 127 -704 231 -77 84 -83 208
   -18 319 156 265 472 427 917 470 221 21 545 25 765 10z"/>
   </g>
   </svg>`;
}

export function getAuthOutSvg(): string {
    return `<svg class="auth-out-svg" focusable="false"
    width="25px" height="25px" viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet" fill="#424242" stroke="none">
   <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
   <path d="M144 5036 c-28 -13 -65 -41 -82 -62 -66 -80 -62 56 -62 -1924 0
   -2029 -7 -1867 78 -1947 38 -36 238 -144 1012 -544 935 -484 966 -500 1013
   -496 27 2 56 12 68 23 48 43 49 53 49 568 l0 485 588 3 587 3 47 23 c26 13 61
   40 79 59 67 77 64 35 67 821 l3 712 -250 0 -250 0 -3 -514 c-3 -502 -3 -515
   -24 -543 -46 -63 -50 -63 -464 -61 l-375 3 -5 1095 c-6 1218 0 1127 -74 1201
   -25 25 -203 121 -600 325 l-564 289 1001 3 c734 2 1009 -1 1030 -9 15 -6 38
   -26 50 -43 21 -30 22 -41 25 -299 l3 -267 247 2 247 3 0 460 c0 445 -1 461
   -21 505 -23 51 -71 102 -118 128 -29 16 -140 17 -1641 19 l-1610 3 -51 -24z"/>
   <path d="M3957 4424 c-102 -32 -178 -153 -163 -258 14 -89 46 -133 245 -331
   l191 -190 -742 -5 c-736 -5 -743 -5 -783 -26 -87 -47 -135 -121 -143 -221 -12
   -152 71 -266 213 -292 38 -7 303 -11 759 -11 l701 -1 -197 -192 c-207 -202
   -229 -231 -243 -329 -10 -68 15 -146 64 -196 53 -55 93 -74 167 -80 52 -4 71
   0 120 22 52 24 113 81 490 459 289 289 439 446 454 475 31 63 36 128 15 193
   -16 51 -46 83 -462 500 -293 294 -459 454 -487 467 -57 29 -139 36 -199 16z"/>
   </g>
   </svg>`;
}

export function shuffle<T>(array: T[]): T[] {
    const newArray = [...array];
    newArray.forEach((item, index) => {
        const ind = randomInt(index + 1);
        [newArray[index], newArray[ind]] = [newArray[ind], newArray[index]];
    });
    return newArray;
}

export function randomInt(max: number): number {
    return randomIntRange(0, max);
}

export function randomIntRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function inRange(num: number, max: number, def: number): number {
    if (isNaN(num)) {
        return def;
    }
    if (num >= 0 && num <= max) {
        return num;
    }
    return def;
}
