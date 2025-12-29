// Wait for DOM to be ready before accessing elements
document.addEventListener("DOMContentLoaded", function() {
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var totalSeconds = 0;
  var timerInterval = null; // Store the interval ID so we can clear it
  var isTimerRunning = false; // Track if timer is running

  function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }

  window.toggleTimer = function() {
    var playBtn = document.getElementById("play-btn");
    var playIcon = document.getElementById("play-icon");
    var playText = document.getElementById("play-text");
    
    if (isTimerRunning) {
      // Pause the timer
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
      playText.textContent = " Play";
    } else {
      // Start the timer
      timerInterval = setInterval(setTime, 1000);
      isTimerRunning = true;
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
      playText.textContent = " Pause";
    }
  };

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

  // Load saved titles from localStorage
  var titleHome = document.getElementById("title-home");
  var titleGuest = document.getElementById("title-guest");

  // Load saved titles on page load
  if (localStorage.getItem("titleHome")) {
    titleHome.textContent = localStorage.getItem("titleHome");
  }
  if (localStorage.getItem("titleGuest")) {
    titleGuest.textContent = localStorage.getItem("titleGuest");
  }

  // Limit input to 16 characters
  titleHome.addEventListener("input", function() {
    var text = this.textContent;
    if (text.length > 16) {
      this.textContent = text.substring(0, 16);
      // Move cursor to end
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(this.childNodes[0] || this, this.textContent.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  titleGuest.addEventListener("input", function() {
    var text = this.textContent;
    if (text.length > 16) {
      this.textContent = text.substring(0, 16);
      // Move cursor to end
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(this.childNodes[0] || this, this.textContent.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  // Prevent paste and limit characters
  titleHome.addEventListener("paste", function(e) {
    e.preventDefault();
    var text = (e.clipboardData || window.clipboardData).getData("text");
    var currentText = this.textContent;
    var newText = (currentText + text).substring(0, 16);
    this.textContent = newText;
  });

  titleGuest.addEventListener("paste", function(e) {
    e.preventDefault();
    var text = (e.clipboardData || window.clipboardData).getData("text");
    var currentText = this.textContent;
    var newText = (currentText + text).substring(0, 16);
    this.textContent = newText;
  });

  // Make titles editable and auto-save
  titleHome.addEventListener("blur", function() {
    var text = this.textContent.trim();
    if (text === "") {
      this.textContent = "Home";
      localStorage.setItem("titleHome", "Home");
    } else {
      this.textContent = text;
      localStorage.setItem("titleHome", text);
    }
  });

  titleGuest.addEventListener("blur", function() {
    var text = this.textContent.trim();
    if (text === "") {
      this.textContent = "Guest";
      localStorage.setItem("titleGuest", "Guest");
    } else {
      this.textContent = text;
      localStorage.setItem("titleGuest", text);
    }
  });

  // Save on Enter key press
  titleHome.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.blur();
    }
  });

  titleGuest.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.blur();
    }
  });

  window.add1Home = function() {
    countHome += 1
    scoreHome.textContent = countHome
  }

  window.add2Home = function() {
    countHome += 2
    scoreHome.textContent = countHome
  }

  window.add3Home = function() {
    countHome += 3
    scoreHome.textContent = countHome
  }

  window.add1Guest = function() {
    countGuest += 1
    scoreGuest.textContent = countGuest
  }

  window.add2Guest = function() {
    countGuest += 2
    scoreGuest.textContent = countGuest
  }

  window.add3Guest = function() {
    countGuest += 3
    scoreGuest.textContent = countGuest
  }

  window.resetScore = function() {
    // Reset scores
    countHome = 0
    scoreHome.textContent = countHome
    countGuest = 0
    scoreGuest.textContent = countGuest
    
    // Reset and stop timer
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    isTimerRunning = false;
    totalSeconds = 0
    secondsLabel.innerHTML = pad(0)
    minutesLabel.innerHTML = pad(0)
    
    // Reset play button to play state
    var playIcon = document.getElementById("play-icon");
    var playText = document.getElementById("play-text");
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    playText.textContent = " Play";
  }
});
