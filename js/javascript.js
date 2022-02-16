let playerSelection;
let computerScore = 0;
let playerScore = 0;
const MOVES = ['rock', 'paper', 'scissors'];

game();

function game() {
  for (let i = 0; i < 5; i++) {
    playerSelection = prompt(
      "What's your play? Type in rock / paper / scissors"
    );

    if (!inputValidation(playerSelection)) {
      // Repeat the round if player's input is invalid
      i--;
    } else {
      console.log(playRound(playerSelection, computerPlay()));
    }
  }

  printWinner();
}

function inputValidation(string) {
  if (
    string === null ||
    !(
      string.toLowerCase() === 'rock' ||
      string.toLowerCase() === 'paper' ||
      string.toLowerCase() === 'scissors'
    )
  ) {
    alert('Please enter rock / paper / scissors');
    return false;
  } else {
    return true;
  }
}

function computerPlay() {
  return Math.floor(Math.random() * 3);
}

// Determine the round winner using modulo function,
// more info in README.md
function playRound(playerSelection, computerValue) {
  let playerValue = MOVES.indexOf(playerSelection.toLowerCase());

  if ((playerValue + 1) % 3 === computerValue) {
    computerScore++;
    return `You Lose, ${MOVES[computerValue]} > ${MOVES[playerValue]}!`;
  } else if (playerValue === computerValue) {
    return `It's a Tie - ${MOVES[playerValue]} vs ${MOVES[computerValue]}`;
  } else {
    playerScore++;
    return `You win, ${MOVES[playerValue]} > ${MOVES[computerValue]}`;
  }
}

function printWinner() {
  if (playerScore > computerScore) {
    console.log(`You won, scoring ${playerScore} to ${computerScore}!`);
  } else if (playerScore < computerScore) {
    console.log(`Computer won, scoring ${computerScore} to ${playerScore}!`);
  } else {
    console.log(`It's a tie! ${computerScore} to ${playerScore}!`);
  }
}
