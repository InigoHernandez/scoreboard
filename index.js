// Global variables that need to be accessible
var minutesLabel, secondsLabel, totalSeconds = 0;
var timerInterval = null;
var isTimerRunning = false;
var countHome = 0;
var countGuest = 0;
var scoreHome, scoreGuest;

// Functions that need to be available for inline onclick handlers
window.toggleTimer = function() {
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

function setTime() {
  totalSeconds++;
  if (secondsLabel && minutesLabel) {
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  }
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

window.add1Home = function() {
  countHome += 1;
  if (scoreHome) scoreHome.textContent = countHome;
};

window.add2Home = function() {
  countHome += 2;
  if (scoreHome) scoreHome.textContent = countHome;
};

window.add3Home = function() {
  countHome += 3;
  if (scoreHome) scoreHome.textContent = countHome;
};

window.add1Guest = function() {
  countGuest += 1;
  if (scoreGuest) scoreGuest.textContent = countGuest;
};

window.add2Guest = function() {
  countGuest += 2;
  if (scoreGuest) scoreGuest.textContent = countGuest;
};

window.add3Guest = function() {
  countGuest += 3;
  if (scoreGuest) scoreGuest.textContent = countGuest;
};

window.resetScore = function() {
  // Reset scores
  countHome = 0;
  countGuest = 0;
  if (scoreHome) scoreHome.textContent = countHome;
  if (scoreGuest) scoreGuest.textContent = countGuest;
  
  // Reset and stop timer
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  isTimerRunning = false;
  totalSeconds = 0;
  if (secondsLabel && minutesLabel) {
    secondsLabel.innerHTML = pad(0);
    minutesLabel.innerHTML = pad(0);
  }
  
  // Reset play button to play state
  var playIcon = document.getElementById("play-icon");
  var playText = document.getElementById("play-text");
  if (playIcon && playText) {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    playText.textContent = " Play";
  }
};

// Wait for DOM to be ready before accessing elements
document.addEventListener("DOMContentLoaded", function() {
  minutesLabel = document.getElementById("minutes");
  secondsLabel = document.getElementById("seconds");
  scoreHome = document.getElementById("score-home");
  scoreGuest = document.getElementById("score-guest");

  // Load saved titles from localStorage
  var titleHome = document.getElementById("title-home");
  var titleGuest = document.getElementById("title-guest");

  // Load saved titles on page load
  if (localStorage.getItem("titleHome") && titleHome) {
    titleHome.textContent = localStorage.getItem("titleHome");
  }
  if (localStorage.getItem("titleGuest") && titleGuest) {
    titleGuest.textContent = localStorage.getItem("titleGuest");
  }

  // Limit input to 16 characters
  if (titleHome) {
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

    titleHome.addEventListener("paste", function(e) {
      e.preventDefault();
      var text = (e.clipboardData || window.clipboardData).getData("text");
      var currentText = this.textContent;
      var newText = (currentText + text).substring(0, 16);
      this.textContent = newText;
    });

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

    titleHome.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        this.blur();
      }
    });
  }

  if (titleGuest) {
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

    titleGuest.addEventListener("paste", function(e) {
      e.preventDefault();
      var text = (e.clipboardData || window.clipboardData).getData("text");
      var currentText = this.textContent;
      var newText = (currentText + text).substring(0, 16);
      this.textContent = newText;
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

    titleGuest.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        this.blur();
      }
    });
  }
});
