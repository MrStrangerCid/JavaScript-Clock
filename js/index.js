var clock_inter, stopwatch_inter, stopwatch_state;

var clock = {
  start: function() {
    clock_inter = setInterval(function() {
      var time = new Date();
      var time_hours = time.getHours();
      var time_minutes = time.getMinutes();
      var time_seconds = time.getSeconds();
      var time_session = time.getHours() >= 12 ? 'PM' : 'AM';
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var curWeekDay = days[time.getDay()];
      var curDay = time.getDate();
      var curMonth = months[time.getMonth()];
      var curYear = time.getFullYear();
      var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
      var completetime = time_hours + ':' + time_minutes + ':' + time_seconds + ' ' + time_session;
      document.getElementById('clock').innerHTML = completetime + '<br>' + '<br>' + date;

      
    }, 0);
  },
  stop: function() {
    clearInterval(clock_inter);
  }
};


var start_time = 0;
var elapsed = [];
var spw_state = 0;
var spw_inter;

var stopwatch = {
  start_stop: function() {
    if (spw_state === 0) {
      spw_state = 1;
      start_time = new Date();
      
      spw_inter = setInterval(function() {
        document.getElementById('clock').innerHTML = toTimeFormat(new Date() - start_time + getSum(elapsed), 'mm:ss:msms');
      }, 0);
    } else {
      spw_state = 0;
      elapsed[elapsed.length] = new Date() - start_time;
      clearInterval(spw_inter);
    }
  },
  reset: function() {
    elapsed = [];
    document.getElementById('clock').innerHTML = toTimeFormat(0, 'mm:ss:msms');
    document.getElementById('laps').innerHTML = 'LAPS';
    clearInterval(spw_inter);
    spw_state = 0;
  },
  lap: function() {
    document.getElementById('laps').innerHTML = document.getElementById('clock').innerHTML + '<br>' + document.getElementById('laps').innerHTML;
  }
};


var start_time = 0;
var elapsed_time = 0;
var requested_time;
var timer_inter;

var timer = {
  start: function() {
    start_time = new Date();
    requested_time = toMs(document.getElementById('timer_h').value, document.getElementById('timer_m').value, document.getElementById('timer_s').value, 0);
    
    timer_inter = setInterval(function() {
      elapsed_time = new Date() - start_time;
      document.getElementById('clock').innerHTML = toTimeFormat(requested_time - elapsed_time + 1000, 'hh:mm:ss');
      if (elapsed_time >= requested_time) {
        timer.stop();
        timer.end();
      }
    }, 0);
  },
  stop: function() {
    clearInterval(timer_inter);
  },
  end: function() {
    document.getElementById('clock').innerHTML = '00:00:00';
  }
};


function newOption() {
  document.getElementById('clock').innerHTML = '00:00:00';
  clock.stop();
  stopwatch.reset();
  timer.stop();
  document.getElementById('spw_btn_wrapper').classList.add('hidden');
  document.getElementById('timer_btn_wrapper').classList.add('hidden');
  document.getElementById('lap-wrapper').classList.add('hidden');
  document.getElementById('alarm_btn_wrapper').classList.add('hidden');
}


function toTimeFormat(t, format) {

  function addDigit(n) {
    return (n < 10 ? '0':'') + n;
  }

  var ms = t % 1000;
  t = (t - ms) / 1000;
  var secs = t % 60;
  t = (t - secs) / 60;
  var mins = t % 60;
  var hrs = (t - mins) / 60;
  ms = (ms < 10) ? '00' : (ms < 100) ? '0' + Math.floor(ms / 10) : Math.floor(ms / 10);

  if (format === 'hh:mm:ss') {
    return addDigit(hrs) + ':' + addDigit(mins) + ':' + addDigit(secs);
  } else if (format === 'mm:ss:msms') {
    return addDigit(mins) + ':' + addDigit(secs) + ':' + ms;
  }
}

function toMs(h, m, s, ms) {
  return (ms + s * 1000 + m * 1000 * 60 + h * 1000 * 60 * 60);
}

function getSum(arr) {
  var a = 0;
  for (var i = 0; i < arr.length; i++) {
    a += arr[i];
  }
  return a;
}

clock.start();