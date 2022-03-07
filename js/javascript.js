const stage = document.getElementById('game-stage');
const gameLog = document.getElementById('log');
const gameOver = new AbortController();

// Canned log messages,
// First key digit is winning choice, second - losing choice
const RESULTS = {
  '0-2': 'As it always has, Rock crushes Scissors',
  '0-4': 'Rock crushes Lizard',
  '1-0': 'Paper covers Rock',
  '1-3': 'Paper disproves Spock',
  '2-1': 'Scissors cut Paper',
  '2-4': 'Scissors decapitate Lizard',
  '3-0': 'Spock vaporizes Rock',
  '3-2': 'Spock smashes Scissors',
  '4-1': 'Lizard eats Paper',
  '4-3': 'Lizard poisons Spock',
};

const rpsMoves = document.getElementById('moves');
const movesArray = Array.from(rpsMoves.children);

let computerScore = 0;
let playerScore = 0;

// -- Main function --
rpsMoves.addEventListener(
  'click',
  (e) => {
    if (e.target.closest('BUTTON')) {
      playRound(
        playerSelection(e.target.closest('BUTTON')),
        computerSelection()
      );
    }
  },
  { signal: gameOver.signal }
);

const rulesButton = document.getElementById('btn-rules');
rulesButton.addEventListener('click', (e) => toggleRules());

// -- Function Definitions --
function playerSelection(rpsButton) {
  return movesArray.indexOf(rpsButton);
}

function computerSelection() {
  return Math.floor(Math.random() * 5);
}

function playRound(playerSelection, computerSelection) {
  gameStage(playerSelection, computerSelection);
  getResult(playerSelection, computerSelection);
  displayScore();

  if (playerScore === 5) {
    printWinner('Player');
    gameOver.abort();
  } else if (computerScore === 5) {
    printWinner('Computer');
    gameOver.abort();
    //clearStage(stage);
  }
}

function displayScore() {
  const playerTotal = document.getElementById('player-score');
  const computerTotal = document.getElementById('computer-score');

  playerTotal.innerHTML = `<p>PLAYER:<br>${playerScore}</p>`;
  computerTotal.innerHTML = `<p>COMPUTER:<br>${computerScore}</p>`;
}

// Display current round's selections
function gameStage(playerSelection, computerSelection) {
  stage.innerHTML = `<div class="move">${movesArray[playerSelection].innerHTML}</div><p>VS</p><div class="move">${movesArray[computerSelection].innerHTML}</div>`;
}

// Determine winner, print the result and update score
function getResult(playerSelection, computerSelection) {
  let winner = gameLog.children[0];
  let result = gameLog.children[1];

  if (playerSelection === computerSelection) {
    winner.style.color = '#1fbffc';
    winner.textContent = "It's a Tie!";
    result.innerHTML = '&nbsp;';
  } else if (((playerSelection - computerSelection + 5) % 5) % 2 === 1) {
    winner.style.color = '#0F0';
    result.style.color = '#0F0';
    winner.textContent = 'Player Wins!';
    result.textContent = RESULTS[`${playerSelection}-${computerSelection}`];
    playerScore++;
  } else {
    winner.style.color = '#F00';
    result.style.color = '#F00';
    winner.textContent = 'Computer Wins!';
    result.textContent = RESULTS[`${computerSelection}-${playerSelection}`];
    computerScore++;
  }
}

function printWinner(winner) {
  stage.innerHTML = `<p>${winner} won!</p>`;
  gameLog.innerHTML = '';
  rpsMoves.innerHTML = '';
  rpsMoves.removeEventListener('click', (e) => inputListener(e));
  clearStage();
}

function clearStage() {
  const resetBtn = document.createElement('button');

  resetBtn.textContent = 'Play Again!';
  resetBtn.addEventListener('click', (e) => {
    if (e.target.closest('BUTTON')) location.reload();
  });
  gameLog.appendChild(resetBtn);
}

// Toggle sidepanel
function toggleRules() {
  let rules = document.getElementById('rules');
  if (rules.style.display !== 'none') {
    rules.style.display = 'none';
    rulesButton.style.left = '-80px';
    rulesButton.textContent = 'Show Rules';
  } else {
    1;
    rules.style.display = '';
    rulesButton.style.left = '230px';
    rulesButton.textContent = 'Hide Rules';
  }
}
