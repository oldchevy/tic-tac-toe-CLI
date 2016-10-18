var colors = require('colors');

var Board = function() {

  this._board = [
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

module.exports = Board;