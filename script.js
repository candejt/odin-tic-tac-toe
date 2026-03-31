
//board and marker. module
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

    return {getBoard, placeMarker, checkWin};

})();

//players. factory
const Player=function(name, marker){
    return{name, marker}
};

const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");


//Controller. module
const gameController = (function(){
    const players =[player1, player2];

    let activePlayer=players[0];
    const getActivePlayer=()=>activePlayer;

    const switchPlayerTurn=()=>{
        if (activePlayer === players[0]){
            activePlayer = players[1]
        }else{
            activePlayer = players[0]
        }
    };

    const playRound = (index)=>{
        if (gameBoard.getBoard()[index] !== "") return;

        console.log(`Marking cell ${index} for ${getActivePlayer().name}`);
        
        gameBoard.placeMarker(index, getActivePlayer().marker);

        if(gameBoard.checkWin()){
            console.log(`GAME OVER! ${getActivePlayer().name} is the winner`);
            return
        }

        switchPlayerTurn();
    };
    return {playRound, getActivePlayer}

}) ();


