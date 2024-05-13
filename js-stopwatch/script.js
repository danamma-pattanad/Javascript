// Buttons Selector
const startBTN = document.getElementById('startBTN')
const pauseBTN = document.getElementById('pauseBTN')
const resetBTN = document.getElementById('resetBTN')

const TimerField = document.querySelector('#timer-wrapper .timer')

var timerStart = 0,
    now;
window.addEventListener('load', ()=>{
    startBTN.style.display = `flex`;
    pauseBTN.style.display = `flex`;
    pauseBTN.classList.add("disabled");
    resetBTN.style.display = `flex`;
    resetBTN.classList.add("disabled");
})

class Timer{
    elapsedTime;
    currentTime;
    started;
    timerInterval;
    constructor(){
        this.elapsedTime = 0
    }
    timerIntervalFunc=()=>{
        console.log(this.currentTime)
        this.currentTime = Date.now() - this.started;
    }
    /* function to start the timer onclick of start button*/
    timerStart (){
        this.started = Date.now() - this.elapsedTime ;
        startBTN.innerHTML = `<span class="material-symbols-outlined">play_arrow</span> Start`;
        startBTN.style.display = `flex`;
        pauseBTN.style.display = `flex`;
        resetBTN.style.display = `flex`;
       //when timer is off Stop and Reset buttons are disabled
        pauseBTN.classList.remove("disabled");
        resetBTN.classList.remove("disabled");
        this.timerInterval = setInterval(()=>{
            this.currentTime = Date.now() - this.started;
            this.displayTimer()
        }, 0)
    } 
    /* this function display the current timer status of minutes,secs and milli secs*/
    displayTimer(){
        var timerData = this.currentTime
        this.elapsedTime = timerData
        var difMin = timerData / (1000 * 60);
        var min = Math.floor(difMin)
        var difsec = (difMin - min) * 60;
        var sec = Math.floor(difsec)
        var difms = 100 * (difsec - sec);
        var ms = Math.floor(difms)
        min = String(min).padStart(2, 0)
        sec = String(sec).padStart(2, 0)
        ms = String(ms).padStart(2, 0)
        
        TimerField.innerText = `${min}:${sec}:${ms}`
    }
    //Stop the timer on clicking the stop button
    pauseTimer(){
        clearInterval(this.timerInterval)
        startBTN.style.display = `flex`;
        pauseBTN.style.display = `none`;
        startBTN.innerHTML = `<span class="material-symbols-outlined">resume</span> Continue`
    }

    //Reset the timer start button and disable the stop and reset button after clicking reset.
    resetTimer(){
        clearInterval(this.timerInterval)
        startBTN.innerHTML = `<span class="material-symbols-outlined">play_arrow</span> Start`;
        pauseBTN.innerHTML = `<span class="material-symbols-outlined">pause</span> Stop`
        startBTN.style.display = `flex`;
        pauseBTN.style.display = `flex`;
        pauseBTN.classList.add("disabled");
        resetBTN.style.display = `flex`;
        resetBTN.classList.add("disabled");
        this.elapsedTime = 0;
        TimerField.innerText = `00:00:00`;
    }
}

let TimerObj = new Timer();
/* when webpage loads only start button should be enabled and stop and reset are disabled*/
window.addEventListener('load', ()=>{
    startBTN.style.display = `flex`;
    pauseBTN.style.display = `flex`;
    pauseBTN.classList.add("disabled");
    resetBTN.style.display = `flex`;
    resetBTN.classList.add("disabled");
})

startBTN.addEventListener('click', ()=>{
    TimerObj.timerStart();
});

pauseBTN.addEventListener('click', ()=>{
    TimerObj.pauseTimer();
});

resetBTN.addEventListener('click', ()=>{
    TimerObj.resetTimer();
});


