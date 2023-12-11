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
var colorMode = document.querySelector("#colorMode");
var loseMenu = document.getElementById("lose");
var winMenu = document.getElementById("win");
var restartWin = document.getElementById("restartWin");
var restartLose = document.getElementById("restartLose");
colorMode.addEventListener("change", function () {
    if (colorMode.checked) {
        addColor();
    }
    else {
        removeColor();
    }
});
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
var sixteenVars = ["16", "(+ 8 8)", "(* 2 8)", "(/ 32 2)", "(expt 2 4)"];
var thirtyTwoVars = ["32", "(+ 16 16)", "(* 2 16)", "(/ 64 2)", "(expt 2 5)"];
var sixtyFourVars = ["8 8", "(+ 4 4) 8", "(+ 4 4) (+ 4 4)", "(* 2 2 2) 8", "(* 2 2 2) (* 2 2 2)"];
var oneTwentyEightVars = ["16 8", "(+ 8 8) 8", "(+ 8 8) (+ 4 4)", "(* 2 2 2) 16", "(* 2 2 2) (* 2 2 2 2)"];
var twoFiftySixVars = [
    "16 16",
    "(+ 8 8) (+ 8 8)",
    "(+ 8 8) (+ 4 (+ 4 (+ 4 4)))",
    "(* 2 2 2) 32",
    "(* 2 2 2 2) (* 2 2 2 2)",
];
var fiveTwelveVars = [
    "8 8 8",
    "(+ 4 4) (+ 4 4) (+ 4 4)",
    "(* 2 2 2) (+ 4 4) 8",
    "(* 2 2 2) (* 2 2 2) 8",
    "(* 2 2 2) (* 2 2 2) (* 2 2 2)",
];
var oneZeroTwoFourVars = [
    "16 8 8",
    "(+ 8 8) 8 8",
    "(+ 8 8) 8 (+ 4 4)",
    "16 (* 2 2 2) 8",
    "(* 2 2 2 2) (* 2 2 2) 8",
];
var twoZeroFourEightVars = ["2048"];
// Lambdas
var twoLambdas = [
    "(λ (x) (+ 2 x))",
    "(λ (x) (* 2 x))",
    "(λ (x) (- 6 x))",
    "(λ (x) (/ 8 x))",
    "(λ (x) (expt 2 x))",
];
var fourLambdas = [
    "(λ (x) (+ 4 x))",
    "(λ (x) (- (+ 6 x) 2))",
    "(λ (x) (- 8 x))",
    "(λ (x) (/ 32 x))",
    "(λ (x) (expt 2 (- x 1)))",
];
var eightLambdas = [
    "(λ (x) (expt 2 (/ x 2)))",
    "(λ (x) (- (+ 10 x) 2))",
    "(λ (x) (- 24 x))",
    "(λ (x) (/ 128 x))",
    "(λ (x) (+ 8 x))",
];
var sixteenLambdas = [
    "(λ (x) (+ 16 x))",
    "(λ (x) (- (+ 18 x) 2))",
    "(λ (x) (- 48 x))",
    "(λ (x) (/ 512 x))",
    "(λ (x) (expt 2 (- x 11)))",
];
var thirtyTwoLambdas = [
    "(λ (x) (+ 32 x))",
    "(λ (x) (expt 2 (- x 26)))",
    "(λ (x) (- 96 x))",
    "(λ (x) (/ 2048 x))",
    "(λ (x) (- (+ 34 x) 2))",
];
var sixtyFourLambdas = [
    "(λ (x y) (+ (* 2 x) (* y 14)))",
    "(λ (x y) (* (+ 8 x) y))",
    "(λ (x y) (* (+ x y) 8))",
    "(λ (x y) (+ (/ x 2) (* y 15.5)))",
    "(λ (x y) (- (* 2 128) (* (* 2 x) y)))",
];
var oneTwentyEightLambdas = [
    "(λ (x y) (+ (* 2 x) (* y 28)))",
    "(λ (x y) (* (+ 16 x) (- 16 y)))",
    "(λ (x y) (* (+ x y) 10.67))",
    "(λ (x y) (+ (/ x 2) (* y 31)))",
    "(λ (x y) (- (* 2 256) (* (* 2 x) y)))",
];
var twoFiftySixLambdas = [
    "(λ (x y) (+ (* 2 x) (* y 30)))",
    "(λ (x y) (* (+ 16 x) (- 32 y)))",
    "(λ (x y) (* (+ x y) 16))",
    "(λ (x y) (+ (/ x 2) (* y 31.5)))",
    "(λ (x y) (- (* 2 512) (* (* 2 x) y)))",
];
var fiveTwelveLambdas = [
    "(λ (x y z) (+ (* 2 x) (* y 30) (* z 96)))",
    "(λ (x y z) (+ (* (+ 16 x) (- 32 y)) (+ z 440)))",
    "(λ (x y z) (* (+ x y z) 42.67))",
    "(λ (x y z) (* z y (+ x 8)))",
    "(λ (x y z) (+ (- (* 2 512) (* (* 2 x) y)) z 120))",
];
var oneZeroTwoFourLambdas = [
    "(λ (x y z) (+ (* 4 x) (* y 154) (* z 94)))",
    "(λ (x y z) (+ (* (+ 16 x) (- 32 y)) (+ z 1272)))",
    "(λ (x y z) (* (+ x y z) 64))",
    "(λ (x y z) (* z y (+ x 16)))",
    "(λ (x y z) (+ (- (* 2 1024) (* (* 1 x) y)) z 120))",
];
var twoZeroFourEightLambdas = ["(λ (x) x)"];
function getUpInput(event) {
    if (event.key == "ArrowUp" || event.key == "w") {
        moveUp();
    }
}
function getDownInput(event) {
    if (event.key == "ArrowDown" || event.key == "s") {
        moveDown();
    }
}
function getLeftInput(event) {
    if (event.key == "ArrowLeft" || event.key == "a") {
        moveLeft();
    }
}
function getRightInput(event) {
    if (event.key == "ArrowRight" || event.key == "d") {
        moveRight();
    }
}
function numToString(num) {
    switch (num) {
        case 2:
            return "two";
        case 4:
            return "four";
        case 8:
            return "eight";
        case 16:
            return "sixteen";
        case 32:
            return "thirtyTwo";
        case 64:
            return "sixtyFour";
        case 128:
            return "oneTwentyEight";
        case 256:
            return "twoFiftySix";
        case 512:
            return "fiveOneTwo";
        case 1024:
            return "oneZeroTwoFour";
        case 2048:
            return "twoZeroFourEight";
        default:
            return "blank";
    }
}
function updateScreen() {
    board.replaceChildren();
    boardState.forEach(function (tile) {
        board === null || board === void 0 ? void 0 : board.appendChild(tile);
    });
}
function initBoard() {
    for (var i = 0; i < 16; i++) {
        var div = getBlankTile();
        boardState.push(div);
        board.appendChild(div);
    }
    placeNewTiles();
    updateScreen();
}
function init() {
    boardState = [];
    twosCount = 0;
    foursCount = 0;
    eightCount = 0;
    sixteenCount = 0;
    thirtyTwoCount = 0;
    sixtyFourCount = 0;
    oneTwentyEightCount = 0;
    twoFiftySixCount = 0;
    fiveTwelveCount = 0;
    oneZeroTwoFourCount = 0;
    twoZeroFourEightCount = 0;
    document.addEventListener("keydown", getUpInput);
    document.addEventListener("keydown", getDownInput);
    document.addEventListener("keydown", getLeftInput);
    document.addEventListener("keydown", getRightInput);
    initBoard();
}
function restartGame() {
    winMenu.style.display = "none";
    loseMenu.style.display = "none";
    init();
}
function generateTile(num) {
    var div = document.createElement("div");
    div.classList.add("tile");
    var p = document.createElement("p");
    p.classList.add("innerText");
    div.dataset.value = num.toString();
    if (colorMode.checked) {
        div.classList.add(numToString(num));
    }
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
    var blankIndexes = boardState
        .map(function (tile, i) {
        if (tile.classList.contains("blankTile")) {
            return i;
        }
        else {
            return -1;
        }
    })
        .filter(function (index) { return index != -1; });
    if (blankIndexes.length == 1) {
        var newSquare1_1 = generateTile(2);
        var position1_1 = blankIndexes[0];
        boardState[position1_1] = newSquare1_1;
        return;
    }
    if (blankIndexes.length == 0) {
        return;
    }
    var newSquare1 = generateTile(2);
    var newSquare2 = generateTile(2);
    var position1 = blankIndexes[Math.floor(Math.random() * blankIndexes.length)];
    var position2 = blankIndexes[Math.floor(Math.random() * blankIndexes.length)];
    while (position1 == position2) {
        position2 = blankIndexes[Math.floor(Math.random() * blankIndexes.length)];
    }
    boardState[position1] = newSquare1;
    boardState[position2] = newSquare2;
}
function checkMatch(tile1, tile2) {
    var tag1 = tile1.dataset.value;
    var tag2 = tile2.dataset.value;
    if (tag1 == tag2) {
        if (Number(tag1) * 2 == 2048) {
            win();
            var div = document.createElement("div");
            div.classList.add("no");
            return div;
        }
        var newTile = generateTile(Number(tag1) * 2);
        return newTile;
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
                var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 1), true), [tile, getBlankTile()], false), boardState.slice(i + 1), true);
                boardState = newBoardState;
            }
            else {
                var matched = checkMatch(tile, boardState[i - 1]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 1), true), [matched, getBlankTile()], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
        }
        else if (i % 4 == 2) {
            if (boardState[i - 1].classList.contains("blankTile") && boardState[i - 2].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 2), true), [
                    tile,
                    getBlankTile(),
                    getBlankTile()
                ], false), boardState.slice(i + 1), true);
                boardState = newBoardState;
            }
            else if (boardState[i - 1].classList.contains("blankTile") && boardState[i - 2].classList.contains("tile")) {
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
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 1), true), [matched, getBlankTile()], false), boardState.slice(i + 1), true);
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
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 3), true), [
                        matched,
                        getBlankTile(),
                        getBlankTile(),
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 3), true), [
                        boardState[i - 3],
                        tile,
                        getBlankTile(),
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
            else if (boardState[i - 1].classList.contains("blankTile") && boardState[i - 2].classList.contains("tile")) {
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
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 1), true), [matched, getBlankTile()], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
        }
    });
    placeNewTiles();
    updateScreen();
    lose();
}
function moveRight() {
    boardState.forEach(function (tile, i) {
        if (tile.classList.contains("blankTile") || i % 4 == 3) {
            return;
        }
        else if (i % 4 == 2) {
            if (boardState[i + 1].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [getBlankTile(), tile], false), boardState.slice(i + 2), true);
                boardState = newBoardState;
            }
            else {
                var matched = checkMatch(tile, boardState[i + 1]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [getBlankTile(), matched], false), boardState.slice(i + 2), true);
                    boardState = newBoardState;
                }
            }
        }
        else if (i % 4 == 1) {
            if (boardState[i + 1].classList.contains("blankTile") && boardState[i + 2].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                    getBlankTile(),
                    getBlankTile(),
                    tile
                ], false), boardState.slice(i + 3), true);
                boardState = newBoardState;
            }
            else if (boardState[i + 1].classList.contains("blankTile") && boardState[i + 2].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i + 2]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile(),
                        getBlankTile(),
                        matched
                    ], false), boardState.slice(i + 3), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile(),
                        tile,
                        boardState[i + 2]
                    ], false), boardState.slice(i + 3), true);
                    boardState = newBoardState;
                }
            }
            else {
                var matched = checkMatch(tile, boardState[i + 1]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [getBlankTile(), matched], false), boardState.slice(i + 2), true);
                    boardState = newBoardState;
                }
            }
        }
        else if (i % 4 == 0) {
            if (boardState[i + 1].classList.contains("blankTile") &&
                boardState[i + 2].classList.contains("blankTile") &&
                boardState[i + 3].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                    getBlankTile(),
                    getBlankTile(),
                    getBlankTile(),
                    tile
                ], false), boardState.slice(i + 4), true);
                boardState = newBoardState;
            }
            else if (boardState[i + 1].classList.contains("blankTile") &&
                boardState[i + 2].classList.contains("blankTile") &&
                boardState[i + 3].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i + 3]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile(),
                        getBlankTile(),
                        getBlankTile(),
                        matched
                    ], false), boardState.slice(i + 4), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile(),
                        getBlankTile(),
                        tile,
                        boardState[i + 3]
                    ], false), boardState.slice(i + 4), true);
                    boardState = newBoardState;
                }
            }
            else if (boardState[i + 1].classList.contains("blankTile") && boardState[i + 2].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i + 2]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile(),
                        getBlankTile(),
                        matched
                    ], false), boardState.slice(i + 3), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile(),
                        tile,
                        boardState[i + 2]
                    ], false), boardState.slice(i + 3), true);
                    boardState = newBoardState;
                }
            }
            else {
                var matched = checkMatch(tile, boardState[i + 1]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [getBlankTile(), matched], false), boardState.slice(i + 2), true);
                    boardState = newBoardState;
                }
            }
        }
    });
    placeNewTiles();
    updateScreen();
    lose();
}
function moveUp() {
    boardState.forEach(function (tile, i) {
        if (tile.classList.contains("blankTile") || i / 4 < 1) {
            return;
        }
        else if (2 > i / 4 && i / 4 >= 1) {
            if (boardState[i - 4].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 4), true), [
                    tile
                ], false), boardState.slice(i - 3, i), true), [
                    getBlankTile()
                ], false), boardState.slice(i + 1), true);
                boardState = newBoardState;
            }
            else {
                var matched = checkMatch(tile, boardState[i - 4]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 4), true), [
                        matched
                    ], false), boardState.slice(i - 3, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
        }
        else if (3 > i / 4 && i / 4 >= 2) {
            if (boardState[i - 4].classList.contains("blankTile") && boardState[i - 8].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 8), true), [
                    tile
                ], false), boardState.slice(i - 7, i - 4), true), [
                    getBlankTile()
                ], false), boardState.slice(i - 3, i), true), [
                    getBlankTile()
                ], false), boardState.slice(i + 1), true);
                boardState = newBoardState;
            }
            else if (boardState[i - 4].classList.contains("blankTile") && boardState[i - 8].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i - 8]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 8), true), [
                        matched
                    ], false), boardState.slice(i - 7, i - 4), true), [
                        getBlankTile()
                    ], false), boardState.slice(i - 3, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 8), true), [
                        boardState[i - 8]
                    ], false), boardState.slice(i - 7, i - 4), true), [
                        tile
                    ], false), boardState.slice(i - 3, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
            else {
                var matched = checkMatch(tile, boardState[i - 4]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 4), true), [
                        matched
                    ], false), boardState.slice(i - 3, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
        }
        else if (i / 4 >= 3) {
            if (boardState[i - 4].classList.contains("blankTile") &&
                boardState[i - 8].classList.contains("blankTile") &&
                boardState[i - 12].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 12), true), [
                    tile
                ], false), boardState.slice(i - 11, i - 8), true), [
                    getBlankTile()
                ], false), boardState.slice(i - 7, i - 4), true), [
                    getBlankTile()
                ], false), boardState.slice(i - 3, i), true), [
                    getBlankTile()
                ], false), boardState.slice(i + 1), true);
                boardState = newBoardState;
            }
            else if (boardState[i - 4].classList.contains("blankTile") &&
                boardState[i - 8].classList.contains("blankTile") &&
                boardState[i - 12].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i - 12]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 12), true), [
                        matched
                    ], false), boardState.slice(i - 11, i - 8), true), [
                        getBlankTile()
                    ], false), boardState.slice(i - 7, i - 4), true), [
                        getBlankTile()
                    ], false), boardState.slice(i - 3, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 12), true), [
                        boardState[i - 12]
                    ], false), boardState.slice(i - 11, i - 8), true), [
                        tile
                    ], false), boardState.slice(i - 7, i - 4), true), [
                        getBlankTile()
                    ], false), boardState.slice(i - 3, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
            else if (boardState[i - 4].classList.contains("blankTile") && boardState[i - 8].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i - 8]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 8), true), [
                        matched
                    ], false), boardState.slice(i - 7, i - 4), true), [
                        getBlankTile()
                    ], false), boardState.slice(i - 3, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 8), true), [
                        boardState[i - 8]
                    ], false), boardState.slice(i - 7, i - 4), true), [
                        tile
                    ], false), boardState.slice(i - 3, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
            else {
                var matched = checkMatch(tile, boardState[i - 4]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i - 4), true), [
                        matched
                    ], false), boardState.slice(i - 3, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1), true);
                    boardState = newBoardState;
                }
            }
        }
    });
    placeNewTiles();
    updateScreen();
    lose();
}
function moveDown() {
    boardState.forEach(function (tile, i) {
        if (tile.classList.contains("blankTile") || i / 4 >= 3) {
            return;
        }
        else if (3 > i / 4 && i / 4 >= 3) {
            if (boardState[i + 4].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                    getBlankTile()
                ], false), boardState.slice(i + 1, i + 4), true), [
                    tile
                ], false), boardState.slice(i + 5), true);
                boardState = newBoardState;
            }
            else {
                var matched = checkMatch(tile, boardState[i + 4]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1, i + 4), true), [
                        matched
                    ], false), boardState.slice(i + 5), true);
                    boardState = newBoardState;
                }
            }
        }
        else if (2 > i / 4 && i / 4 >= 1) {
            if (boardState[i + 4].classList.contains("blankTile") && boardState[i + 8].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                    getBlankTile()
                ], false), boardState.slice(i + 1, i + 4), true), [
                    getBlankTile()
                ], false), boardState.slice(i + 5, i + 8), true), [
                    tile
                ], false), boardState.slice(i + 9), true);
                boardState = newBoardState;
            }
            else if (boardState[i + 4].classList.contains("blankTile") && boardState[i + 8].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i + 8]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1, i + 4), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 5, i + 8), true), [
                        matched
                    ], false), boardState.slice(i + 9), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1, i + 4), true), [
                        tile
                    ], false), boardState.slice(i + 5, i + 8), true), [
                        boardState[i + 8]
                    ], false), boardState.slice(i + 9), true);
                    boardState = newBoardState;
                }
            }
            else {
                var matched = checkMatch(tile, boardState[i + 4]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1, i + 4), true), [
                        matched
                    ], false), boardState.slice(i + 5), true);
                    boardState = newBoardState;
                }
            }
        }
        else if (i / 4 < 1) {
            if (boardState[i + 4].classList.contains("blankTile") &&
                boardState[i + 8].classList.contains("blankTile") &&
                boardState[i + 12].classList.contains("blankTile")) {
                var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                    getBlankTile()
                ], false), boardState.slice(i + 1, i + 4), true), [
                    getBlankTile()
                ], false), boardState.slice(i + 5, i + 8), true), [
                    getBlankTile()
                ], false), boardState.slice(i + 9, i + 12), true), [
                    tile
                ], false), boardState.slice(i + 13), true);
                boardState = newBoardState;
            }
            else if (boardState[i + 4].classList.contains("blankTile") &&
                boardState[i + 8].classList.contains("blankTile") &&
                boardState[i + 12].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i + 12]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1, i + 4), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 5, i + 8), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 9, i + 12), true), [
                        matched
                    ], false), boardState.slice(i + 13), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1, i + 4), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 5, i + 8), true), [
                        tile
                    ], false), boardState.slice(i + 9, i + 12), true), [
                        boardState[i + 12]
                    ], false), boardState.slice(i + 13), true);
                    boardState = newBoardState;
                }
            }
            else if (boardState[i + 4].classList.contains("blankTile") && boardState[i + 8].classList.contains("tile")) {
                var matched = checkMatch(tile, boardState[i + 8]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1, i + 4), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 5, i + 8), true), [
                        matched
                    ], false), boardState.slice(i + 9), true);
                    boardState = newBoardState;
                }
                else {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1, i + 4), true), [
                        tile
                    ], false), boardState.slice(i + 5, i + 8), true), [
                        boardState[i + 8]
                    ], false), boardState.slice(i + 9), true);
                    boardState = newBoardState;
                }
            }
            else {
                var matched = checkMatch(tile, boardState[i + 4]);
                if (matched.classList.contains("tile")) {
                    var newBoardState = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], boardState.slice(0, i), true), [
                        getBlankTile()
                    ], false), boardState.slice(i + 1, i + 4), true), [
                        matched
                    ], false), boardState.slice(i + 5), true);
                    boardState = newBoardState;
                }
            }
        }
    });
    placeNewTiles();
    updateScreen();
    lose();
}
function addColor() {
    boardState.forEach(function (tile) {
        if (tile.classList.contains("blankTile")) {
            return;
        }
        tile.classList.add(numToString(Number(tile.dataset.value)));
    });
}
function removeColor() {
    boardState.forEach(function (tile) {
        if (tile.classList.contains("blankTile")) {
            return;
        }
        tile.classList.remove(numToString(Number(tile.dataset.value)));
    });
}
function checkIfGameOver() {
    var tiles = boardState
        .map(function (tile, i) {
        if (tile.classList.contains("tile")) {
            return i;
        }
        else {
            return -1;
        }
    })
        .filter(function (index) { return index != -1; });
    // console.log(tiles);
    // the problem is that if the up direction does not match, it will return false
    var checks = [];
    tiles.forEach(function (index) {
        if (index / 4 >= 1) {
            var matchedUp = checkMatch(boardState[index], boardState[index - 4]);
            checks.push(matchedUp);
        }
        if (index / 4 < 3) {
            var matchedDown = checkMatch(boardState[index], boardState[index + 4]);
            checks.push(matchedDown);
        }
        if (index % 4 != 0) {
            var matchedLeft = checkMatch(boardState[index], boardState[index - 1]);
            checks.push(matchedLeft);
        }
        if (index % 4 != 3) {
            var matchedRight = checkMatch(boardState[index], boardState[index + 1]);
            checks.push(matchedRight);
        }
    });
    var filteredChecks = checks.filter(function (check) { return check.classList.contains("tile"); });
    if (filteredChecks.length > 0) {
        return false;
    }
    var blankTiles = boardState.filter(function (tile) { return tile.classList.contains("blankTile"); });
    if (blankTiles.length != 0) {
        return false;
    }
    document.removeEventListener("keydown", getUpInput);
    document.removeEventListener("keydown", getDownInput);
    document.removeEventListener("keydown", getLeftInput);
    document.removeEventListener("keydown", getRightInput);
    return true;
}
function win() {
    winMenu.style.display = "block";
}
function lose() {
    if (checkIfGameOver()) {
        var highestLevel = Math.max.apply(Math, boardState.map(function (tile) { return Number(tile.dataset.value); }));
        var score = document.getElementById("score");
        score.innerText = String(highestLevel);
        loseMenu.style.display = "block";
        document.removeEventListener("keydown", getUpInput);
        document.removeEventListener("keydown", getDownInput);
        document.removeEventListener("keydown", getLeftInput);
        document.removeEventListener("keydown", getRightInput);
    }
    else {
        loseMenu.style.display = "none";
    }
}
initBoard();
document.addEventListener("keydown", getUpInput);
document.addEventListener("keydown", getDownInput);
document.addEventListener("keydown", getLeftInput);
document.addEventListener("keydown", getRightInput);
restartLose.addEventListener("click", restartGame);
restartWin.addEventListener("click", restartGame);
