let board = document.getElementById("board")!;
let colorMode = document.querySelector("#colorMode") as HTMLInputElement;
let loseMenu = document.getElementById("lose")!;
let winMenu = document.getElementById("win")!;

colorMode.addEventListener("change", () => {
  if (colorMode.checked) {
    addColor();
  } else {
    removeColor();
  }
});

// create a blank tile to duplicate
function getBlankTile(): HTMLDivElement {
  let blankTile = document.createElement("div");
  blankTile.classList.add("blankTile");
  let p = document.createElement("p");
  p.innerHTML = "blank";
  blankTile.appendChild(p);
  return blankTile;
}

let boardState: HTMLDivElement[] = [];
let twosCount: number = 0,
  foursCount: number = 0,
  eightCount: number = 0,
  sixteenCount: number = 0,
  thirtyTwoCount: number = 0,
  sixtyFourCount: number = 0,
  oneTwentyEightCount: number = 0,
  twoFiftySixCount: number = 0,
  fiveTwelveCount: number = 0,
  oneZeroTwoFourCount: number = 0,
  twoZeroFourEightCount: number = 0;

// const twos = {
//   vars: ["2", "(+ 1 1)", "(* 2 1)", "(/ 4 2)", "(expt 2 1)"],
//   lambdas: [
//     "(λ (x) (+ x 0))",
//     "(λ (x) (* x 1))",
//     "(λ (x) (/ x 1))",
//     "(λ (x) (x))",
//     "(λ (x) (- 0 x))",
//   ],
// };

// console.log("Twos: \n Vars: " + twos.vars + "\n Lambdas: " + twos.lambdas);

// Vars
let twoVars: string[] = ["2", "(+ 1 1)", "(* 2 1)", "(/ 4 2)", "(expt 2 1)"];
let fourVars: string[] = ["4", "(+ 2 2)", "(* 2 2)", "(/ 8 2)", "(expt 2 2)"];
let eightVars: string[] = ["8", "(+ 4 4)", "(* 2 4)", "(/ 16 2)", "(expt 2 3)"];
let sixteenVars: string[] = [
  "16",
  "(+ 8 8)",
  "(* 2 8)",
  "(/ 32 2)",
  "(expt 2 4)",
];
let thirtyTwoVars: string[] = [
  "32",
  "(+ 16 16)",
  "(* 2 16)",
  "(/ 64 2)",
  "(expt 2 5)",
];
let sixtyFourVars: string[] = [];
let oneTwentyEightVars: string[] = [
  "128",
  "(+ 64 64)",
  "(* 2 64)",
  "(/ 256 2)",
  "(expt 2 7)",
];
let twoFiftySixVars: string[] = [
  "256",
  "(+ 128 128)",
  "(* 2 128)",
  "(/ 512 2)",
  "(expt 2 8)",
];
let fiveTwelveVars: string[] = [
  "512",
  "(+ 256 256)",
  "(* 2 256)",
  "(/ 1024 2)",
  "(expt 2 9)",
];
let oneZeroTwoFourVars: string[] = [
  "1024",
  "(+ 512 512)",
  "(* 2 512)",
  "(/ 2048 2)",
  "(expt 2 10)",
];
let twoZeroFourEightVars: string[] = [
  "2048",
  "(+ 1024 1024)",
  "(* 2 1024)",
  "(/ 4096 2)",
  "(expt 2 11)",
];

// Lambdas
let twoLambdas: string[] = [
  "(λ (x) (+ x 0))",
  "(λ (x) (* x 1))",
  "(λ (x) (/ x 1))",
  "(λ (x) (x))",
  "(λ (x) (- 0 x))",
];
let fourLambdas: string[] = [
  "(λ (x) (- (+ x 4) 4))",
  "(λ (x) (+ (- x 4) 4))",
  "(λ (x) (/ (expt x 2) 4))",
];
let eightLambdas: string[] = [];
let sixteenLambdas: string[] = [];
let thirtyTwoLambdas: string[] = [];
let sixtyFourLambdas: string[] = [];
let oneTwentyEightLambdas: string[] = [];
let twoFiftySixLambdas: string[] = [];
let fiveTwelveLambdas: string[] = [];
let oneZeroTwoFourLambdas: string[] = [];
let twoZeroFourEightLambdas: string[] = [];

initBoard();

document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowLeft" || event.key == "a") {
    moveLeft();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowRight" || event.key == "d") {
    moveRight();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowDown" || event.key == "s") {
    moveDown();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp" || event.key == "w") {
    moveUp();
  }
});

function numToString(num: Number): string {
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

function updateScreen(): void {
  board.replaceChildren();

  boardState.forEach((tile) => {
    board?.appendChild(tile);
  });
}

function initBoard(): void {
  for (let i = 0; i < 16; i++) {
    let div = getBlankTile();
    boardState.push(div);
    board?.appendChild(div);
  }

  placeNewTiles();
  updateScreen();

  loseMenu.style.display = "none";
  winMenu.style.display = "none";
}

function generateTile(num: Number): HTMLDivElement {
  let div = document.createElement("div");
  div.classList.add("tile");
  let p = document.createElement("p");
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
      } else {
        p.innerText = twoVars[Math.floor(Math.random() * 3)];
        twosCount++;
      }
      break;
    case 4:
      if (foursCount % 2 == 0) {
        p.innerHTML = fourLambdas[Math.floor(Math.random() * 3)];
        foursCount++;
      } else {
        p.innerText = fourVars[Math.floor(Math.random() * 3)];
        foursCount++;
      }
      break;
    case 8:
      if (eightCount % 2 == 0) {
        p.innerHTML = eightLambdas[Math.floor(Math.random() * 3)];
        eightCount++;
      } else {
        p.innerText = eightVars[Math.floor(Math.random() * 3)];
        eightCount++;
      }
      break;
    case 16:
      if (sixteenCount % 2 == 0) {
        p.innerHTML = sixteenLambdas[Math.floor(Math.random() * 3)];
        sixteenCount++;
      } else {
        p.innerText = sixteenVars[Math.floor(Math.random() * 3)];
        sixteenCount++;
      }
      break;
    case 32:
      if (thirtyTwoCount % 2 == 0) {
        p.innerHTML = thirtyTwoLambdas[Math.floor(Math.random() * 3)];
        thirtyTwoCount++;
      } else {
        p.innerText = thirtyTwoVars[Math.floor(Math.random() * 3)];
        thirtyTwoCount++;
      }
      break;
    case 64:
      if (sixtyFourCount % 2 == 0) {
        p.innerHTML = sixtyFourLambdas[Math.floor(Math.random() * 3)];
        sixtyFourCount++;
      } else {
        p.innerText = sixtyFourVars[Math.floor(Math.random() * 3)];
        sixtyFourCount++;
      }
      break;
    case 128:
      if (oneTwentyEightCount % 2 == 0) {
        p.innerHTML = oneTwentyEightLambdas[Math.floor(Math.random() * 3)];
        oneTwentyEightCount++;
      } else {
        p.innerText = oneTwentyEightVars[Math.floor(Math.random() * 3)];
        oneTwentyEightCount++;
      }
      break;
    case 256:
      if (twoFiftySixCount % 2 == 0) {
        p.innerHTML = twoFiftySixLambdas[Math.floor(Math.random() * 3)];
        twoFiftySixCount++;
      } else {
        p.innerText = twoFiftySixVars[Math.floor(Math.random() * 3)];
        twoFiftySixCount++;
      }
      break;
    case 512:
      if (fiveTwelveCount % 2 == 0) {
        p.innerHTML = fiveTwelveLambdas[Math.floor(Math.random() * 3)];
        fiveTwelveCount++;
      } else {
        p.innerText = fiveTwelveVars[Math.floor(Math.random() * 3)];
        fiveTwelveCount++;
      }
      break;
    case 1024:
      if (oneZeroTwoFourCount % 2 == 0) {
        p.innerHTML = oneZeroTwoFourLambdas[Math.floor(Math.random() * 3)];
        oneZeroTwoFourCount++;
      } else {
        p.innerText = oneZeroTwoFourVars[Math.floor(Math.random() * 3)];
        oneZeroTwoFourCount++;
      }
      break;
    case 2048:
      if (twoZeroFourEightCount % 2 == 0) {
        p.innerHTML = twoZeroFourEightLambdas[Math.floor(Math.random() * 3)];
        twoZeroFourEightCount++;
      } else {
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

function placeNewTiles(): void {
  let blankIndexes = boardState
    .map((tile, i) => {
      if (tile.classList.contains("blankTile")) {
        return i;
      } else {
        return -1;
      }
    })
    .filter((index) => index != -1);

  if (blankIndexes.length == 1) {
    let newSquare1 = generateTile(2);
    let position1 = blankIndexes[0];
    boardState[position1] = newSquare1;
    return;
  }
  
  if (blankIndexes.length == 0) {
    return;
  }

  let newSquare1 = generateTile(2);
  let newSquare2 = generateTile(2);

  let position1 = blankIndexes[Math.floor(Math.random() * blankIndexes.length)];
  let position2 = blankIndexes[Math.floor(Math.random() * blankIndexes.length)];
  while (position1 == position2) {
    position2 = blankIndexes[Math.floor(Math.random() * blankIndexes.length)];
  }

  boardState[position1] = newSquare1;
  boardState[position2] = newSquare2;
}

function checkMatch(tile1: HTMLElement, tile2: HTMLElement): HTMLDivElement {
  let tag1 = tile1.dataset.value;
  let tag2 = tile2.dataset.value;

  if (tag1 == tag2) {
    if (Number(tag1) * 2 == 2048) {
      win();
      let div = document.createElement("div");
      div.classList.add("no");
      return div;
    }
    let newTile = generateTile(Number(tag1) * 2);
    return newTile;
  } else {
    let div = document.createElement("div");
    div.classList.add("no");
    return div;
  }
}

function moveLeft(): void {
  boardState.forEach((tile, i) => {
    if (tile.classList.contains("blankTile") || i % 4 == 0) {
      return;
    } else if (i % 4 == 1) {
      if (boardState[i - 1].classList.contains("blankTile")) {
        const newBoardState = [
          ...boardState.slice(0, i - 1),
          tile,
          getBlankTile(),
          ...boardState.slice(i + 1),
        ];

        boardState = newBoardState;
      } else {
        let matched = checkMatch(tile, boardState[i - 1]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 1),
            matched,
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];
          boardState = newBoardState;
        }
      }
    } else if (i % 4 == 2) {
      if (
        boardState[i - 1].classList.contains("blankTile") &&
        boardState[i - 2].classList.contains("blankTile")
      ) {
        const newBoardState = [
          ...boardState.slice(0, i - 2),
          tile,
          getBlankTile(),
          getBlankTile(),
          ...boardState.slice(i + 1),
        ];

        boardState = newBoardState;
      } else if (
        boardState[i - 1].classList.contains("blankTile") &&
        boardState[i - 2].classList.contains("tile")
      ) {
        let matched = checkMatch(tile, boardState[i - 2]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 2),
            matched,
            getBlankTile(),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        } else {
          const newBoardState = [
            ...boardState.slice(0, i - 2),
            boardState[i - 2],
            tile,
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        }
      } else {
        let matched = checkMatch(tile, boardState[i - 1]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 1),
            matched,
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        }
      }
    } else if (i % 4 == 3) {
      if (
        boardState[i - 1].classList.contains("blankTile") &&
        boardState[i - 2].classList.contains("blankTile") &&
        boardState[i - 3].classList.contains("blankTile")
      ) {
        const newBoardState = [
          ...boardState.slice(0, i - 3),
          tile,
          getBlankTile(),
          getBlankTile(),
          getBlankTile(),
          ...boardState.slice(i + 1),
        ];

        boardState = newBoardState;
      } else if (
        boardState[i - 1].classList.contains("blankTile") &&
        boardState[i - 2].classList.contains("blankTile") &&
        boardState[i - 3].classList.contains("tile")
      ) {
        let matched = checkMatch(tile, boardState[i - 3]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 3),
            matched,
            getBlankTile(),
            getBlankTile(),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        } else {
          const newBoardState = [
            ...boardState.slice(0, i - 3),
            boardState[i - 3],
            tile,
            getBlankTile(),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        }
      } else if (
        boardState[i - 1].classList.contains("blankTile") &&
        boardState[i - 2].classList.contains("tile")
      ) {
        let matched = checkMatch(tile, boardState[i - 2]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 2),
            matched,
            getBlankTile(),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        } else {
          const newBoardState = [
            ...boardState.slice(0, i - 2),
            boardState[i - 2],
            tile,
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        }
      } else {
        let matched = checkMatch(tile, boardState[i - 1]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 1),
            matched,
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        }
      }
    }
  });

  placeNewTiles();
  updateScreen();

  lose();
}

function moveRight(): void {
  boardState.forEach((tile, i) => {
    if (tile.classList.contains("blankTile") || i % 4 == 3) {
      return;
    } else if (i % 4 == 2) {
      if (boardState[i + 1].classList.contains("blankTile")) {
        const newBoardState = [
          ...boardState.slice(0, i),
          getBlankTile(),
          tile,
          ...boardState.slice(i + 2),
        ];

        boardState = newBoardState;
      } else {
        let matched = checkMatch(tile, boardState[i + 1]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i),
            getBlankTile(),
            matched,
            ...boardState.slice(i + 2),
          ];
          boardState = newBoardState;
        }
      }
    } else if (i % 4 == 1) {
      if (
        boardState[i + 1].classList.contains("blankTile") &&
        boardState[i + 2].classList.contains("blankTile")
      ) {
        const newBoardState = [
          ...boardState.slice(0, i),
          getBlankTile(),
          getBlankTile(),
          tile,
          ...boardState.slice(i + 3),
        ];

        boardState = newBoardState;
      } else if (
        boardState[i + 1].classList.contains("blankTile") &&
        boardState[i + 2].classList.contains("tile")
      ) {
        let matched = checkMatch(tile, boardState[i + 2]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i),
            getBlankTile(),
            getBlankTile(),
            matched,
            ...boardState.slice(i + 3),
          ];

          boardState = newBoardState;
        } else {
          const newBoardState = [
            ...boardState.slice(0, i),
            getBlankTile(),
            tile,
            boardState[i + 2],
            ...boardState.slice(i + 3),
          ];

          boardState = newBoardState;
        }
      } else {
        let matched = checkMatch(tile, boardState[i + 1]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i),
            getBlankTile(),
            matched,
            ...boardState.slice(i + 2),
          ];

          boardState = newBoardState;
        }
      }
    } else if (i % 4 == 0) {
      if (
        boardState[i + 1].classList.contains("blankTile") &&
        boardState[i + 2].classList.contains("blankTile") &&
        boardState[i + 3].classList.contains("blankTile")
      ) {
        const newBoardState = [
          ...boardState.slice(0, i),
          getBlankTile(),
          getBlankTile(),
          getBlankTile(),
          tile,
          ...boardState.slice(i + 4),
        ];

        boardState = newBoardState;
      } else if (
        boardState[i + 1].classList.contains("blankTile") &&
        boardState[i + 2].classList.contains("blankTile") &&
        boardState[i + 3].classList.contains("tile")
      ) {
        let matched = checkMatch(tile, boardState[i + 3]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i),
            getBlankTile(),
            getBlankTile(),
            getBlankTile(),
            matched,
            ...boardState.slice(i + 4),
          ];

          boardState = newBoardState;
        } else {
          const newBoardState = [
            ...boardState.slice(0, i),
            getBlankTile(),
            getBlankTile(),
            tile,
            boardState[i + 3],
            ...boardState.slice(i + 4),
          ];

          boardState = newBoardState;
        }
      } else if (
        boardState[i + 1].classList.contains("blankTile") &&
        boardState[i + 2].classList.contains("tile")
      ) {
        let matched = checkMatch(tile, boardState[i + 2]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i),
            getBlankTile(),
            getBlankTile(),
            matched,
            ...boardState.slice(i + 3),
          ];

          boardState = newBoardState;
        } else {
          const newBoardState = [
            ...boardState.slice(0, i),
            getBlankTile(),
            tile,
            boardState[i + 2],
            ...boardState.slice(i + 3),
          ];

          boardState = newBoardState;
        }
      } else {
        let matched = checkMatch(tile, boardState[i + 1]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i),
            getBlankTile(),
            matched,
            ...boardState.slice(i + 2),
          ];

          boardState = newBoardState;
        }
      }
    }
  });

  placeNewTiles();
  updateScreen();

  lose();
}

function moveUp(): void {
  boardState.forEach((tile, i) => {
    if (tile.classList.contains("blankTile") || i / 4 < 1) {
      return;
    } else if (2 > i / 4 && i / 4 >= 1) {
      if (boardState[i - 4].classList.contains("blankTile")) {
        const newBoardState = [
          ...boardState.slice(0, i - 4),
          tile,
          ...boardState.slice(i - 3, i),
          getBlankTile(),
          ...boardState.slice(i + 1),
        ];

        boardState = newBoardState;
      } else {
        let matched = checkMatch(tile, boardState[i - 4]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 4),
            matched,
            ...boardState.slice(i - 3, i),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];
          boardState = newBoardState;
        }
      }
    } else if (3 > i / 4 && i / 4 >= 2) {
      if (
        boardState[i - 4].classList.contains("blankTile") &&
        boardState[i - 8].classList.contains("blankTile")
      ) {
        const newBoardState = [
          ...boardState.slice(0, i - 8),
          tile,
          ...boardState.slice(i - 7, i - 4),
          getBlankTile(),
          ...boardState.slice(i - 3, i),
          getBlankTile(),
          ...boardState.slice(i + 1),
        ];

        boardState = newBoardState;
      } else if (
        boardState[i - 4].classList.contains("blankTile") &&
        boardState[i - 8].classList.contains("tile")
      ) {
        let matched = checkMatch(tile, boardState[i - 8]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 8),
            matched,
            ...boardState.slice(i - 7, i - 4),
            getBlankTile(),
            ...boardState.slice(i - 3, i),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        } else {
          const newBoardState = [
            ...boardState.slice(0, i - 8),
            boardState[i - 8],
            ...boardState.slice(i - 7, i - 4),
            tile,
            ...boardState.slice(i - 3, i),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        }
      } else {
        let matched = checkMatch(tile, boardState[i - 4]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 4),
            matched,
            ...boardState.slice(i - 3, i),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        }
      }
    } else if (i / 4 >= 3) {
      if (
        boardState[i - 4].classList.contains("blankTile") &&
        boardState[i - 8].classList.contains("blankTile") &&
        boardState[i - 12].classList.contains("blankTile")
      ) {
        const newBoardState = [
          ...boardState.slice(0, i - 12),
          tile,
          ...boardState.slice(i - 11, i - 8),
          getBlankTile(),
          ...boardState.slice(i - 7, i - 4),
          getBlankTile(),
          ...boardState.slice(i - 3, i),
          getBlankTile(),
          ...boardState.slice(i + 1),
        ];

        boardState = newBoardState;
      } else if (
        boardState[i - 4].classList.contains("blankTile") &&
        boardState[i - 8].classList.contains("blankTile") &&
        boardState[i - 12].classList.contains("tile")
      ) {
        let matched = checkMatch(tile, boardState[i - 12]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 12),
            matched,
            ...boardState.slice(i - 11, i - 8),
            getBlankTile(),
            ...boardState.slice(i - 7, i - 4),
            getBlankTile(),
            ...boardState.slice(i - 3, i),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        } else {
          const newBoardState = [
            ...boardState.slice(0, i - 12),
            boardState[i - 12],
            ...boardState.slice(i - 11, i - 8),
            tile,
            ...boardState.slice(i - 7, i - 4),
            getBlankTile(),
            ...boardState.slice(i - 3, i),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        }
      } else if (
        boardState[i - 4].classList.contains("blankTile") &&
        boardState[i - 8].classList.contains("tile")
      ) {
        let matched = checkMatch(tile, boardState[i - 8]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 8),
            matched,
            ...boardState.slice(i - 7, i - 4),
            getBlankTile(),
            ...boardState.slice(i - 3, i),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        } else {
          const newBoardState = [
            ...boardState.slice(0, i - 8),
            boardState[i - 8],
            ...boardState.slice(i - 7, i - 4),
            tile,
            ...boardState.slice(i - 3, i),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        }
      } else {
        let matched = checkMatch(tile, boardState[i - 4]);
        if (matched.classList.contains("tile")) {
          const newBoardState = [
            ...boardState.slice(0, i - 4),
            matched,
            ...boardState.slice(i - 3, i),
            getBlankTile(),
            ...boardState.slice(i + 1),
          ];

          boardState = newBoardState;
        }
      }
    }
  });

  placeNewTiles();
  updateScreen();

  lose();
}

function moveDown(): void {

  placeNewTiles();
  updateScreen();

  lose();
}

function addColor(): void {
  boardState.forEach((tile) => {
    if (tile.classList.contains("blankTile")) {
      return;
    }
    tile.classList.add(numToString(Number(tile.dataset.value)));
  });
}

function removeColor(): void {
  boardState.forEach((tile) => {
    if (tile.classList.contains("blankTile")) {
      return;
    }
    tile.classList.remove(numToString(Number(tile.dataset.value)));
  });
}

function checkIfGameOver(): boolean {
  let tiles = boardState
    .map((tile, i) => {
      if (tile.classList.contains("tile")) {
        return i;
      } else {
        return -1;
      }
    })
    .filter((index) => index != -1);
  
  if (
    boardState.filter((tile) => tile.classList.contains("blankTile")).length != 0
  ) {
    return false;
  } else {
    tiles.forEach((index) => {
      if (index - 4 >= 1) {
        let matchedUp = checkMatch(boardState[index], boardState[index - 4]);
        if (matchedUp.classList.contains("tile")) {
          return false;
        }
      }
      if (index + 4 < 16) {
        let matchedDown = checkMatch(boardState[index], boardState[index + 4]);
        if (matchedDown.classList.contains("tile")) {
          return false;
        }
      }
      if (index % 4 != 0) {
        let matchedLeft = checkMatch(boardState[index], boardState[index - 1]);
        if (matchedLeft.classList.contains("tile")) {
          return false;
        }
      }
      if (index % 4 != 3) {
        let matchedRight = checkMatch(boardState[index], boardState[index + 1]);
        if (matchedRight.classList.contains("tile")) {
          return false;
        }
      }
    });
  }
  return true;
}

function win(): void {
  winMenu.style.display = "block";
}

function lose(): void {
  if (checkIfGameOver()) {
    let highestLevel = Math.max(...boardState.map((tile) => Number(tile.dataset.value)));
    let score = document.getElementById("score")!;
    score.innerText = String(highestLevel);
    console.log(highestLevel);
    loseMenu.style.display = "block";
  } else {
    loseMenu.style.display = "none";
  }
}
