let time = document.getElementById('time');
let sessionCount = document.getElementById('sessionCount');
let sessionLength = document.getElementById('sessionLength');
let sessionPlus = document.getElementById('add1');
let sessionMinus = document.getElementById('minus1');
let breakLength = document.getElementById('breakLength');
let breakMinus = document.getElementById('minus2');
let breakPlus = document.getElementById('add2');
let startBtn = document.getElementById('start');
let resetBtn = document.getElementById('reset');
let count = 2;

let isClicked = false;
let startValueCheck;
let isStart = false;
let sec = 0;
let min = 0;
let timer;

let startTimer = () => {
    if (count === 2) {
        startValueCheck = parseInt(sessionLength.innerHTML);
    }

    if (!isStart) {
        isStart = true;
        min = startValueCheck;

        timer = setInterval(() => {
            if (isStart && time.innerHTML==='00:00') { }
            if (sec <= 0 && min != 0) {
                sec = 59;
                min--;
            } else {
                sec--;
            }
            if (min <= 0 && sec <= 0 && count % 2 == 0) {
                time.innerHTML = "00:00";
                min = parseInt(breakLength.innerHTML);
                sec = 0;
                count++;
                sessionCount.innerHTML = `Break!`;
            } else if (min <= 0 && sec <= 0 && count % 2 != 0) {
                time.innerHTML = "00:00";
                min = startValueCheck;
                sec = 0;
                count++;
                sessionCount.innerHTML = `Session ${Math.floor(count / 2)}`;
            }

            time.innerHTML = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        }, 10);

        if (time.innerHTML !== '00:00') {
            startBtn.innerHTML = "Pause";
        }
    } else {
        clearInterval(timer);
        startBtn.innerHTML = "Start";
        isStart = false;
    }
};
startBtn.addEventListener("click", () => {
    startTimer();
});


sessionPlus.addEventListener("click", () => {
    let sessionValue = parseInt(sessionLength.innerHTML);
    sessionLength.innerHTML = sessionValue + 5;
    time.innerHTML = `${String(sessionLength.innerHTML).padStart(2, '0')}:00`;
    startBtn.innerHTML = "Start"; 
    isClicked = true;
    clearInterval(timer);
    isStart = false; 
});

sessionMinus.addEventListener("click", () => {
    let sessionValue = parseInt(sessionLength.innerHTML);
    if (sessionValue > 0) sessionLength.innerHTML = sessionValue - 5;
    time.innerHTML = `${String(sessionLength.innerHTML).padStart(2, '0')}:00`;
    startBtn.innerHTML = "Start"; 
    isClicked = true;
    clearInterval(timer); 
    isStart = false; 
});


breakPlus.addEventListener("click", () => {
    let breakValue = parseInt(breakLength.innerHTML);
    breakLength.innerHTML = breakValue + 5;
});

breakMinus.addEventListener("click", () => {
    let breakValue = parseInt(breakLength.innerHTML);
    if(breakValue>0)breakLength.innerHTML = breakValue - 5;
});

resetBtn.addEventListener("click", () => {
    time.innerHTML = "00:00";
    sessionLength.innerHTML = "0";
    breakLength.innerHTML = "0";
    count = 2;
    isStart = false;
    isClicked = false;
    clearInterval(timer);
    startBtn.innerHTML = "Start";
    sessionCount.innerHTML = `Session 1`;
});

