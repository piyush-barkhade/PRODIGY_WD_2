let display = document.querySelector(".display");
let startT = document.querySelector("#start");
let stopT = document.querySelector("#stop");
let lapT = document.querySelector("#lap");
let resetT = document.querySelector("#reset");
let lapList = document.querySelector("#lap-list");

let [msec, secs, mins, hrs] = [0, 0, 0, 0];

let timerId = null;
let lapCount = 0;

startT.addEventListener("click", function () {
  if (timerId) {
    clearInterval(timerId);
  }
  timerId = setInterval(startTimer, 10);
  lapT.disabled = false;
});

stopT.addEventListener("click", function () {
  clearInterval(timerId);
  lapT.disabled = true;
});

resetT.addEventListener("click", function () {
  clearInterval(timerId);
  [msec, secs, mins, hrs] = [0, 0, 0, 0];
  display.innerHTML = `00 : 00 : 00 : 00`;
  lapList.innerHTML = [];
  lapCount = 0;
  lapT.disabled = true;
});

function timeFormat(lapTime) {
  let hrss = Math.floor(lapTime / 3600000);
  let minss = Math.floor(lapTime / 60000);
  let secss = Math.floor(lapTime / 1000);
  let mill = Math.floor(lapTime / 100);
  let hour = hrss < 10 ? "0" + hrss : hrss;
  let minute = minss < 10 ? "0" + minss : minss;
  let second = secss < 10 ? "0" + secss : secss;
  let milli = mill < 10 ? "0" + mill : mill;
  return hour + " : " + minute + " : " + second + " : " + milli;
}

lapT.addEventListener("click", function () {
  if (timerId) {
    lapCount++;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCount} : ${display.textContent}`;
    lapList.append(lapItem);
  }
});

function startTimer() {
  msec++;
  if (msec == 100) {
    msec = 0;
    secs++;
    if (secs == 60) {
      secs = 0;
      mins++;
      if (mins == 60) {
        mins = 0;
        hrs++;
      }
    }
  }

  let m = msec < 10 ? "0" + msec : msec;
  let s = secs < 10 ? "0" + secs : secs;
  let mi = mins < 10 ? "0" + mins : mins;
  let h = hrs < 10 ? "0" + hrs : hrs;

  display.innerHTML = `${h} : ${mi} : ${s} : ${m}`;
}
