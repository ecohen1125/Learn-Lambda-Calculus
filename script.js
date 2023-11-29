var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var board = document.getElementById("board");
// create a blank tile to duplicate
function getBlankTile() {
    var blankTile = document.createElement("div");
    blankTile.classList.add("blankTile");
    var p = document.createElement("p");
    p.innerHTML = "blank";
    blankTile.appendChild(p);
    return blankTile;
}
var boardState = [];
var twosCount = 0, foursCount = 0, eightCount = 0, sixteenCount = 0, thirtyTwoCount = 0, sixtyFourCount = 0, oneTwentyEightCount = 0, twoFiftySixCount = 0, fiveTwelveCount = 0, oneZeroTwoFourCount = 0, twoZeroFourEightCount = 0;
// Vars
var twoVars = ["2", "(+ 1 1)", "(* 2 1)", "(/ 4 2)", "(expt 2 1)"];
var fourVars = ["4", "(+ 2 2)", "(* 2 2)", "(/ 8 2)", "(expt 2 2)"];
var eightVars = ["8", "(+ 4 4)", "(* 2 4)", "(/ 16 2)", "(expt 2 3)"];
var sixteenVars = [
    "16",
    "(+ 8 8)",
    "(* 2 8)",
    "(/ 32 2)",
    "(expt 2 4)",
];
var thirtyTwoVars = [
    "32",
    "(+ 16 16)",
    "(* 2 16)",
    "(/ 64 2)",
    "(expt 2 5)",
];
var sixtyFourVars = [
    "64",
    "(+ 32 32)",
    "(* 2 32)",
    "(/ 128 2)",
    "(expt 2 6)",
];
var oneTwentyEightVars = [
    "128",
    "(+ 64 64)",
    "(* 2 64)",
    "(/ 256 2)",
    "(expt 2 7)",
];
var twoFiftySixVars = [
    "256",
    "(+ 128 128)",
    "(* 2 128)",
    "(/ 512 2)",
    "(expt 2 8)",
];
var fiveTwelveVars = [
    "512",
    "(+ 256 256)",
    "(* 2 256)",
    "(/ 1024 2)",
    "(expt 2 9)",
];
var oneZeroTwoFourVars = [
    "1024",
    "(+ 512 512)",
    "(* 2 512)",
    "(/ 2048 2)",
    "(expt 2 10)",
];
var twoZeroFourEightVars = [
    "2048",
    "(+ 1024 1024)",
    "(* 2 1024)",
    "(/ 4096 2)",
    "(expt 2 11)",
];
// Lambdas
var twoLambdas = [
    "(λ (x) (+ x 0))",
    "(λ (x) (* x 1))",
    "(λ (x) (/ x 1))",
    "(λ (x) (x))",
    "(λ (x) (- 0 x))",
];
var fourLambdas = [
    "(λ (x) (- (+ x 4) 4))",
    "(λ (x) (+ (- x 4) 4))",
    "(λ (x) (/ (expt x 2) 4))",
];
var eightLambdas = [];
var sixteenLambdas = [];
var thirtyTwoLambdas = [];
var sixtyFourLambdas = [];
var oneTwentyEightLambdas = [];
var twoFiftySixLambdas = [];
var fiveTwelveLambdas = [];
var oneZeroTwoFourLambdas = [];
var twoZeroFourEightLambdas = [];
initBoard();
document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowLeft" || event.key == "a") {
        moveLeft();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowRight" || event.key == "d") {
        moveRight();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowDown" || event.key == "s") {
        moveDown();
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp" || event.key == "w") {
        moveUp();
    }
});
function updateScreen() {
    // console.log(boardState);
    var boardChildren = board === null || board === void 0 ? void 0 : board.childNodes;
    console.log(boardChildren);
    board.replaceChildren();
    // boardChildren.forEach((child, i) => {
    //   board?.replaceChild(child, []);
    // });
    boardState.forEach(function (tile) {
        board === null || board === void 0 ? void 0 : board.appendChild(tile);
    });
}
function initBoard() {
    for (var i = 0; i < 16; i++) {
        var div = getBlankTile();
        boardState.push(div);
        board === null || board === void 0 ? void 0 : board.appendChild(div);
    }
}
function generateTile(num) {
    var div = document.createElement("div");
    div.classList.add("tile");
    var p = document.createElement("p");
    p.classList.add("innerText");
    switch (num) {
        case 2:
            if (twosCount % 2 == 0) {
                p.innerHTML = twoLambdas[Math.floor(Math.random() * 5)];
                twosCount++;
            }
            else {
                p.innerText = twoVars[Math.floor(Math.random() * 3)];
                twosCount++;
            }
            break;
        case 4:
            if (foursCount % 2 == 0) {
                p.innerHTML = fourLambdas[Math.floor(Math.random() * 3)];
                foursCount++;
            }
            else {
                p.innerText = fourVars[Math.floor(Math.random() * 3)];
                foursCount++;
            }
            break;
        case 8:
            if (eightCount % 2 == 0) {
                p.innerHTML = eightLambdas[Math.floor(Math.random() * 3)];
                eightCount++;
            }
            else {
                p.innerText = eightVars[Math.floor(Math.random() * 3)];
                eightCount++;
            }
            break;
        case 16:
            if (sixteenCount % 2 == 0) {
                p.innerHTML = sixteenLambdas[Math.floor(Math.random() * 3)];
                sixteenCount++;
            }
            else {
                p.innerText = sixteenVars[Math.floor(Math.random() * 3)];
                sixteenCount++;
            }
            break;
        case 32:
            if (thirtyTwoCount % 2 == 0) {
                p.innerHTML = thirtyTwoLambdas[Math.floor(Math.random() * 3)];
                thirtyTwoCount++;
            }
            else {
                p.innerText = thirtyTwoVars[Math.floor(Math.random() * 3)];
                thirtyTwoCount++;
            }
            break;
        case 64:
            if (sixtyFourCount % 2 == 0) {
                p.innerHTML = sixtyFourLambdas[Math.floor(Math.random() * 3)];
                sixtyFourCount++;
            }
            else {
                p.innerText = sixtyFourVars[Math.floor(Math.random() * 3)];
                sixtyFourCount++;
            }
            break;
        case 128:
            if (oneTwentyEightCount % 2 == 0) {
                p.innerHTML = oneTwentyEightLambdas[Math.floor(Math.random() * 3)];
                oneTwentyEightCount++;
            }
            else {
                p.innerText = oneTwentyEightVars[Math.floor(Math.random() * 3)];
                oneTwentyEightCount++;
            }
            break;
        case 256:
            if (twoFiftySixCount % 2 == 0) {
                p.innerHTML = twoFiftySixLambdas[Math.floor(Math.random() * 3)];
                twoFiftySixCount++;
            }
            else {
                p.innerText = twoFiftySixVars[Math.floor(Math.random() * 3)];
                twoFiftySixCount++;
            }
            break;
        case 512:
            if (fiveTwelveCount % 2 == 0) {
                p.innerHTML = fiveTwelveLambdas[Math.floor(Math.random() * 3)];
                fiveTwelveCount++;
            }
            else {
                p.innerText = fiveTwelveVars[Math.floor(Math.random() * 3)];
                fiveTwelveCount++;
            }
            break;
        case 1024:
            if (oneZeroTwoFourCount % 2 == 0) {
                p.innerHTML = oneZeroTwoFourLambdas[Math.floor(Math.random() * 3)];
                oneZeroTwoFourCount++;
            }
            else {
                p.innerText = oneZeroTwoFourVars[Math.floor(Math.random() * 3)];
                oneZeroTwoFourCount++;
            }
            break;
        case 2048:
            if (twoZeroFourEightCount % 2 == 0) {
                p.innerHTML = twoZeroFourEightLambdas[Math.floor(Math.random() * 3)];
                twoZeroFourEightCount++;
            }
            else {
                p.innerText = twoZeroFourEightVars[Math.floor(Math.random() * 3)];
                twoZeroFourEightCount++;
            }
            break;
        default:
            break;
    }
    div.appendChild(p);
    return div;
}
function placeNewTiles() {
    var newSquare1 = generateTile(2);
    var newSquare2 = generateTile(2);
    var blankIndexes = boardState.map(function (tile, i) {
        if (tile.classList.contains("blankTile")) {
            return i;
        }
        else {
            return -1;
        }
    }).filter(function (index) { return index != -1; });
    if (blankIndexes.length == 0) {
        return;
    }
    var position1 = blankIndexes[Math.floor(Math.random() * blankIndexes.length)];
    var position2 = blankIndexes[Math.floor(Math.random() * blankIndexes.length)];
    boardState[position1] = newSquare1;
    boardState[position2] = newSquare2;
}
function checkMatch(tile1, tile2) {
    if ((twoVars.indexOf(tile1.innerText) >= 0 &&
        twoLambdas.indexOf(tile2.innerText) >= 0) ||
        (twoVars.indexOf(tile2.innerText) >= 0 &&
            twoLambdas.indexOf(tile1.innerText) >= 0)) {
        return generateTile(4);
    }
    else if ((fourVars.indexOf(tile1.innerText) >= 0 &&
        fourLambdas.indexOf(tile2.innerText) >= 0) ||
        (fourVars.indexOf(tile2.innerText) >= 0 &&
            fourLambdas.indexOf(tile1.innerText) >= 0)) {
        return generateTile(8);
    }
    else if ((eightVars.indexOf(tile1.innerText) >= 0 &&
        eightLambdas.indexOf(tile2.innerText) >= 0) ||
        (eightVars.indexOf(tile2.innerText) >= 0 &&
            eightLambdas.indexOf(tile1.innerText) >= 0)) {
        return generateTile(16);
    }
    else if ((sixteenVars.indexOf(tile1.innerText) >= 0 &&
        sixteenLambdas.indexOf(tile2.innerText) >= 0) ||
        (sixteenVars.indexOf(tile2.innerText) >= 0 &&
            sixteenLambdas.indexOf(tile1.innerText) >= 0)) {
        return generateTile(32);
    }
    else if ((thirtyTwoVars.indexOf(tile1.innerText) >= 0 &&
        thirtyTwoLambdas.indexOf(tile2.innerText) >= 0) ||
        (thirtyTwoVars.indexOf(tile2.innerText) >= 0 &&
            thirtyTwoLambdas.indexOf(tile1.innerText) >= 0)) {
        return generateTile(64);
    }
    else if ((sixtyFourVars.indexOf(tile1.innerText) >= 0 &&
        sixtyFourLambdas.indexOf(tile2.innerText) >= 0) ||
        (sixtyFourVars.indexOf(tile2.innerText) >= 0 &&
            sixtyFourLambdas.indexOf(tile1.innerText) >= 0)) {
        return generateTile(128);
    }
    else if ((oneTwentyEightVars.indexOf(tile1.innerText) >= 0 &&
        oneTwentyEightLambdas.indexOf(tile2.innerText) >= 0) ||
        (oneTwentyEightVars.indexOf(tile2.innerText) >= 0 &&
            oneTwentyEightLambdas.indexOf(tile1.innerText) >= 0)) {
        return generateTile(256);
    }
    else if ((twoFiftySixVars.indexOf(tile1.innerText) >= 0 &&
        twoFiftySixLambdas.indexOf(tile2.innerText) >= 0) ||
        (twoFiftySixVars.indexOf(tile2.innerText) >= 0 &&
            twoFiftySixLambdas.indexOf(tile1.innerText) >= 0)) {
        return generateTile(512);
    }
    else if ((fiveTwelveVars.indexOf(tile1.innerText) >= 0 &&
        fiveTwelveLambdas.indexOf(tile2.innerText) >= 0) ||
        (fiveTwelveVars.indexOf(tile2.innerText) >= 0 &&
            fiveTwelveLambdas.indexOf(tile1.innerText) >= 0)) {
        return generateTile(1024);
    }
    else if ((oneZeroTwoFourVars.indexOf(tile1.innerText) >= 0 &&
        oneZeroTwoFourLambdas.indexOf(tile2.innerText) >= 0) ||
        (oneZeroTwoFourVars.indexOf(tile2.innerText) >= 0 &&
            oneZeroTwoFourLambdas.indexOf(tile1.innerText) >= 0)) {
        return generateTile(2048);
    }
    else if ((twoZeroFourEightVars.indexOf(tile1.innerText) >= 0 &&
        twoZeroFourEightLambdas.indexOf(tile2.innerText) >= 0) ||
        (twoZeroFourEightVars.indexOf(tile2.innerText) >= 0 &&
            twoZeroFourEightLambdas.indexOf(tile1.innerText) >= 0)) {
        win();
        var div = document.createElement("div");
        div.classList.add("no");
        return div;
    }
    else {
        var div = document.createElement("div");
        div.classList.add("no");
        return div;
    }
}
function moveLeft() {
    boardState.forEach(function (tile, i) {
        if (tile.classList.contains("blankTile") || i % 4 == 0) {
            return;
        }
        else if (i % 4 == 1) {
            if (boardState[i - 1].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 1), true), [
                    tile,
                    getBlankTile()
                ], false), boardState.slice(i + 1), true);
                boardState = newBoardState;
            }
            else {
                var matched = checkMatch(tile, boardState[i - 1]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 1), true), [
                        matched,
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
        }
        else if (i % 4 == 2) {
            if (boardState[i - 1].classList.contains("blankTile") &&
                boardState[i - 2].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 2), true), [
                    tile,
                    getBlankTile(),
                    getBlankTile()
                ], false), boardState.slice(i + 1), true);
                boardState = newBoardState;
            }
            else if (boardState[i - 1].classList.contains("blankTile") &&
                boardState[i - 2].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i - 2]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 2), true), [
                        matched,
                        getBlankTile(),
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 2), true), [
                        boardState[i - 2],
                        tile,
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
            else {
                var matched = checkMatch(tile, boardState[i - 1]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 1), true), [
                        matched,
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
        }
        else if (i % 4 == 3) {
            if (boardState[i - 1].classList.contains("blankTile") &&
                boardState[i - 2].classList.contains("blankTile") &&
                boardState[i - 3].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 3), true), [
                    tile,
                    getBlankTile(),
                    getBlankTile(),
                    getBlankTile()
                ], false), boardState.slice(i + 1), true);
                boardState = newBoardState;
            }
            else if (boardState[i - 1].classList.contains("blankTile") &&
                boardState[i - 2].classList.contains("blankTile") &&
                boardState[i - 3].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i - 3]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 2), true), [
                        matched,
                        getBlankTile(),
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 2), true), [
                        boardState[i - 3],
                        tile,
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
            else if (boardState[i - 1].classList.contains("blankTile") &&
                boardState[i - 2].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i - 2]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 2), true), [
                        matched,
                        getBlankTile(),
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 2), true), [
                        boardState[i - 2],
                        tile,
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
            else {
                var matched = checkMatch(tile, boardState[i - 1]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 1), true), [
                        matched,
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
        }
    });
    placeNewTiles();
    updateScreen();
}
function moveRight() { }
function moveUp() { }
function moveDown() { }
function win() {
    alert("You win!");
}
