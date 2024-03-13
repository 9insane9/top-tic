const playerManager = (function () {
    const players = [
                    {name: "Player 1",
                    marker: "X"},

                    {name: "Player 2",
                    marker: "O"}
                ];
  
    function namePlayer1(name) {
        players[0].name = name.toString();
    }
    
    function namePlayer2(name) {
        players[1].name = name.toString();
    }
        
    function getPlayers() { return players };

    return { getPlayers, namePlayer1, namePlayer2 };
}());


const game = (function () {
    const players = playerManager.getPlayers();
    const firstPlayer = 0;
    const secondPlayer = 1;

    let gameOver = false;
    let activePlayer = firstPlayer;
    let gameInfoText;

    let board = [  "","","",
                    "","","",
                    "","","",
                    ];

    function placeMarker(position) {
        let marker = players[activePlayer].marker

        if (board[position] === "" && !gameOver) {
            board.splice(position, 1, marker);
            // console.log(`${players[activePlayer].name} placed ${marker} in position ${position}.`)
            // console.log(board)
            _checkWinner(board);
            _setActivePlayer();

            } else if (!gameOver)  { console.log("Invalid placement.") }
    };

    function _checkWinner(board) {
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
            gameInfoText = `${players[activePlayer].name} has won!`;
            gameOver = true;

        } else if (!board.includes("")) {
            gameInfoText = "Game tied!"
        }
    }

    function _setActivePlayer() {
        if (!gameOver && board.includes("")) {
            activePlayer === firstPlayer ? activePlayer = secondPlayer : activePlayer = firstPlayer;
            gameInfoText = `Next up is ${players[activePlayer].name}.`;
        }
    }

    function restart() {
        gameOver = false;
        activePlayer = firstPlayer;
        gameInfoText = "Tic-Tac-Toe, let's go!"
        board = [   "","","",
                    "","","",
                    "","","", ];
        
        displayController.renderBoard()
    }; 

    function getActivePlayer() { return activePlayer };

    function getBoard() { return board };

    function getGameInfoText() { return gameInfoText };

    return { placeMarker, restart, getActivePlayer, getBoard, getGameInfoText };

}());

const displayController = (function () {
   const gameBoxElList = document.querySelectorAll(".tic");
   const restartBtn = document.querySelector(".restart-btn");
   const gameInfoEl = document.querySelector(".game-info");

   gameBoxElList.forEach((element) => {

        addEventListener("click", (e) => {
            let position = e.target.getAttribute("data-")

            game.placeMarker(position)
            renderBoard()
            _renderInfo()
            e.stopImmediatePropagation()
        })
   })

   restartBtn.addEventListener("click", () => game.restart())
   
    function renderBoard() {
        //Match each array item with respective grid position and render
        game.getBoard().forEach((arrayItem, index) => {
            gameBoxElList.forEach(box => {
                const gridPosition = box.getAttribute("data-");

                if (gridPosition == index) { box.textContent = arrayItem };
            })})
    }

    function _renderInfo() { gameInfoEl.textContent = game.getGameInfoText() };

    return { renderBoard };
}());