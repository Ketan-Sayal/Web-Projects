let buttons = document.querySelectorAll(".btn");
let msg = document.getElementById("msg");
let msgContainer = document.getElementById("msgContainer");
let reset = document.getElementById("reset");
let playAgain = document.getElementById("playAgain");
let isXTurn = true;
let isWin = false;

let wins = [[0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]];

let isDraw = () => {
    let count = 0;
    for (button of buttons) {
        if (button.innerText != '' && !isWin) {
            count++;
        }
    }
    if (count == 9) {
        return true;
    }
    else {
        return false;
    }
};

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (isXTurn) {
            button.style.color = "red";
            button.innerText = "X";
            isXTurn = false;
            button.disabled = true;
        }
        else {
            button.style.color = "blue";
            button.innerText = "O";
            isXTurn = true;
            button.disabled = true;
        }
        wins.forEach(win => {
            let val1 = buttons[win[0]].innerText;
            let val2 = buttons[win[1]].innerText;
            let val3 = buttons[win[2]].innerText;
            if (val1 != "" && val2 != "" && val3 != "") {
                if (val1 == val2 && val1 == val3) {
                    msg.innerHTML = `Result: ${val1} Wins`;
                    msgContainer.classList.remove("hidden");
                    msgContainer.classList.add("flex");
                    buttons.forEach(btn => {
                        btn.disabled = true;
                        msgContainer.classList.add("flex");
                        msgContainer.classList.remove("hidden");
                        isWin = true;
                    });
                    console.log(`Result: ${val1}`);
                }
            }
        });
        let draw = isDraw();
        if (draw) {
            msg.innerHTML = "Result: Draw";
            msgContainer.classList.remove("hidden");
            msgContainer.classList.add("flex");
            buttons.forEach(btn => {
                btn.disabled = true;
                msgContainer.classList.add("flex");
                msgContainer.classList.remove("hidden");
            });
            console.log("Result: Draw");
        }
    });
});



reset.addEventListener("click", () => { 
    msgContainer.classList.remove("flex");
    msgContainer.classList.add("hidden");
    isWin = false;
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.style.color = "";
        btn.innerText = "";
        isXTurn = true;
        msgContainer.classList.remove("flex");
        msgContainer.classList.add("hidden");
    });
});

playAgain.addEventListener("click", () => {
    msgContainer.classList.remove("flex");
    msgContainer.classList.add("hidden");
    isWin=false;
    buttons.forEach(btn => {
        btn.disabled = false;
        btn.style.color = "";
        btn.innerText = "";
        isXTurn = true;
        msgContainer.classList.remove("flex");
        msgContainer.classList.add("hidden");
    });
});