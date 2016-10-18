var colors = require('colors');
var Board = require('./board');
var prompt = require('prompt');
var game = new Board();
prompt.message = 'Enter a move Player 1!\n\n' + game.drawBoard();
prompt.delimiter = ' => '.green;
var player = false;

var properties = {
  properties: {
    row: {
      pattern: /^[0-2]$/,
      message: 'Must be a valid index'
    },
    col: {
      pattern: /^[0-2]$/,
      message: 'Must be a valid index'
    }    
  }
};


var getMove = function(player) {

  var num = player ? '1' : '2';
  prompt.message = 'Enter a move Player ' + num + '!\n\n' + game.drawBoard();
  prompt.get(properties, function(err, results) {
    game.insert(results.row, results.col, player);
    player = !player;
    getMove(player);
  });
};

prompt.start();
getMove();
