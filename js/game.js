const MOVES = ['rock', 'paper', 'scissors'];
const EMOJI = { rock: '✊', paper: '✋', scissors: '✌️' };
const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

function getComputerMove() {
  return MOVES[Math.floor(Math.random() * MOVES.length)];
}

function decide(player, computer) {
  if (player === computer) return 'draw';
  return BEATS[player] === computer ? 'win' : 'lose';
}
