let computerValue;
let playerValue;
let playerSelection;
const MOVES = ['rock', 'paper', 'scissors'];

game();

function game() {
  for (let i = 0; i < 5; i++) {
    playerSelection = prompt(
      "What's your play? Type in rock / paper / scissors"
    );

    let playerScore,
      computerScore = 0;

    if (!inputValidation(playerSelection)) {
      alert('Please enter rock / paper / scissors');
      console.log(i);
      console.log(playerSelection);
      i--;
    } else {
      playerValue = MOVES.indexOf(playerSelection);
      computerPlay();
      console.log(playRound(playerValue, computerValue));
    }
  }
}
function playRound(playerValue, computerValue) {
  if ((playerValue + 1) % 3 === computerValue) {
    return `You Lose, ${MOVES[computerValue]} > ${MOVES[playerValue]}!`;
  } else if (playerValue === computerValue) {
    return `It's a Tie - ${MOVES[playerValue]} vs ${MOVES[computerValue]}`;
  } else {
    return `You win, ${MOVES[playerValue]} > ${MOVES[computerValue]}`;
  }
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
    return false;
  } else {
    return true;
  }
}

function computerPlay() {
  computerValue = Math.floor(Math.random() * 3);
}
