const playerManager = (function () {
    const players = [
                    {name: "Player0",
                    marker: "X"},

                    {name: "Player1",
                    marker: "O"}
                ];

    assignMarkers(players)

    function assignMarkers (playersArray) {
        if (players.length === 2) {
            playersArray.forEach(function(player, index) {
                index === 0 ? player.marker = "X" : player.marker = "O"
        })}}
    
    function namePlayer0 (name) {
        players[0].name = name.toString();
    }
    
    function namePlayer1 (name) {
        players[1].name = name.toString();
    }
        

    function getPlayers() {
        return players;
    }

    console.log(players)

    return {getPlayers, namePlayer0, namePlayer1};
}())


const game = (function () {
    const players = playerManager.getPlayers();
    const firstPlayer = 0;
    const secondPlayer = 1;

    let gameOver = false;
    let gameWon = false;
    let gameTied = false;
    let activePlayer = firstPlayer;

    let board = [  "","","",
                    "","","",
                    "","","",
                    ];

    function placeMarker (position) {
        let marker;

        marker = players[activePlayer].marker

        if (board[position] === "" && !gameOver) {
            board.splice(position, 1, marker);

            console.log(`${players[activePlayer].name} placed ${marker} in position ${position}.`)
            console.log(board)

            findWinner(board);
            isGameTied()

            setActivePlayer()

            } else if (!gameOver)  {
            console.log("Position already marked.")
            }
    }

    function isGameTied () {
        if (!board.includes("") && (gameOver && !gameWon)) {
            console.log("Game is tied.")
            gameTied = true;
        }
    }

    function findWinner (board) {
        if (
            (board[0] !== "" && board[0] === board[1] && board[1] === board[2]) //first row
        || (board[3] !== "" && board[3] === board[4] && board[4] === board[5]) //second row
        || (board[2] !== "" && board[2] === board[5] && board[5] === board[8]) //third row
        || (board[0] !== "" && board[0] === board[3] && board[3] === board[6]) //first column
        || (board[1] !== "" && board[1] === board[4] && board[4] === board[7]) //second column
        || (board[2] !== "" && board[2] === board[5] && board[5] === board[8]) //third column
        || (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) //top-left to bottom-right diagonal
        || (board[6] !== "" && board[6] === board[4] && board[4] === board[2]) //bottom-left to top-right diagonal
        ) {
            console.log(`${players[activePlayer].name} has won!`)
            gameOver = true;
            gameWon = true;
        } else if (!board.includes("")) {
            console.log("Game tied!")
        }
    }

    function setActivePlayer () {
        if (!gameOver && board.includes("")) {
            activePlayer === firstPlayer ? activePlayer = secondPlayer : activePlayer = firstPlayer;
            console.log(`Next up is ${players[activePlayer].name}.`)
        } else {
            console.log("New active player not set, game already over.")
        }
    }

    function getActivePlayer () {
        return activePlayer;
    }

    function restart () {
        gameOver = false;
        gameWon = false;
        gameTied = false;
        activePlayer = firstPlayer;
        board = [   "","","",
                    "","","",
                    "","","", ];
    }

    return {placeMarker, restart, getActivePlayer}

}())


const displayController = (function () {
   const gameBoxElList = document.querySelectorAll(".tic");
   const gameBoxSymbolElList = document.querySelectorAll(".mark")

   gameBoxElList.forEach((element) => {

        addEventListener("click", (e) => {
            let position = e.target.getAttribute("data-")
            console.log(position)

            gameBoxSymbolElList[position].textContent = playerManager.getPlayers()[game.getActivePlayer()].marker

            game.placeMarker(position)

            e.stopImmediatePropagation()

            //draw new grid on update instead of this

        })
   })

   
   function updateGrid () {

   }
}())
// playerManager.createPlayer("bib")
// playerManager.createPlayer("bob")



// ////player0-win
// game.placeMarker(0)
// game.placeMarker(3)
// game.placeMarker(2)
// game.placeMarker(5)
// game.placeMarker(1)
// game.placeMarker(4)
// game.placeMarker(7)
// game.placeMarker(6)
// game.placeMarker(8)

////tie
// game.placeMarker(0) 
// game.placeMarker(1)
// game.placeMarker(2)
// game.placeMarker(4)
// game.placeMarker(3)
// game.placeMarker(5)
// game.placeMarker(7)
// game.placeMarker(6)
// game.placeMarker(8)