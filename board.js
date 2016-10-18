var colors = require('colors');

var Board = function(board) {

  this._board = board || [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

};


Board.prototype.drawBoard = function() {

  var drawn = '';
  drawn += '   0 | 1 | 2\n'.underline.green;

  this._board.forEach(function(row, i) {
    
    var line = (i + ': ').green;
    row.forEach(function(col, j) {
      line += col + '   ';
    });

    drawn += line + '\n';
  });

  return drawn;
};

Board.prototype.insert = function(row, col, player) {

  var mark = player ? 'X' : 'O';
  if (row < 3 && col < 3) {
    this._board[row][col] = mark;
  }

};

Board.prototype.checkPosition = function(row, col) {
  if (row !== '' && col !== '') {
    return this._board[row][col] === ' ';
  } else {
    return false;
  }
};

Board.prototype.winChecker = function() {

  var winner = this._rowChecker() ||
               this._colChecker() ||
               this._diagChecker() ||
               this._fullChecker();

  return winner ? winner : undefined;
};

Board.prototype._rowChecker = function() {

  var counters = {
    X: 0,
    O: 0
  };
  var result;

  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      var position = this._board[row][col];
      if (position !== ' ') {
        counters[position]++;
      }
    }

    //Check to see if a row was full of one thing
    //and reset for the next row
    for (var player in counters) {
      if (counters[player] === 3) {
        result = player;
      }
      counters[player] = 0;
    }

  }

  // console.log('Inside row checker: ', counters);

  return result;
};

Board.prototype._colChecker = function() {

  var counters = {
    X: 0,
    O: 0
  };
  var result;

  for (var col = 0; col < 3; col++) {
    for (var row = 0; row < 3; row++) {
      var position = this._board[row][col];
      if (position !== ' ') {
        counters[position]++;
      }
    }

    //Check to see if a row was full of one thing
    //and reset for the next row
    for (var player in counters) {
      if (counters[player] === 3) {
        result = player;
      }
      counters[player] = 0;
    }

  }

  // console.log('Inside col checker: ', counters);

  return result;
};

Board.prototype._diagChecker = function() {

  var rightcounters = {
    X: 0,
    O: 0
  };
  var leftcounters = {
    X: 0,
    O: 0
  };

  var result;

  //Check right & left diagonal in the same loop
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      var position = this._board[row][col];
      if (position !== ' ' && row === col) {
        rightcounters[position]++;
      }
      if (position !== ' ' && row === 2 - col) {
        leftcounters[position]++;
      }
    }
  }

  for (var player in rightcounters) {
    if (rightcounters[player] === 3) {
      result = player;
    }
  }

  for (var player in leftcounters) {
    if (leftcounters[player] === 3) {
      result = player;
    }
  }

  // console.log('Inside diag checker: ', leftcounters, rightcounters);

  return result;
};

Board.prototype._fullChecker = function() {

  var result = true;

  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      var position = this._board[row][col];
      if (position === ' ') {
        result = false;
        break;
      }
    }
  }

  // console.log('Inside full checker: ', '"' + result + '"');

  return result;
};

module.exports = Board;