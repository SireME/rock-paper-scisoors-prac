const state = { player: 0, computer: 0 };

const $ = (id) => document.getElementById(id);
const playerHand = $('player-hand');
const computerHand = $('computer-hand');
const resultEl = $('result');
const buttons = document.querySelectorAll('.choice');

const MESSAGES = {
  win: 'You win this round! 🎉',
  lose: 'Computer wins this round 🤖',
  draw: "It's a draw 🤝",
};

function play(playerMove) {
  buttons.forEach((b) => (b.disabled = true));
  resultEl.className = 'result';
  resultEl.textContent = '...';
  playerHand.textContent = computerHand.textContent = '✊';
  playerHand.classList.add('shake');
  computerHand.classList.add('shake');

  setTimeout(() => {
    const computerMove = getComputerMove();
    const outcome = decide(playerMove, computerMove);

    playerHand.textContent = EMOJI[playerMove];
    computerHand.textContent = EMOJI[computerMove];
    playerHand.classList.remove('shake');
    computerHand.classList.remove('shake');

    if (outcome === 'win') state.player++;
    if (outcome === 'lose') state.computer++;
    $('player-score').textContent = state.player;
    $('computer-score').textContent = state.computer;

    resultEl.textContent = MESSAGES[outcome];
    resultEl.classList.add(outcome);
    buttons.forEach((b) => (b.disabled = false));
  }, 600);
}

buttons.forEach((b) => b.addEventListener('click', () => play(b.dataset.move)));

$('reset').addEventListener('click', () => {
  state.player = state.computer = 0;
  $('player-score').textContent = $('computer-score').textContent = 0;
  playerHand.textContent = computerHand.textContent = '❔';
  resultEl.className = 'result';
  resultEl.textContent = 'Choose your move';
});
