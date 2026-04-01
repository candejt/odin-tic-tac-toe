
//board, marker, wins, reset. module
const gameBoard = (function (){
    let board=["","","","","","","","",""];

    const getBoard = ()=>board;

    const placeMarker =(index, marker)=>{
        if(board[index]===""){
            board[index]= marker;
        }
    }
     //winner
    const checkWin = ()=>{
        const wins = [
            [0,1,2], [3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        for (let i=0; i<wins.length; i++){
            const combo = wins[i];
            const pos1 = combo[0];
            const pos2 = combo[1];
            const pos3 = combo[2];

            if (board[pos1] !== "" &&
                board[pos1] === board[pos2] &&
                board[pos1] === board[pos3]) {
                    
            return true;
            }
        }
    };
    const resetBoard = ()=>{
        board=["","","","","","","","",""];
    }
    return {getBoard, placeMarker, checkWin, resetBoard};

})();

//players. factory
const createPlayer=function(name, marker){
    return{name, marker}
};

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");


//Controller. module
const gameController = (()=>{
    // const players =[player1, player2]; no personal names
    let players=[];
    let activePlayer;

    const setPlayers = (p1, p2) =>{
        players = [p1, p2];
        activePlayer = players[0]
    };

    let gameOver = false;
    const getActivePlayer=()=>activePlayer;

    const switchPlayerTurn=()=>{
        if (activePlayer === players[0]){
            activePlayer = players[1]
        }else{
            activePlayer = players[0]
        }
    };
    const playRound = (index)=>{
        if (gameOver || gameBoard.getBoard()[index] !== "") return;

        //console.log(`Marking cell ${index} for ${getActivePlayer().name}`);
        
        gameBoard.placeMarker(index, getActivePlayer().marker);

        if(gameBoard.checkWin()){
            gameOver = true;
            //console.log(`GAME OVER! ${getActivePlayer().name} is the winner`);
            return `Winner: ${getActivePlayer().name}`;
        }

        if(!gameBoard.getBoard().includes("")){
            gameOver = true;
            return "Tie!";
        }
        
        switchPlayerTurn();
    };
    const resetGame = ()=>{
        gameBoard.resetBoard();
        activePlayer = players[0];
        gameOver = false;
    };
    return {playRound, getActivePlayer, resetGame, setPlayers}
}) ();

const displayController=(function(){
    const gameContainer = document.querySelector(".game-container");
    const statusDiv =  document.querySelector(".status");

    const updateScreen = ()=>{
        gameContainer.innerHTML="";

        const board = gameBoard.getBoard();
        const activePlayer = gameController.getActivePlayer();

        statusDiv.textContent = `It's ${activePlayer.name}'s turn (${activePlayer.marker})`
        statusDiv.style.color = "black"; 
        statusDiv.style.fontWeight = "normal";

        board.forEach((marker, index)=>{
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.index=index;
            cellButton.textContent = marker;

            cellButton.addEventListener('click', clickHandler);
            gameContainer.appendChild(cellButton);
        });
    };
    function clickHandler(e){
        const selectedIndex = e.target.dataset.index;

        const result = gameController.playRound(selectedIndex);

        updateScreen();

        //if there's a winner
        if (result){                           
            statusDiv.textContent = result;
            statusDiv.style.color="green"
        }
    }
    const resetBtn = document.querySelector("#reset-btn");

    resetBtn.addEventListener("click", () => {
        gameController.resetGame(); 
        updateScreen();           
    });
    const startBtn = document.querySelector("#start-btn")

    startBtn.addEventListener('click',()=>{
        const name1 = document.querySelector('#p1-name').value;
        const name2 = document.querySelector ('#p2-name').value;
        
        const player1= createPlayer(name1, "X");
        const player2 = createPlayer(name2, "O");

        gameController.setPlayers(player1, player2);
        updateScreen();
    })

    
    return {updateScreen}
}) ()


