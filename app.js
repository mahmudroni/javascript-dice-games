/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, diceDom, diceDomTwo, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {

        // 1. Random number
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;
        console.log(diceOne);
        console.log(diceTwo);

        // 2. Display the Results
        diceDom.style.display = 'block';
        diceDom.src = 'img\/dice-' + diceOne + '.png';
        diceDomTwo.style.display = 'block';
        diceDomTwo.src = 'img\/dice-' + diceTwo + '.png';

        // 3. Update the Scores
        /*
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        */
        if (diceOne !== 1 && diceTwo !== 1) {
            // Add Score
            roundScore += (diceOne + diceTwo);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
    //lastDice = dice;
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Add the Round Score to the GLOBAL Variable
        scores[activePlayer] += roundScore;

        // 2. Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;

        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }


        // Check if the Playes Win
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDom.style.display = 'none';
            diceDomTwo.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    // Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    diceDom.style.display = 'none';
    diceDomTwo.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceDom = document.querySelector('.dice');
    diceDomTwo = document.querySelector('.dice-two');
    diceDom.style.display = 'none';
    diceDomTwo.style.display = 'none';
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}