localStorage.clear();
reset();

function reset() {
  toggleStartingPlayer();
  localStorage.setItem('game', '---------');
  localStorage.setItem('turn', 'X');
  for (let id = 1; id <= 9; id++) {
    document.getElementById(`${id}`).innerHTML = '';
  }
  if (
    localStorage.getItem('starting') == 'c' &&
    localStorage.getItem('mode') == 'cpu'
  )
    cpuPlays();
}

function toggleStartingPlayer() {
  if (localStorage.getItem('starting') == 'p')
    localStorage.setItem('starting', 'c');
  else localStorage.setItem('starting', 'p');
}

function menu() {
  document.getElementById('end').style.display = 'none';
  document.getElementById('menu').style.display = 'flex';
}

function start(mode) {
  document.getElementById('end').style.display = 'none';
  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'flex';
  localStorage.setItem('mode', mode);
  if (mode == 'cpu') localStorage.setItem('starting', 'p');
}

function fieldClick(id) {
  var game = localStorage.getItem('game');
  if (game[Number(id) - 1] == '-') {
    placeOnField(id);
    if (localStorage.getItem('mode') == 'cpu') cpuPlays();
  }
}

function placeOnField(id) {
  var game = localStorage.getItem('game');
  var field = document.getElementById(id);
  if (!field.innerHTML) {
    switch (localStorage.getItem('turn')) {
      case 'X':
        field.innerHTML = 'X';
        game =
          game.substring(0, Number(id) - 1) +
          'X' +
          game.substring(Number(id) - 1 + 1);
        localStorage.setItem('turn', 'O');
        break;
      case 'O':
        field.innerHTML = 'O';
        game =
          game.substring(0, Number(id) - 1) +
          'O' +
          game.substring(Number(id) - 1 + 1);
        localStorage.setItem('turn', 'X');
        break;
    }
    localStorage.setItem('game', game);
    verifyWinner();
  }
}

function cpuPlays() {
  var game = localStorage.getItem('game');
  var emptySpaces = [];
  for (let i = 0; i < game.length; i++) {
    if (game[i] == '-') emptySpaces.push(i + 1);
  }
  var id = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
  placeOnField(id);
  verifyWinner();
}

function verifyWinner() {
  setTimeout(function () {
    var game = localStorage.getItem('game');
    var winner = '';
    winner = verifyRow();
    if (!winner) winner = verifyCol();
    if (!winner) winner = verifyDiag();
    if (winner) {
      if (confirm(`${winner} venceu! Jogar novamente?`)) reset();
      else {
        reset();
        document.getElementById('end').style.display = 'flex';
        document.getElementById('game').style.display = 'none';
      }
      return;
    }
    if (!game.includes('-')) {
      if (confirm('Empate! Jogar novamente?')) reset();
      else {
        reset();
        document.getElementById('end').style.display = 'flex';
        document.getElementById('game').style.display = 'none';
      }
    }
  }, 10);
}

function verifyRow() {
  var game = localStorage.getItem('game');
  if (game[0] != '-' && game[0] == game[1] && game[0] == game[2])
    return game[0];
  if (game[3] != '-' && game[3] == game[4] && game[3] == game[5])
    return game[3];
  if (game[6] != '-' && game[6] == game[7] && game[6] == game[8])
    return game[6];
}

function verifyCol() {
  var game = localStorage.getItem('game');
  if (game[0] != '-' && game[0] == game[3] && game[0] == game[6])
    return game[0];
  if (game[1] != '-' && game[1] == game[4] && game[1] == game[7])
    return game[1];
  if (game[2] != '-' && game[2] == game[5] && game[2] == game[8])
    return game[2];
}

function verifyDiag() {
  var game = localStorage.getItem('game');
  if (game[0] != '-' && game[0] == game[4] && game[0] == game[8])
    return game[0];
  if (game[2] != '-' && game[2] == game[4] && game[2] == game[6])
    return game[2];
}
