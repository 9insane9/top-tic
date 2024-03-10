const gameBoard = (function () {
    const board = [ "","","",
                    "","","",
                    "","","",
                    ];

    return {board}

}());

const game = (function () {
    const players = playerManager()
    console.log(players)
    const firstPlayer = 0;
    const secondPlayer = 1;
    let gameOver = false;

    let activePlayer = firstPlayer;

    function placeMarker (position) {
        let marker;

        marker = players[activePlayer].marker

        if (gameBoard.board[position] === "" && !gameOver) {
            gameBoard.board.splice(position, 1, marker);

            console.log(`player${activePlayer} placed ${marker} in position ${position}`)
            console.log(gameBoard.board)

            findWinner(gameBoard.board);
            isGameOver()

            setActivePlayer()

            } else if (!gameOver)  {
            console.log("already marked")
            }
    }

    function isGameOver () {
        if (!gameBoard.board.includes("") || gameOver) {
            console.log("game is over")
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
            console.log(`player${activePlayer} has won!`)
            gameOver = true;
        }
    }

    function setActivePlayer () {
        if (!gameOver) {
            activePlayer === firstPlayer ? activePlayer = secondPlayer : activePlayer = firstPlayer;
            console.log(`next up is player${activePlayer}`)
        } else {
            console.log("new active player not set, game already over")
        }
    }

    return {placeMarker}

}())

function playerManager() {
    const players = [];

    function assignMarkers (playersArray) {
        if (players.length === 2) {
            playersArray.forEach(function(player, index) {
                index === 0 ? player.marker = "X" : player.marker = "O"
        })}    
    }

    function createPlayer (name) {
        if (players.length < 2) {
            const player = { name };
            players.push(player);
        } else {
            console.log("already have two players")
        }
        assignMarkers(players)
        
    }

    createPlayer("bib")
    createPlayer("bob")

    console.log(players)

    return players;
}


game.placeMarker(0)
game.placeMarker(3)
game.placeMarker(2)
game.placeMarker(5)
game.placeMarker(1)
game.placeMarker(4)
game.placeMarker(7)
game.placeMarker(6)
game.placeMarker(8)