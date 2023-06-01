const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".cell");
const players = document.querySelector("#playerName");

const scoreX = document.querySelector("#scoreX");
const scoreO = document.querySelector("#scoreO");

const restart = document.querySelector("#newGame");
const reset = document.querySelector("#resetGame");

let xArray, oArray, player, score0, score1;

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


resetGame();

reset.addEventListener("click", resetGame);
restart.addEventListener("click", newGame);

function clickEvent(event) {
  boxes.forEach((element, index) => {
    if (element === event.target) {
      if (player === 0) {
        element.innerHTML = "X";
        xArray.push(index);
        player = 1;
        players.innerHTML = "Player O";

      } else if (player === 1) {
        element.innerHTML = "O";
        oArray.push(index);
        player = 0;
        players.innerHTML = "Player X";
      }
    }
  });

  checkWin(wins, xArray, "Player X wins");
  checkWin(wins, oArray, "Player O wins");

  if (players.innerHTML === "Player X wins") {
    score0 += 1;
    player = 0;

  } else if (players.innerHTML === "Player O wins") {
    score1 += 1;
    player = 1;

  } else if (xArray.length === 5 || oArray.length === 5) {
    players.innerHTML = "It's a Draw";
    container.removeEventListener("click", clickEvent, false);

    xArray.forEach(element => {
      document.getElementById(element).classList.add("playerX");
    })
    oArray.forEach(element => {
      document.getElementById(element).classList.add("playerO");
    })
  }

  scoreX.innerHTML = `X: ${score0}`;
  scoreO.innerHTML = `O: ${score1}`;
}


function checkWin(winsArr, currentArr, winMessage) {
  for (let i = 0; i < winsArr.length; i++) {
    const element = winsArr[i];

    if (element.every(val => currentArr.includes(val))) {
      element.forEach(el => {
        if (currentArr === xArray) {
          document.getElementById(el).classList.add("playerX");
        } else if (currentArr === oArray) {
          document.getElementById(el).classList.add("playerO");
        }
      });

      players.innerHTML = winMessage;
      container.removeEventListener("click", clickEvent, false);
    }
  }
}


function newGame() {
  players.innerHTML = `Player ${(player === 0) ? "X" : "O"}`;

  xArray = [];
  oArray = [];

  scoreX.innerHTML = `X: ${score0}`;
  scoreO.innerHTML = `O: ${score1}`;

  boxes.forEach((element) => {
    element.innerHTML = "";
    element.classList.remove("winner", "playerX", "playerO");
  });

  container.addEventListener("click", clickEvent);
}


function resetGame() {
  player = 0;
  score0 = 0;
  score1 = 0;
  newGame();
  players.innerHTML = "Player X starts the game.";
}