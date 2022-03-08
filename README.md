# Rock Paper Scissors Spock Lizard

Revisited version of The Odin Project's Rock - Paper - Scissors

I'm quite happy with how it turned out, though I might revisit it again later, once I get some more experience under my belt.
As it stands now, the mobile experience is less than stellar.

## Project Goals

In addition to adding a GUI to a console version (now on legacy branch), I wanted to expand the game itself to use [Sam Kass' Rock Paper Scissors Spock Lizard](http://www.samkass.com/theories/RPSSL.html) rules, as popularized by the Big Bang Theory.

As far as GUI itself goes, I wanted to add not only a log, but visual representation of the actual game - both players showing their moves. I also wanted to log proper victory messages (like 'As it always has, Rock crushes Scissors').

I figured it'd be nice to have rules and a shoutout to original creators of the game as well - preferably as a sidebar, which could be toggled on and off.

Finally, as a last minute addition - a replay button, so player could go again without manually reloading the window.

### Determining Winner

Since there are 25 possible move combinations now and 21 victory cases, I didn't want to write them all out as if/else. Luckily, math provides a nice solution.

As in console version, let's begin by assigning each figure a value:

    0 - Rock
    1 - Paper
    2 - Scissors
    3 - Spock
    4 - Lizard

When we map all possible results (row headers being 'our' player's choice) in a table, we start noticing alternating pattern:


|       |         0          |         1          |         2          |         3          |         4          |
| :---: | :----------------: | :----------------: | :----------------: | :----------------: | :----------------: |
| **0** | :heavy_minus_sign: |        :x:         | :heavy_check_mark: |        :x:         | :heavy_check_mark: |
| **1** | :heavy_check_mark: | :heavy_minus_sign: |        :x:         | :heavy_check_mark: |        :x:         |
| **2** |        :x:         | :heavy_check_mark: | :heavy_minus_sign: |        :x:         | :heavy_check_mark: |
| **3** | :heavy_check_mark: |        :x:         | :heavy_check_mark: | :heavy_minus_sign: |        :x:         |
| **4** |        :x:         | :heavy_check_mark: |        :x:         | :heavy_check_mark: | :heavy_minus_sign: |

Now, if we difference between player's choices we can se 'our' player wins if result is positive **and** odd or negative **and** even.

    player1 - player2

|       |          0           |          1           |           2           |           3           |           4           |
| :---: | :------------------: | :------------------: | :-------------------: | :-------------------: | :-------------------: |
| **0** |  :heavy_minus_sign:  |        :x: -1        | :heavy_check_mark: -2 |        :x: -3         | :heavy_check_mark: -4 |
| **1** | :heavy_check_mark: 1 |  :heavy_minus_sign:  |        :x: -1         | :heavy_check_mark: -2 |        :x: -3         |
| **2** |        :x: 2         | :heavy_check_mark: 1 |  :heavy_minus_sign:   |        :x: -1         | :heavy_check_mark: -2 |
| **3** | :heavy_check_mark: 3 |        :x: 2         | :heavy_check_mark: 1  |  :heavy_minus_sign:   |        :x: -1         |
| **4** |        :x: 4         | :heavy_check_mark: 3 |         :x: 2         | :heavy_check_mark: 1  |  :heavy_minus_sign:   |

Now we can be tricky, and add 5 (number of figures), to turn all the negative numbers to positive ones. -1 becomes 4 (still losing, according to the table above), -2 becomes 3 (winning) and so on. Problem is, number in the lower left half of our table went out of whack now - player1 is now winning on even numbers there, rather than odd.

    (player1 - player2) + 5

|       |          0           |          1           |          2           |          3           |          4           |
| :---: | :------------------: | :------------------: | :------------------: | :------------------: | :------------------: |
| **0** |  :heavy_minus_sign:  |        :x: 4         | :heavy_check_mark: 3 |        :x: 2         | :heavy_check_mark: 1 |
| **1** | :heavy_check_mark: 6 |  :heavy_minus_sign:  |        :x: 4         | :heavy_check_mark: 3 |        :x: 2         |
| **2** |        :x: 7         | :heavy_check_mark: 6 |  :heavy_minus_sign:  |        :x: 4         | :heavy_check_mark: 3 |
| **3** | :heavy_check_mark: 8 |        :x: 7         | :heavy_check_mark: 6 |  :heavy_minus_sign:  |        :x: 4         |
| **4** |        :x: 9         | :heavy_check_mark: 8 |        :x: 7         | :heavy_check_mark: 6 |  :heavy_minus_sign:  |

We can easily fix it though, by running everything through mod 5:

    ((player1 - player2) + 5) % 5

|       |          0           |          1           |          2           |          3           |          4           |
| :---: | :------------------: | :------------------: | :------------------: | :------------------: | :------------------: |
| **0** |  :heavy_minus_sign:  |        :x: 4         | :heavy_check_mark: 3 |        :x: 2         | :heavy_check_mark: 1 |
| **1** | :heavy_check_mark: 1 |  :heavy_minus_sign:  |        :x: 4         | :heavy_check_mark: 3 |        :x: 2         |
| **2** |        :x: 2         | :heavy_check_mark: 1 |  :heavy_minus_sign:  |        :x: 4         | :heavy_check_mark: 3 |
| **3** | :heavy_check_mark: 3 |        :x: 2         | :heavy_check_mark: 1 |  :heavy_minus_sign:  |        :x: 4         |
| **4** |        :x: 4         | :heavy_check_mark: 3 |        :x: 2         | :heavy_check_mark: 1 |  :heavy_minus_sign:  |

Now we can see, 'our' player wins whenever the calculation returns 1 or 3 - or simply **odd**.

And so, we end up turning 21 cases into 3:

    if (player1 === player2)
        It's a tie!
    else if ((((player1 - player2) + 5) % 5) % 2 === 1)
        Player 1 wins
    else
        Player 2 wins

### Logging 'canon' victory messages

Since I didn't hardcode all the victory conditions, I needed some smarter approach to showing unique result messages as well. Preferably reusing the values I already assigned (Rock is 0, Paper is 1 and so on). Luckily, this one turned out to be quite simple. All that's needed is a simple object holding the responses, with keys using figure values:

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

First digit of the key is the winning figure, second is the losing one. Doesn't matter which player chose which one.

Then we just upgrade our victory check to show them:

    if (player1 === player2)
        It's a tie!
    else if ((((player1 - player2) + 5) % 5) % 2 === 1)
        Player 1 wins
        Print RESULTS[`${player1}-${player2}`]
    else
        Player 2 wins
        Print RESULTS[`${player2}-${player1}`]

### Credits
- Algorithm by [JL Popyack](https://www.cs.drexel.edu/~jpopyack/Courses/CSP/Fa17/notes/CS140_RockPaperScissors_Revisited.pdf)
- The font is [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) via Google Fonts
- Icons made with [Fontawesome](https://fontawesome.com)