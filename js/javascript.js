let playerChoice;
let computerScore = 0;
let playerScore = 0;

const rpsMoves = document.getElementById('moves');
const movesArray = Array.from(rpsMoves.children);

rpsMoves.addEventListener('click', (e) => {
  if (e.target.closest('BUTTON'))
    playRound(playerSelection(e.target.closest('BUTTON')), computerSelection());
});

function playerSelection(rpsButton) {
  return movesArray.indexOf(rpsButton);
}

function computerSelection() {
  return Math.floor(Math.random() * 5);
}

function playRound(playerSelection, computerSelection) {
  console.log('player: ' + movesArray[playerSelection].textContent);
  console.log('computer: ' + movesArray[computerSelection].textContent);

  gameStage(playerSelection, computerSelection);
  displayScore();

  if (playerSelection === computerSelection) console.log("It's a tie!");
  else if (((playerSelection - computerSelection + 5) % 5) % 2 === 1) {
    console.log('Player Wins');
    playerScore++;
  } else {
    console.log('Computer Wins');
    computerScore++;
  }
}
function displayScore() {
  let playerTotal = document.getElementById('player-score');
  let computerTotal = document.getElementById('computer-score');

  playerTotal.innerHTML = `<p>PLAYER:<br>${playerScore}</p>`;
  computerTotal.innerHTML = `<p>COMPUTER:<br>${computerScore}</p>`;
}
// Display current round's selections
function gameStage(playerSelection, computerSelection) {
  let stage = document.getElementById('game-stage');

  stage.innerHTML = `<div class="move">${movesArray[playerSelection].innerHTML}</div><p>VS</p><div class="move">${movesArray[computerSelection].innerHTML}</div>`;
}
// game();

// function game() {
//   for (let i = 0; i < 5; i++) {
//     playerSelection = prompt(
//       "What's your play? Type in rock / paper / scissors"
//     );

//     if (!inputValidation(playerSelection)) {
//       // Repeat the round if player's input is invalid
//       i--;
//     } else {
//       console.log(playRound(playerSelection, computerPlay()));
//     }
//   }

//   printWinner();
// }

// function inputValidation(string) {
//   if (
//     string === null ||
//     !(
//       string.toLowerCase() === 'rock' ||
//       string.toLowerCase() === 'paper' ||
//       string.toLowerCase() === 'scissors'
//     )
//   ) {
//     alert('Please enter rock / paper / scissors');
//     return false;
//   } else {
//     return true;
//   }
// }

// // Determine the round winner using modulo function,
// // more info in README.md
// function playRound(playerSelection, computerValue) {
//   let playerValue = MOVES.indexOf(playerSelection.toLowerCase());

//   if ((playerValue + 1) % 3 === computerValue) {
//     computerScore++;
//     return `You Lose, ${MOVES[computerValue]} > ${MOVES[playerValue]}!`;
//   } else if (playerValue === computerValue) {
//     return `It's a Tie - ${MOVES[playerValue]} vs ${MOVES[computerValue]}`;
//   } else {
//     playerScore++;
//     return `You win, ${MOVES[playerValue]} > ${MOVES[computerValue]}`;
//   }
// }

// function printWinner() {
//   if (playerScore > computerScore) {
//     console.log(`You won, scoring ${playerScore} to ${computerScore}!`);
//   } else if (playerScore < computerScore) {
//     console.log(`Computer won, scoring ${computerScore} to ${playerScore}!`);
//   } else {
//     console.log(`It's a tie! ${computerScore} to ${playerScore}!`);
//   }
// }
