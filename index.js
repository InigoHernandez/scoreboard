var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

let countHome = 0;
let countGuest = 0;
let scoreHome = document.getElementById("score-home");
console.log(scoreHome);
let scoreGuest = document.getElementById("score-guest");
console.log(scoreGuest);

function add1Home() {
  countHome += 1
  scoreHome.textContent = countHome
}

function add2Home() {
  countHome += 2
  scoreHome.textContent = countHome
}

function add3Home() {
  countHome += 3
  scoreHome.textContent = countHome
}

function add1Guest() {
  countGuest += 1
  scoreGuest.textContent = countGuest
}

function add2Guest() {
  countGuest += 2
  scoreGuest.textContent = countGuest
}

function add3Guest () {
  countGuest += 3
  scoreGuest.textContent = countGuest
}

function resetScore() {
  // Reset scores
  countHome = 0
  scoreHome.textContent = countHome
  countGuest = 0
  scoreGuest.textContent = countGuest
  
  // Reset timer
  totalSeconds = 0
  secondsLabel.innerHTML = pad(0)
  minutesLabel.innerHTML = pad(0)
}
