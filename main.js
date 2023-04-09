// khai báo biến:
const player1El = document.querySelector("#player--1");
const player2El = document.querySelector("#player--2");
const player1TotalPoint = document.querySelector("#player--1 .total-point");
const player2TotalPoint = document.querySelector("#player--2 .total-point");
const player1CurrentPoint = document.querySelector("#player--1 .current-point");
const player2CurrentPoint = document.querySelector("#player--2 .current-point");
let playerPlayingEl = document.querySelector(".playing");

const alertWinner = document.querySelector("#alert-winner");
const alertWinnerContainer = document.querySelector("#alert-winner .container");
const alertWinnerTitle = document.querySelector("#alert-winner .title");

const newGameBtn = document.querySelector("#new-game");
const diceEl = document.querySelector("#dice");
const rollBtn = document.querySelector("#roll");
const holdBtn = document.querySelector("#hold");

const game = {
    diceNumber: 1,

    currentPoint: 0,
    totalPoint: 0,

    playerPlaying: playerPlayingEl,
    playerPlayingCurrentPointEl: player1CurrentPoint,
    playerPlayingTotalPointEl: player1TotalPoint,

    diceList: [
        'url("../asset/images/dice-1.png")',
        'url("../asset/images/dice-2.png")',
        'url("../asset/images/dice-3.png")',
        'url("../asset/images/dice-4.png")',
        'url("../asset/images/dice-5.png")',
        'url("../asset/images/dice-6.png")',
    ],

    renderDice: function () {
        this.diceNumber = Math.floor(Math.random() * 6) + 1;
        diceEl.style.backgroundImage = `${this.diceList[this.diceNumber - 1]}`;
    },

    changePlayerTurn: function (elementHas, elementNotHave) {
        elementHas.classList.toggle("playing");
        elementNotHave.classList.toggle("playing");
        this.playerPlaying = document.querySelector(".playing");
        this.playerPlayingCurrentPointEl.innerText = `0`;
        this.playerPlayingCurrentPointEl = document.querySelector(
            ".player.playing .current-point"
        );
        this.playerPlayingTotalPointEl = document.querySelector(
            ".player.playing .total-point"
        );
        this.currentPoint = 0;
        this.totalPoint = Number(this.playerPlayingTotalPointEl.innerText);
    },

    newGame: function () {
        window.location.reload();
    },

    gamePlay: function () {
        //player choose restart:
        newGameBtn.addEventListener("click", this.newGame);

        //player choose to roll:
        rollBtn.addEventListener("click", () => {
            this.renderDice();
            if (this.diceNumber === 1) {
                this.currentPoint = 0;
                this.playerPlayingCurrentPointEl.innerText = `${this.currentPoint}`;
                this.changePlayerTurn(player1El, player2El);
            } else {
                this.currentPoint += this.diceNumber;
                this.playerPlayingCurrentPointEl.innerText = `${this.currentPoint}`;
            }
        });

        //player choose to hold:
        holdBtn.addEventListener("click", () => {
            this.totalPoint += this.currentPoint;
            this.playerPlayingTotalPointEl.innerText = `${this.totalPoint}`;
            if (this.totalPoint >= 100) {
                return this.showTheWinner();
            }
            // this.currentPoint = 0;
            this.changePlayerTurn(player1El, player2El);
        });
    },

    showTheWinner: function () {
        alertWinnerTitle.innerText = `🥇 ${
            document.querySelector(".player.playing .player__name").innerText
        } is the winner`;
        alertWinner.classList.remove("hidden");
        alertWinner.addEventListener("click", function () {
            alertWinner.classList.add("hidden");
        });

        alertWinnerContainer.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    },

    start: function () {
        this.gamePlay();
    },
};

game.start();
