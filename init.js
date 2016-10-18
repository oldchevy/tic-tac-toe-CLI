var colors = require('colors');
var Board = require('./board');
var prompt = require('prompt');
var game = new Board();
var takenMessage = 'Enter a valid position that has not been taken plz';

prompt.message = 'Enter a move Player 1!\n\n' + game.drawBoard();
prompt.delimiter = ' => '.blue;

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

var newGameProps = {
  properties: {
    decision: {
      pattern: /^[y|n]$/,
      message: '(Y/n)'
    }
  }
};

var newGame = function() {
  prompt.message = 'Would you like to play another game?';
  prompt.get(newGameProps, function(err, results) {
    if (results.decision === 'y') {
      game = new Board();
      getMove(true);
    } 
  });

};

var getMove = function(player, badMove) {

  var num = player ? '1' : '2';
  console.log('\n\n' + game.drawBoard());
  prompt.message = badMove 
                    ? takenMessage 
                    : 'Enter a move Player ' + num + '!';

  prompt.get(properties, function(err, results) {

    //check if the move was valid
    if (game.checkPosition(results.row, results.col)) {
      
      game.insert(results.row, results.col, player);

      //check the game conditions for a win or draw
      var winner = game.winChecker();
      if (winner) {
        winner === true 
          ? console.log('\n\nDraw -\n\n', game.drawBoard())
          : console.log('\n\nWinner is ' + winner + '!\n\n', game.drawBoard());
        newGame();
      } else {      
        player = !player;
        getMove(player, false);
      }

    //If the move isn't valid, change the prompt and not the player
    } else {
      getMove(player, true);
    }
  });
};

prompt.start();
getMove(true);
