let time = document.getElementById('time');
let lapArea = document.getElementById('lapArea');
let startAndStop = document.getElementById('startAndStop');
let lapAndReset = document.getElementById('lapAndReset');
let lapAndResetBtn = document.getElementById('lapAndReset-main');
let startAndStopBtn = document.getElementById('startAndStop-main');
let timer;
let count = 1;

let min = 0;
let sec = 0;
let millisec = 0;

let isStart = false;

startAndStop.addEventListener('click', () => {
    if (!isStart) {
        startAndStopBtn.innerText = 'Stop';
        startAndStopBtn.classList.remove('green');
        startAndStopBtn.classList.add('red');
        startAndStop.classList.remove('border-green');
        startAndStop.classList.add('border-red');
        lapAndResetBtn.innerHTML = 'Lap';
        
        timer = setInterval(() => {
            millisec++;
            if (millisec >= 100) {
                millisec = 0;
                sec++;
                if (sec >= 60) {
                    sec = 0;
                    min++;
                }
            }
            check();
            time.innerHTML = `${min}:${sec}:${millisec}`;
        }, 10);
        isStart = true;
    }
    else { 
        startAndStopBtn.innerText = 'Start';
        startAndStopBtn.classList.remove('red');
        startAndStopBtn.classList.add('green');
        startAndStop.classList.remove('border-red');
        startAndStop.classList.add('border-green');
        lapAndResetBtn.innerHTML = 'Reset';
        clearInterval(timer);
        isStart = false;
    }
});


lapAndReset.addEventListener('click', () => {
    if (isStart) {
        let li = document.createElement('li');
        li.innerHTML = `Lap ${count}`;
        let span = document.createElement('span');
        span.innerHTML = time.innerHTML;
        li.appendChild(span);
        lapArea.appendChild(li);
        count++;
    }
    else {
        startAndStopBtn.innerText = 'Start';
        startAndStopBtn.classList.remove('red');
        startAndStopBtn.classList.add('green');
        startAndStop.classList.remove('border-red');
        startAndStop.classList.add('border-green');
        lapAndResetBtn.innerHTML = 'Lap';
        clearInterval(timer);
        isStart = false;
        time.innerHTML = `00:00:00`;
        sec = 0;
        millisec = 0;
        min = 0;
    }
});

check = () => { 
    if (millisec < 10) {
        millisec = '0' + parseInt(millisec);
    }
    if (sec < 10) {
        sec = '0' + parseInt(sec);
    }
    if (min < 10) {
        min = '0' + parseInt(min);
    }
}