var time, alarm, currentH, currentM,
    activeAlarm = false,
    sound = new Audio("sound/Loud_Alarm_Clock.mp3");

sound.loop = true;

function displayTime() {
  var now = new Date();
  time = now.toLocaleTimeString();
  clock.textContent = time;
  if (time === alarm) {
    sound.play();
    snooze.className = "";
  }
  setTimeout(displayTime, 1000);
}
displayTime();


function addMinSecVals(id) {
  var select = id;
  var min = 59;
  
  for (i = 0; i <= min; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
  }
}
function addHours(id) {
  var select = id;
  var hour = 12;
  
  for (i = 1; i <= hour; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
addMinSecVals(minutes);
addHours(hours);

startstop.onclick = function() {
  if (activeAlarm === false) {
    hours.disabled = true;
    minutes.disabled = true;
    ampm.disabled = true;
    
    alarm = hours.value + ":" + minutes.value + " " + ampm.value;
    document.getElementById('clock').innerHTML = alarm;
    this.textContent = "Clear Alarm";
    activeAlarm = true;
  } else {
    hours.disabled = false;
    minutes.disabled = false;
    ampm.disabled = false;
    
    sound.pause();
    alarm = "00:00:00 AM";
    this.textContent = "Set Alarm";
    document.getElementById('clock').innerHTML = "00:00";
    snooze.className = "hidden";
    activeAlarm = false;
  }
};


snooze.onclick = function() {
  if (activeAlarm === true) {
    currentH = time.substr(0, time.length - 9);
    currentM = time.substr(currentH.length + 1, time.length - 8);
    
    if (currentM >= "55") {
      minutes.value = "00";
      hours.value = parseInt(currentH) + 1;
    } else {
      if (parseInt(currentM) + 5 <= 9) {
        minutes.value = "0" + parseInt(currentM + 5);
      } else {
        minutes.value = parseInt(currentM) + 5;
      }
    }
    snooze.className = "hide";
    
    startstop.click();
    startstop.click();
  } else {
    return false;
  }
};