// DIGITAL CLOCK
function updateDigitalClock() {
    const now = new Date();
    document.getElementById("digitalClock").textContent = now.toLocaleTimeString();
  }
  setInterval(updateDigitalClock, 1000);
  
  // ANALOG CLOCK
  const canvas = document.getElementById("analogClock");
  const ctx = canvas.getContext("2d");
  const radius = canvas.height / 2;
  ctx.translate(radius, radius);
  
  function drawClock() {
    drawFace();
    drawNumbers();
    drawTime();
  }
  function drawFace() {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
  }
  function drawNumbers() {
    let ang;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }
  function drawTime() {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    hour %= 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(hour, radius * 0.5, radius * 0.07);
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(minute, radius * 0.8, radius * 0.07);
    second = (second * Math.PI / 30);
    drawHand(second, radius * 0.9, radius * 0.02);
  }
  function drawHand(pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
  setInterval(drawClock, 1000);
  
  // STOPWATCH
  let swInterval, swSeconds = 0;
  function formatTime(secs) {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }
  function updateStopwatch() {
    swSeconds++;
    document.getElementById("stopwatch").textContent = formatTime(swSeconds);
  }
  function startStopwatch() {
    if (!swInterval) swInterval = setInterval(updateStopwatch, 1000);
  }
  function pauseStopwatch() {
    clearInterval(swInterval);
    swInterval = null;
  }
  function resetStopwatch() {
    pauseStopwatch();
    swSeconds = 0;
    document.getElementById("stopwatch").textContent = "00:00:00";
  }
  
  // COUNTDOWN
  let countdownInterval;
  function startCountdown() {
    const input = document.getElementById("countdownInput");
    let timeLeft = parseInt(input.value);
    if (isNaN(timeLeft) || timeLeft <= 0) return;
    updateCountdownDisplay(timeLeft);
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      timeLeft--;
      updateCountdownDisplay(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        playAlarm();
      }
    }, 1000);
  }
  function updateCountdownDisplay(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    document.getElementById("countdown").textContent = `${m}:${s}`;
  }
  
  // ALARM
  let alarmSet = false, alarmTime;
  function setAlarm() {
    const input = document.getElementById("alarmTime").value;
    if (!input) return;
    alarmTime = input;
    alarmSet = true;
    document.getElementById("alarmStatus").textContent = `Alarm set for ${alarmTime}`;
  }
  setInterval(() => {
    if (!alarmSet) return;
    const now = new Date();
    const current = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    if (current === alarmTime) {
      playAlarm();
      alarmSet = false;
      document.getElementById("alarmStatus").textContent = "Alarm Off";
    }
  }, 1000);
  
  function playAlarm() {
    const sound = document.getElementById("alarmSound");
    sound.play();
  }
  