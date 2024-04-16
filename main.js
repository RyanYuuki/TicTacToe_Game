const boardBtns = document.getElementsByClassName("container");
let playerTurn = true;
let isRunning = true;
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [2, 4, 6], [0, 4, 8] 
];
let draw = false;
let userPoints = 0;
let computerPoints = 0; 
const pointsElmt = document.getElementById("Points");
const resetElmt = document.getElementById("resetBtn");
const remarkElmt = document.getElementById("Remark");
const deciderElmt = document.getElementById("Decider");
const msgElmt = document.getElementById("msg");

function Game() { 
    resetElmt.addEventListener("click" , () => {
        resetGame();
    });
    for (let i = 0; i < boardBtns[0].children.length; i++) {
        boardBtns[0].children[i].addEventListener("click", () => {
            draw = false;
            if (playerTurn) {
                if (boardBtns[0].children[i].textContent != '') {
                    alert("Already Taken");
                } else {
                    boardBtns[0].children[i].textContent = 'X';
                    playerTurn = false;
                    setTimeout(() => {
                        computerTurn();
                    }, 1000);
                }
            }
        });
    }
}

function computerTurn()
{
let computerMove = Math.floor(Math.random() * 8);
if (boardBtns[0].children[computerMove].textContent != '') {
  computerMove = Math.floor(Math.random() * 8);
  let index = 0;
  for (let j = 0; j < 8; j++) {
    if (boardBtns[0].children[j].textContent != '') {
      index++;
    }
  }
  if (index == 8) {
    checkWinner();
    alert("Tie Game");
    isRunning = false;
  } else {
    computerTurn();
  }
} else {
  boardBtns[0].children[computerMove].textContent = 'O';
  playerTurn = true;
  checkWinner();
}
}

function checkWinner() {
    let isBoardFull = true;

    for (let combo of winningCombos) {
        if (
            boardBtns[0].children[combo[0]].textContent !== '' &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[1]].textContent &&
            boardBtns[0].children[combo[0]].textContent === boardBtns[0].children[combo[2]].textContent
        ) {
            if (boardBtns[0].children[combo[2]].textContent === 'X') {
                userPoints++;
                msgElmt.style.display = "grid";
                remarkElmt.textContent = "Damn, You're Good!";
                deciderElmt.textContent = "You Won!";
                isRunning = false;
            } else {
                computerPoints++;
                msgElmt.style.display = "grid";
                remarkElmt.textContent = "You Suck at this!";
                deciderElmt.textContent = "You Lost!";
                isRunning = false;
            }
            pointsElmt.textContent = `User Points --> ${userPoints} Computer Points --> ${computerPoints}`;
        }

        for (let i = 0; i < 3; i++) {
            if (boardBtns[0].children[combo[i]].textContent === '') {
                isBoardFull = false;
                break;
            }
        }
    }

    if (isBoardFull) {
        msgElmt.style.display = "grid";
        deciderElmt.textContent = "Tied!";
        remarkElmt.textContent = "Try Harder";
        isRunning = false;
    }
}

function resetGame(){
    for (let i = 0; i < boardBtns[0].children.length; i++) {
        boardBtns[0].children[i].textContent = '';
    }
    playerTurn = true;
    isRunning = true;
    msgElmt.style.display = "none";
}

Game();
