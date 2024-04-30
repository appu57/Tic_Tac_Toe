const gridCells = document.querySelectorAll(".grid-cell");
const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let initialGrid = ["", "", "", "", "", "", "", "", ""];
const twoPlayer = document.querySelector(".twoPlayer");
const playerComputer = document.querySelector(".playerComputer");
let computerPlayerMode = false;
let firstPlayer = true;
let secondPlayer = false;
const gameBoard = document.querySelector(".game-board");


const winner = document.querySelector(".winner-container");
twoPlayer.addEventListener('click', function () {
     restartGame() ; //when user clicks the button we either restart
     gameBoard.classList.add("active");
     winner.innerHTML = '<p> Player 1 , make a move !'
     
})

playerComputer.addEventListener('click', function () {
    restartGame();
    gameBoard.classList.add("active"); //to show game board
    computerPlayerMode = true;//on computer VS player mode make the boolean as true so that every time after first player move we can automatically make computer move
    winner.innerHTML = '<p> Player 1 make a move ! </p>'

})
let totalMoves =0;
gridCells.forEach((gridCell, index) => {
    gridCell.addEventListener('click', function (e) {
        if (initialGrid[index] === "") {
            if (firstPlayer == true) {  //by default first player will have the option to play first so value is true in initialisation , once first player has played game turn firstPLayer as false and secondplayer as true so that on next grid-cell click  the second player's move is shown which is written in else 
                initialGrid[index] = "X";
                totalMoves+=1;
                gridCell.textContent = initialGrid[index];
             
                firstPlayer = false;
                secondPlayer = true;
                if(computerPlayerMode == true)  //if its computer mode then , once first player plays , the computer move has to play
                {
                   makeComputerMove();
                   return;
                }
                winner.innerHTML = '<p> Player 2 , make a move ! </p>'
            }
            else if (secondPlayer == true) { 
                secondPlayer = false;
                firstPlayer = true; 
                initialGrid[index] = "O";
                totalMoves+=1;
                winner.innerHTML = '<p> Player 1 , make a move ! </p>'
                gridCell.textContent = initialGrid[index];  
                            
            }
        }
        if(totalMoves >= 5) // technically a player can win after 5 moves , like player 1 shld make 3 moves to win but by the time the player1 makes (its)3rd move  the other player would have played 2 moves
        {
           displayWinner();
        }
    })
})

function makeComputerMove(){
    let move =  winningMoves("X") || winningMoves("O"); //there is two way a computer can win once by blocking player win chance or by enhancing computer player mode , so here computer is "O" so either check if O is able to win if not block player
    if(move == null)
    {
        move = checkCenter() || checkCorner() || randomPosition(); //there is no way for computer to either block the player or make computer win then either make computer move in center , corner or random
    }
    if(move != null)
    {
       initialGrid[move] = "O";
       totalMoves+=1;
       gridCells[move].textContent = initialGrid[move];
       winner.innerHTML = '<p> Player 1 , make a move ! </p>'
       if(totalMoves >= 5) // technically a player can win after 5 moves , like player 1 shld make 3 moves to win but by the time the player1 makes (its)3rd move  the other player would have played 2 moves
       {
          displayWinner();
       }
    }
    firstPlayer = true;
}

function winningMoves(winningMove){
    for(let i=0;i<winningCondition.length;i++)
    {
        const [first,second,third] = winningCondition[i];
        if(initialGrid[first] === ""  && initialGrid[second] === winningMove && initialGrid[third] === winningMove)//if first index of the considered row is "X" and second index is also "X " then computer can block player by placing "O" in third index (OR) if first index  is "O" and second is "O" then place in third and make computer win
        {
            return first;
        }
        else if(initialGrid[first] === winningMove  && initialGrid[second] === "" && initialGrid[third] === winningMove)
        {
            return second;
        }
        else if(initialGrid[first] === winningMove  && initialGrid[second] === winningMove && initialGrid[third] === "")
        {
            return third;
        }
    }
    return null;
}

function checkCenter(){
    const center = 4;//the center of grid is at index 4
    if (initialGrid[center] === "") {
        return center;
    }
    return null;
}

function checkCorner(){
    const corners = [0, 2, 6, 8];//collect the corner of the grid and then check if any corner are free then place "O" at a random place corner
    const checkForEmptyCorner = corners.filter(index => initialGrid[index] === "");
    if (checkForEmptyCorner.length > 0) {
        return checkForEmptyCorner[Math.floor(Math.random()*checkForEmptyCorner.length)];
    }
    return null;
}

function randomPosition(){
    const available = initialGrid.map((grid,index)=> grid === ""?index:null).filter(value=>value!=null); //check for empty grid in the entire grid and place "O" at random place
    if(available.length>0)
    {
        return available[Math.floor(Math.random()*available.length)];
    }
    return null;
}

function displayWinner(){
    for(let i=0;i<winningCondition.length;i++)
    {
        const [first,second,third] = winningCondition[i];
        if(initialGrid[first]===initialGrid[second] && initialGrid[second] === initialGrid[third] && initialGrid[first] === "X")
        {
            winner.innerHTML='<p> Congratulation Player 1 won the match </p>';
            break;
        }
        else if(initialGrid[first]===initialGrid[second] && initialGrid[second] === initialGrid[third] && initialGrid[first] === "O"){
            winner.innerHTML='<p> Congratulation ' + (computerPlayerMode ? 'Computer' : 'Player 2' ) +' won the match </p>';
            break;
        }
        else{
            let empty = initialGrid.filter(grid=>grid != "").length;
            if(empty == initialGrid.length)
            {
                winner.innerHTML='<p> Player , No moves</p>';

            }
        }
    }
    return null;
}

function restartGame(){
    initialGrid = ["", "", "", "", "", "", "", "", ""];
    gridCells.forEach((grid)=>{
        grid.textContent="";
    })
     computerPlayerMode = false;
    firstPlayer = true;
    secondPlayer = false;

}