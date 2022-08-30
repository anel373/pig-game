'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const score2El = document.querySelector('#score--2');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const currentEl2 = document.getElementById('current--2');
const diceEl = document.querySelector('.dice');

//buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//Starting conditions

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  currentEl2.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player2El.classList.remove("player--winner");
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player2El.classList.remove('player--active');
  diceEl.classList.add('hidden');

  scores = [0, 0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};
init();

const switchPl = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer = (activePlayer + 1) % 3;

  /* može i ovaj način
  if (activePlayer === 0) {
    activePlayer=1;
  } else if (activePlayer===1) {
    activePlayer=2;
  } else if(activePlayer==2){
    activePlayer=0;
  };
  */

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

//rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. check for a roled 1 ? switch to next player : add number to score.
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPl();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if score >= 100 ?
    //finish game :
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //next player
      switchPl();
    }
  }
});

btnNew.addEventListener('click', init);
