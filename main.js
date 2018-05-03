const ORIGIN_PARENT = document.querySelector('#ORIGIN_PARENT');
const PANGRAM_ARRAY = [
  'The quick brown fox jumps over the lazy dog',
  'Nymphs blitz quick vex dwarf jog',
  'How quickly daft jumping zebras vex',
  'Quick zephyrs blow, vexing daft Jim',
  'The jay, pig, fox, zebra, and my wolves quack',
  'Blowzy red vixens fight for a quick jump',
  'Quizzical twins proved my hijack-bug fix',
  'Fake bugs put in wax jonquils drive him crazy',
  'Fax back Jim\'s Gwyneth Paltrow video quiz',
  'Jack quietly moved up front and seized the big ball of wax'
];
const NEW_SENTENCE = document.querySelector('#NEW_SENTENCE');
const INPUT_TEXT = document.querySelector('#INPUT_TEXT');
const TIMER = document.querySelector('#TIMER');
const RESET_TIMER = document.querySelector('#RESET_TIMER');

let originTextElement = document.querySelector('#originText');
let pangramIndex = 0;
// Initalize the origin text with the first pangram in the pangram array
originTextElement.innerHTML = PANGRAM_ARRAY[pangramIndex];
let originText = document.querySelector('#originText').innerHTML;
let interval;
let timer = [0, 0, 0, 0];
timerRunning = false;

NEW_SENTENCE.addEventListener('click', switchPangram);
NEW_SENTENCE.addEventListener('click', resetTimer);
INPUT_TEXT.addEventListener('keypress', startTimer);
INPUT_TEXT.addEventListener('keyup', spellCheck);
RESET_TIMER.addEventListener('click', resetTimer);

// Switch the current pangram to use for the test
function switchPangram() {
  if (pangramIndex < PANGRAM_ARRAY.length - 1) {
    pangramIndex++
  } else {
    pangramIndex = 0;
  }
  originTextElement.innerHTML = PANGRAM_ARRAY[pangramIndex];
  originText = document.querySelector('#originText').innerHTML;
}

// Add leading zero to numbers 9 or below
function leadingZero(time) {
  if (time <= 9) {
    time = `0${time}`;
  }
  return time;
}

// Start the timer
function startTimer() {
  let textLength = INPUT_TEXT.value.length;
  if (textLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(incrementTimer, 10);
  }
}

// Increment the timer in minutes, seconds and hundredths of a second
function incrementTimer() {
  let currentTime = `${leadingZero(timer[0])}:${leadingZero(timer[1])}:${leadingZero(timer[2])}`;
  TIMER.innerHTML = currentTime;
  timer[3]++;
  timer[0] = Math.floor((timer[3] / 100) / 60);
  timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
  timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Check that the input text matches the origin text
function spellCheck() {
  let text = INPUT_TEXT.value;
  let originTextMatch = originText.substring(0, text.length);
  if (text === originText) {
    ORIGIN_PARENT.className = 'd-flex justify-content-between align-items-center p-4 mb-3 alert alert-success';
    clearInterval(interval);
  } else if (text === originTextMatch) {
    ORIGIN_PARENT.className = 'd-flex justify-content-between align-items-center p-4 mb-3 alert alert-primary';
  } else {
    ORIGIN_PARENT.className = 'd-flex justify-content-between align-items-center p-4 mb-3 alert alert-danger';
  }
}

// Reset the timer
function resetTimer() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;
  INPUT_TEXT.value = '';
  TIMER.innerHTML = '00:00:00';
  ORIGIN_PARENT.className = 'd-flex justify-content-between align-items-center p-4 mb-3 alert alert-secondary';
}

// Enable Bootstrap tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
