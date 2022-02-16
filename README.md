# Project Odin - Rock, Paper, Scissors

First JS project of TOP - a simple Rock, Paper, Scissors game in the console.

## Project Goals

Although it's a very straightforward project, I still wanted use it as an opportunity for learing and push a little beyond my current skill level.

### Determining Winner

First point of improvement I noticed was algorithm - hardcoding all the string comparisons seemed quite boring and inefficient.

    if (playerSelection.toLowerCase() === 'rock' && computerSelection === 'paper') {
        computerScore++;
        console.log("You lost! Paper beats Rock!");
    }

And so on. Not very fun.

Luckily, a quick google search provided an elegant solution. We can map the shapes to numbers in the order they beat each other:

    Rock -> 0
    Paper -> 1
    Scissors -> 2

Ok, 1 beating 0 and 2 beating 1 is straightforward enough, but 0 beating 2 seems counter-intuitive. This is where modulo function comes in. Exact formula, in pseudocode is:

    if ((playerSelection + 1) % 3 === computerSelection)
        computer wins
    else if (playerSelection === computerSelection)
        it's a tie
    else
        player wins

**Example 1**

Player selects Rock, computer selects Paper

    Rock is 0, Paper is 1
    0 (Rock) + 1 equals 1
    1 (Rock + 1) % 3 equals 1 (Paper)
    "if ((playerSelection + 1) % 3 === computerSelection) evaluates true

Correctly, computer wins.

**Example 2**

Player selects Rock, computer selects Scissors

    Rock is 0, Scissors is 2
    1 (Rock +1) % 3 equals 1 (Paper)
    "if ((playerSelection + 1) % 3 === computerSelection) evaluates false
    "else if (playerSelection === computerSelection)" evaluates false

Only option left is player's victory.

### Translating player's input

Alright, we can determine the winner, but we still need to translate player's input to a number. We want him to input text, not numbers. My first thought was to use a switch:

    switch (playerSelection.toLowerCase()) {
        case "rock":
        playerValue = 0;
        ...
    }

But then I figured that to display the result in text, I'd need another switch for the computer - which already generated a random number in 0 - 2 range:

    switch (computerValue) {
        case 0:
        computerSelection = "rock";
        ...
    }

Instead, I created an array which both players could access to convert text to its corresponding number and vice versa, which I think is much neater solution:

    const MOVES = ["rock", "paper", "scissors"];

    playerValue = MOVES.indexOf(playerSelection.toLowerCase());
    computerSelection = MOVES[computerValue];
