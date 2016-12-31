jQuery(document).ready(function() {
  
  //variable object for the players. Symbol represents whether they pick x or o, turn turns true when it's the player's turn, and score goes up 1 whenever someone wins 
  var player1 = {
                symbol: "",
                turn: false,
                score: 0
                };
  
  var player2 = {
                symbol: "",
                turn: false,
                score: 0
                };
  
  //variable for the tic tac toe spots on the board
  var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  //variables for each square
  var tpLeft = $(".tp-left");
  var tpMid = $(".tp-mid");
  var tpRight = $(".tp-right");
  
  var mdLeft = $(".md-left");
  var mdMid = $(".md-mid");
  var mdRight = $(".md-right");
  
  var bmLeft = $(".bm-left");
  var bmMid = $(".bm-mid");
  var bmRight = $(".bm-right");
  
  //the jquery spots equivalent to match up with board
  var boardNames = [
    [tpLeft, tpMid, tpRight],
    [mdLeft, mdMid, mdRight],
    [bmLeft, bmMid, bmRight]
  ];
  
  //variable for generating a random number between 1 and 2
  var randomFirst;
  
  var symbols = ["x", "o"];
  
  //variables for wins and tie
  var columnWin = false;
  var rowWin = false;
  var diagonalWin = false;
  var tieCount = 0;
  
  //hides all game elements, shows symbol select screen
  function hideGame() {
    $(".start-menu").show();
    $(".players, .ttt-board, .scoreboard, .p1-win, .p2-win, .tie").hide();
  }
  
  //shows all game elements, hides symbol selection screen
  function showGame() {
    $(".start-menu, .p1-win, .p2-win, .tie").hide();
    $(".players, .ttt-board, .scoreboard").show();
  }
  
  function resetGame() {
    board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
    columnWin = false;
    rowWin = false;
    diagonalWin = false;
    player1.turn = false;
    player2.turn = false;
    player1.symbol = "";
    player2.symbol = "";
    player1.score = 0;
    player2.score = 0;
    $("#p1-score, #p2-score").text(player1.score);
    tieCount = 0;
    $(".btn").empty(); 
    $(".btn").removeClass("unclickable");
    hideGame();
  }
  
  function nextGame() {
    board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
    columnWin = false;
    rowWin = false;
    diagonalWin = false;
    player1.turn = false;
    player2.turn = false;
    player1.symbol = "";
    player2.symbol = "";
    tieCount = 0;
    $(".btn").empty(); 
    $(".btn").removeClass("unclickable");
    hideGame();
  }
  
   //runs through all win combinations, and if any are present that person wins, 8 possible combinations
  function checkWin() {
   
   //cycles through the board and sets a win if it matches 3 in a row of the same symbol  
   for(let i=0; i<symbols.length; i++) {
    for(let j=0; j<board.length; j++) {
      //checks rows
      if(board[j][0] === symbols[i]  && board[j][1] === symbols[i] && board[j][2] === symbols[i]) {
        rowWin = true;
        console.log("row win");
      }
      //checks columns
      else if(board[0][j] === symbols[i] && board[1][j] === symbols[i] && board[2][j] === symbols[i]) {
        columnWin = true;
        console.log("column win");
      }
      //checks diagonals
      else if(board[0][0] === symbols[i] && board[1][1] === symbols[i] && board[2][2] === symbols[i] || board[2][0] === symbols[i] && board[1][1] === symbols[i] && board[0][2] === symbols[i] ) {
        diagonalWin = true;
        console.log("diagonal win");
      }
      //checks tie
      else if(tieCount === 9) {
        $(".btn").addClass("unclickable");
        setTimeout(function() {
        nextGame();
        $(".tie").show();
        player1.turn = false;
        player2.turn = false;
      }, 2500);
      }
      else {}
    }
   }
  };
  
   //ai for the computer to play the game
   function computerAI() {
    //WIN: If you have two in a row, play the third to get three in a row. 21 combinations
      //top row combos 
      if(board[0][0] === player2.symbol && board[0][1] === player2.symbol && board[0][2] !== player1.symbol && board[0][2] !== player2.symbol) {
        tpRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][2] = player2.symbol;
      }
      else if(board[0][1] === player2.symbol && board[0][2] === player2.symbol && board[0][0] !== player1.symbol && board[0][0] !== player2.symbol) {
        tpLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][0] = player2.symbol;
      }
      else if(board[0][0] === player2.symbol && board[0][2] === player2.symbol && board[0][1] !== player1.symbol && board[0][1] !== player2.symbol) {
        tpMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][1] = player2.symbol;
      }
      //middle row combos
      else if(board[1][0] === player2.symbol && board[1][1] === player2.symbol && board[1][2] !== player1.symbol && board[1][2] !== player2.symbol) {
        mdRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][2] = player2.symbol;
      }
      else if(board[1][1] === player2.symbol && board[1][2] === player2.symbol && board[1][0] !== player1.symbol && board[1][0] !== player2.symbol) {
        mdLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][0] = player2.symbol;
      }
      else if(board[1][0] === player2.symbol && board[1][2] === player2.symbol && board[1][1] !== player1.symbol && board[1][1] !== player2.symbol) {
        mdMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][1] = player2.symbol;
      }
      //bottom row combos
      else if(board[2][0] === player2.symbol && board[2][1] === player2.symbol && board[2][2] !== player1.symbol && board[2][2] !== player2.symbol) {
        bmRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][2] = player2.symbol;
      }
      else if(board[2][1] === player2.symbol && board[2][2] === player2.symbol && board[2][0] !== player1.symbol && board[2][0] !== player2.symbol) {
        bmLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][0] = player2.symbol;
      }
      else if(board[2][0] === player2.symbol && board[2][2] === player2.symbol && board[2][1] !== player1.symbol && board[2][1] !== player2.symbol) {
        bmMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][1] = player2.symbol;
      }
      //left column combos
      else if(board[0][0] === player2.symbol && board[1][0] === player2.symbol && board[2][0] !== player1.symbol && board[2][0] !== player2.symbol) {
        bmLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][0] = player2.symbol;
      }
      else if(board[1][0] === player2.symbol && board[2][0] === player2.symbol && board[0][0] !== player1.symbol && board[0][0] !== player2.symbol) {
        tpLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][0] = player2.symbol;
      }
      else if(board[0][0] === player2.symbol && board[2][0] === player2.symbol && board[1][0] !== player1.symbol && board[1][0] !== player2.symbol) {
        mdLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][0] = player2.symbol;
      }
      //middle column combos
      else if(board[0][1] === player2.symbol && board[1][1] === player2.symbol && board[2][1] !== player1.symbol && board[2][1] !== player2.symbol) {
        bmMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][1] = player2.symbol;
      }
      else if(board[1][1] === player2.symbol && board[2][1] === player2.symbol && board[0][1] !== player1.symbol && board[0][1] !== player2.symbol) {
        tpMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][1] = player2.symbol;
      }
      else if(board[0][1] === player2.symbol && board[2][1] === player2.symbol && board[1][1] !== player1.symbol && board[1][1] !== player2.symbol) {
        mdMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][1] = player2.symbol;
      }
      //right column combos
      else if(board[0][2] === player2.symbol && board[1][2] === player2.symbol && board[2][2] !== player1.symbol && board[2][2] !== player2.symbol) {
        bmRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][2] = player2.symbol;
      }
      else if(board[1][2] === player2.symbol && board[2][2] === player2.symbol && board[0][2] !== player1.symbol && board[0][2] !== player2.symbol) {
        tpRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][2] = player2.symbol;
      }
      else if(board[0][2] === player2.symbol && board[2][2] === player2.symbol && board[1][2] !== player1.symbol && board[1][2] !== player2.symbol) {
        mdRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][2] = player2.symbol;
      }
      //left to right diagonal combos
      else if(board[1][1] === player2.symbol && board[0][2] === player2.symbol && board[2][0] !== player1.symbol && board[2][0] !== player2.symbol) {
        bmLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][0] = player2.symbol;
      }
      else if(board[2][0] === player2.symbol && board[1][1] === player2.symbol && board[0][2] !== player1.symbol && board[0][2] !== player2.symbol) {
        tpRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][2] = player2.symbol;
      }
      else if(board[2][0] === player2.symbol && board[0][2] === player2.symbol && board[1][1] !== player1.symbol && board[1][1] !== player2.symbol) {
        mdMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][1] = player2.symbol;
      }
      //right to left diagonal combos
      else if(board[0][0] === player2.symbol && board[1][1] === player2.symbol && board[2][2] !== player1.symbol && board[2][2] !== player2.symbol) {
        bmRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][2] = player2.symbol;
      }
      else if(board[1][1] === player2.symbol && board[2][2] === player2.symbol && board[0][0] !== player1.symbol && board[0][0] !== player2.symbol) {
        tpLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][0] = player2.symbol;
      }
      else if(board[0][0] === player2.symbol && board[2][2] === player2.symbol && board[1][1] !== player1.symbol && board[1][1] !== player2.symbol) {
        mdMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][1] = player2.symbol;
      }
    
    //BLOCK: If the opponent has two in a row, play the third to block them.
     //top row combos 
      else if(board[0][0] === player1.symbol && board[0][1] === player1.symbol && board[0][2] !== player1.symbol && board[0][2] !== player2.symbol) {
        tpRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][2] = player2.symbol;
      }
      else if(board[0][1] === player1.symbol && board[0][2] === player1.symbol && board[0][0] !== player1.symbol && board[0][0] !== player2.symbol) {
        tpLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][0] = player2.symbol;
      }
      else if(board[0][0] === player1.symbol && board[0][2] === player1.symbol && board[0][1] !== player1.symbol && board[0][1] !== player2.symbol) {
        tpMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][1] = player2.symbol;
      }
      //middle row combos
      else if(board[1][0] === player1.symbol && board[1][1] === player1.symbol && board[1][2] !== player1.symbol && board[1][2] !== player2.symbol) {
        mdRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][2] = player2.symbol;
      }
      else if(board[1][1] === player1.symbol && board[1][2] === player1.symbol && board[1][0] !== player1.symbol && board[1][0] !== player2.symbol) {
        mdLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][0] = player2.symbol;
      }
      else if(board[1][0] === player1.symbol && board[1][2] === player1.symbol && board[1][1] !== player1.symbol && board[1][1] !== player2.symbol) {
        mdMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][1] = player2.symbol;
      }
      //bottom row combos
      else if(board[2][0] === player1.symbol && board[2][1] === player1.symbol && board[2][2] !== player1.symbol && board[2][2] !== player2.symbol) {
        bmRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][2] = player2.symbol;
      }
      else if(board[2][1] === player1.symbol && board[2][2] === player1.symbol && board[2][0] !== player1.symbol && board[2][0] !== player2.symbol) {
        bmLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][0] = player2.symbol;
      }
      else if(board[2][0] === player1.symbol && board[2][2] === player1.symbol && board[2][1] !== player1.symbol && board[2][1] !== player2.symbol) {
        bmMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][1] = player2.symbol;
      }
      //left column combos
      else if(board[0][0] === player1.symbol && board[1][0] === player1.symbol && board[2][0] !== player1.symbol && board[2][0] !== player2.symbol) {
        bmLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][0] = player2.symbol;
      }
      else if(board[1][0] === player1.symbol && board[2][0] === player1.symbol && board[0][0] !== player1.symbol && board[0][0] !== player2.symbol) {
        tpLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][0] = player2.symbol;
      }
      else if(board[0][0] === player1.symbol && board[2][0] === player1.symbol && board[1][0] !== player1.symbol && board[1][0] !== player2.symbol) {
        mdLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][0] = player2.symbol;
      }
      //middle column combos
      else if(board[0][1] === player1.symbol && board[1][1] === player1.symbol && board[2][1] !== player1.symbol && board[2][1] !== player2.symbol) {
        bmMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][1] = player2.symbol;
      }
      else if(board[1][1] === player1.symbol && board[2][1] === player1.symbol && board[0][1] !== player1.symbol && board[0][1] !== player2.symbol) {
        tpMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][1] = player2.symbol;
      }
      else if(board[0][1] === player1.symbol && board[2][1] === player1.symbol && board[1][1] !== player1.symbol && board[1][1] !== player2.symbol) {
        mdMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][1] = player2.symbol;
      }
      //right column combos
      else if(board[0][2] === player1.symbol && board[1][2] === player1.symbol && board[2][2] !== player1.symbol && board[2][2] !== player2.symbol) {
        bmRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][2] = player2.symbol;
      }
      else if(board[1][2] === player1.symbol && board[2][2] === player1.symbol && board[0][2] !== player1.symbol && board[0][2] !== player2.symbol) {
        tpRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][2] = player2.symbol;
      }
      else if(board[0][2] === player1.symbol && board[2][2] === player1.symbol && board[1][2] !== player1.symbol && board[1][2] !== player2.symbol) {
        mdRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][2] = player2.symbol;
      }
      //left to right diagonal combos
      else if(board[1][1] === player1.symbol && board[0][2] === player1.symbol && board[2][0] !== player1.symbol && board[2][0] !== player2.symbol) {
        bmLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][0] = player2.symbol;
      }
      else if(board[2][0] === player1.symbol && board[1][1] === player1.symbol && board[0][2] !== player1.symbol && board[0][2] !== player2.symbol) {
        tpRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][2] = player2.symbol;
      }
      else if(board[2][0] === player1.symbol && board[0][2] === player1.symbol && board[1][1] !== player1.symbol && board[1][1] !== player2.symbol) {
        mdMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][1] = player2.symbol;
      }
      //right to left diagonal combos
      else if(board[0][0] === player1.symbol && board[1][1] === player1.symbol && board[2][2] !== player1.symbol && board[2][2] !== player2.symbol) {
        bmRight.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[2][2] = player2.symbol;
      }
      else if(board[1][1] === player1.symbol && board[2][2] === player1.symbol && board[0][0] !== player1.symbol && board[0][0] !== player2.symbol) {
        tpLeft.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[0][0] = player2.symbol;
      }
      else if(board[0][0] === player1.symbol && board[2][2] === player1.symbol && board[1][1] !== player1.symbol && board[1][1] !== player2.symbol) {
        mdMid.append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
        board[1][1] = player2.symbol;
      }

    //CENTER: Play the center.
    else if(board[1][1] === "") {
      $(".md-mid").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
      board[1][1] = player2.symbol;
    }

    //OPPOSITE CORNER: If the opponent is in the corner, play the opposite corner.
     else if(board[0][0] === player1.symbol && board[2][2] !== player2.symbol) {
       $(".bm-right").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
       board[2][2] = player2.symbol;
     }
     else if(board[0][2] === player1.symbol && board[2][0] !== player2.symbol) {
       $(".bm-left").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
       board[2][0] = player2.symbol;
     }
     else if(board[2][0] === player1.symbol && board[0][2] !== player2.symbol) {
       $(".tp-right").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
       board[0][2] = player2.symbol;
     }
     else if(board[2][2] === player1.symbol && board[0][0] !== player2.symbol) {
       $(".tp-left").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
       board[0][0] = player2.symbol;
     }

    //EMPTY CORNER: Play an empty corner.
     else if(board[0][0] === "") {
       $(".tp-left").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
       board[0][0] = player2.symbol;
     } 
     else if(board[0][2] === "") {
       $(".tp-right").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
       board[0][2] = player2.symbol;
     }
     else if(board[2][0] === "") {
       $(".bm-left").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
       board[2][0] = player2.symbol;
     }
     else if(board[2][2] === "") {
       $(".bm-right").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
       board[2][2] = player2.symbol;
     }

    //EMPTY SIDE: Play an empty side.
    else if(board[1][0] === "") {
      $(".md-left").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
      board[1][0] = player2.symbol;
    }
    else if(board[1][2] === "") {
      $(".md-right").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
      board[1][2] = player2.symbol;
    }
    else if(board[0][1] === "") {
      $(".tp-mid").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
      board[0][1] = player2.symbol;
    }
    else if(board[2][1] === "") {
      $(".bm-mid").append("<span class='" + player2.symbol +"'>" + player2.symbol +"</span>");
      board[2][1] = player2.symbol;
    }   
    tieCount++;
    checkWin();
    if(rowWin === true || columnWin === true || diagonalWin === true) {
      $(".btn").addClass("unclickable");
      setTimeout(function() {
        nextGame();
        player2.score++;
        $(".p2-win").show();
        $("#p2-score").text(player2.score);
        player1.turn = false;
        player2.turn = false;
      }, 2500);
      
    } else {
      player1.turn = true;
      player2.turn = false;
      tttGame();
    }
      
      
  }
  
  //the code for allowing players to run their turns
  function tttGame() {
    //if it's player 1's turn. they are able to click the buttons
    if(player1.turn === true) {
      
      $(".btn").removeClass("unclickable");
      //tic tac toe button click
      $(".btn").click(function() {
        //if a button isn't already filled with a symbol it places one in the button clicked
        if($(this).text() === "x" || $(this).text() === "o") {

        }
        else {
          $(this).append("<span class='" + player1.symbol +"'>" + player1.symbol +"</span>");
          //goes through all board spots, and if the button has the players symbol it marks that spot on the board
          for(let i=0; i<board.length; i++) {
            for(let j=0; j<board[i].length; j++) {
              if(boardNames[i][j].text() === player1.symbol) {
                board[i][j] = player1.symbol;
              }  
            }
          }
          tieCount++
          checkWin();
          if(rowWin === true || columnWin === true || diagonalWin === true) {
            nextGame();
            player1.score++;
            $(".p1-win").show();
            $("#p1-score").text(player1.score);
            player1.turn = false;
            player2.turn = false;
            $(".btn").removeClass("unclickable");
          }
            player1.turn = false;
            player2.turn = true;
            computerAI();
        }
      });
    }
    //if it's player 2's turn. player 1 can't click buttons, and computer picks a spot
    else {
      $(".btn").addClass("unclickable");
      computerAI();
    }
  };
  
  
  //hides game elements by default
  hideGame();
  
  //clicking either selector gives the player the symbol they picked and gives player 2 the unpicked symbol, and then randomly selects who goes first
  $(".x-select").click(function() {
    showGame();
    randomFirst = 1 + Math.floor(Math.random() * 2);
    //changes color schemes to match the symbol picked
    $("#p1").removeClass("p-x p-o").addClass("p-x");
    $("#p1-score").removeClass("x-score o-score").addClass("x-score");
    $("#p2").removeClass("p-x p-o").addClass("p-o");
    $("#p2-score").removeClass("x-score o-score").addClass("o-score");
    //if random number is 1, player 1 is first, otherwise player 2 is first
    if(randomFirst === 1) {
      player1.turn = true;
      player2.turn = false;
    } 
    else {
      player1.turn = false;
      player2.turn = true; 
    }
    
    player1.symbol = "x";
    player2.symbol = "o";
    tttGame();
  });
  
  
  
    $(".o-select").click(function() {
    randomFirst = 1 + Math.floor(Math.random() * 2);
    //changes color schemes to match the symbol picked
    $("#p1").removeClass("p-x p-o").addClass("p-o");
    $("#p1-score").removeClass("x-score o-score").addClass("o-score");
    $("#p2").removeClass("p-x p-o").addClass("p-x");
    $("#p2-score").removeClass("x-score o-score").addClass("x-score");
    showGame();
    //if random number is 1, player 1 is first, otherwise player 2 is first
    if(randomFirst === 1) {
      player1.turn = true;
      player2.turn = false;
    } 
    else {
      player1.turn = false;
      player2.turn = true;
    }
      
    player1.symbol = "o";
    player2.symbol = "x";  
    tttGame()
  });
  
  $(".reset-btn").click(function() {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    resetGame();
  });
  

  
  
  
  
});
  