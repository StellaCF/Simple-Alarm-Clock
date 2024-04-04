const DomContainer = {
  date: document.getElementsByClassName("date")[0],
  hour: document.getElementById("hour"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  session: document.getElementById("session"),
};

// new date
const currentDate = new Date();
const year = currentDate.getFullYear();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const month = months[currentDate.getMonth()];
const day = currentDate.getDate();
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekday = weekdays[currentDate.getDay()]


DomContainer.date.innerHTML = `${weekday}, ${month} ${day}, ${year}`;

function tikTok() {
  let currentDate = new Date();
  let h = currentDate.getHours(); //0-23
  let m = currentDate.getMinutes(); //0-59
  let s = currentDate.getSeconds(); //0-59
  let am0rpm = "AM";

  if (h == 0) {
    h = 12;
  }
  if (h > 12) {
    h = h - 12;
    am0rpm = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  DomContainer.hour.textContent = h;
  DomContainer.minutes.textContent = m;
  DomContainer.seconds.textContent = s;
  DomContainer.session.textContent = am0rpm;

  setTimeout(tikTok, 1000)
}
tikTok();

// alarm
let activeAlarm = false;
let alarm;
let sound = new Audio("../Alarm.mp3");
sound.loop = true;

function displayTime() {
  // console.log("displayTime function is running."); // Debug output
  try {
    const now = new Date();
    let currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();
    // console.log("Current Time:", currentHours, currentMinutes, currentSeconds); // Debug output

    currentHours = currentHours > 12 ? currentHours - 12 : currentHours;

    const alarmTimeParts = alarm.split(':');
    const alarmHours = parseInt(alarmTimeParts[0], 10);
    const alarmMinutes = parseInt(alarmTimeParts[1], 10);
    const alarmSeconds = parseInt(alarmTimeParts[2], 10);
    // console.log("Alarm Time:", alarmHours, alarmMinutes, alarmSeconds); // Debug output

    // Check if the current time matches the alarm time
    if (currentHours === alarmHours && currentMinutes === alarmMinutes && currentSeconds === alarmSeconds) {
      sound.play();
    }
  } catch (error) {
    console.error("An error occurred in displayTime function:", error);
  }

  setTimeout(displayTime, 1000);
}
displayTime();

function addMinSecVals(minSecVals) {
  let select = minSecVals;
   
  for (i = 0; i <= 59; i++) {
    select.options[minSecVals.options.length] = new Option(i < 10 ? "0" + i : i, i)
  }
}

function addHourVals(hourVals) {
  let select = hourVals;
   
  for (i = 1; i <= 12; i++) {
    select.options[hourVals.options.length] = new Option(i < 10 ? "0" + i : i, i)
  }
}

document.addEventListener( 'DOMContentLoaded', function() {
  const hours = document.getElementById("alarm-hr");
  const minutes = document.getElementById("alarm-min");
  const seconds = document.getElementById("alarm-sec");
  const ampm = document.getElementById("alarm-session");

  addMinSecVals(minutes);
  addMinSecVals(seconds);
  addHourVals(hours);

  const setAlarm = document.getElementById("start");
  setAlarm.onclick = function() {
    if (activeAlarm === false) {
      hours.disabled = true;
      minutes.disabled = true;
      seconds.disabled = true;
      ampm.disabled = true;
      
      alarm = `${hours.value}:${minutes.value}:${seconds.value}:${ampm.value}`;
      this.textContent = "clear alarm";
      activeAlarm = true;
    } else {
      hours.disabled = false;
      minutes.disabled = false;
      seconds.disabled = false;
      ampm.disabled = false;

      sound.pause();
      alarm = "00:00:00AM";
      this.textContent = "set alarm";
      activeAlarm = false;
    }
  }
})