const allButtons = document.querySelectorAll('#buttons button');
const possibleMoves = ["rock", "paper", "scissors"];
const winningConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};
const imageDict = {
    "rock" : "img/rock.png",
    "paper" : "img/paper.png",
    "scissors" : "img/scissors.png"
};

const X = document.getElementById("close-modal");
const modal = document.getElementById("modal-bg");
const modalContent = document.getElementById("modal-content");
const endScreen = document.getElementById("end-screen");
const endScreenText = document.getElementById("end-screen-text");
const playAgainButton = document.getElementById("play-again");

X.addEventListener("click", function() {
    modal.style.display = 'none';
});

playAgainButton.addEventListener("click", function () {
    modal.style.display = 'none';
    playerScore = 0;
    computerScore = 0;
    document.getElementById("player-img").src="img/fist.png";
    document.getElementById("computer-img").src="img/inv_fist.png";
    document.getElementById("subheading").textContent="Play another round!";
    document.getElementById("player-score").textContent=playerScore;
    document.getElementById("computer-score").textContent=computerScore;
})

var isAnimating = false;
var playerScore = 0
var computerScore = 0

function playAnimation(elementId, onCallback) {
    var elem = document.getElementById(elementId);
    let pos = 0;
    let frameCounter = 0;
    const id = setInterval(frame, 2);

    document.getElementById("player-img").src="img/fist.png";
    document.getElementById("computer-img").src="img/inv_fist.png";

    function frame() {
        if (frameCounter == 320) {
        clearInterval(id);
        if (onCallback){
            onCallback();
            return;
        }}

        let blockNumber = Math.floor(frameCounter / 40);
        if (blockNumber % 2 === 0) {
            pos++;
        } else {
            pos--;
        }

        elem.style.transform = `translateY(-${pos}px)`; 
        frameCounter++;
    }
}

function playRound(playerMove){
    let i = Math.floor(Math.random() * possibleMoves.length);
    let computerMove = possibleMoves[i];

    if (winningConditions[playerMove] == computerMove){
        playerScore++;
        document.getElementById("subheading").textContent="You Win!";
    } else if (winningConditions[computerMove] == playerMove){
        computerScore++;
        document.getElementById("subheading").textContent="Computer Wins!";
    }

    else {
        document.getElementById("subheading").textContent="Draw!"
    }

    if (playerScore >= 5 || computerScore >= 5){
        modal.style.display = 'flex';
        modalContent.style.display = "none";
        endScreen.style.display = "block";

        if (playerScore >= 5){
            endScreenText.textContent = "You win! You saved the Earth. The Evil Computer will now die, and you can play another round against his evil twin."
        } else {
            endScreenText.textContent = "You lose. Everyone you love will perish. Wop wop."
        }
    }


    document.getElementById("player-img").src=imageDict[playerMove];
    document.getElementById("computer-img").src=imageDict[computerMove];

    document.getElementById("player-score").textContent=playerScore;
    document.getElementById("computer-score").textContent=computerScore;
}

allButtons.forEach(button => {
    // For each button, we add a 'click' event listener
    button.addEventListener('click', function() {
        if (isAnimating) {
            console.log("Animation in progress, please wait.");
            return;
        }

        isAnimating = true
        console.log(this.className + ' button was clicked!'); // 'this' refers to the button that was clicked
        document.getElementById("subheading").textContent="Playing...";
        allButtons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5'; 
        });

        var playerMove = this.className

        playAnimation('player-img');
        playAnimation('computer-img', function() {
            console.log("Animation finished!");
            isAnimating = false
            playRound(playerMove)

            allButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1'; 
            });
        });

    });
});




