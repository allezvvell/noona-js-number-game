const modeSection = document.querySelector('.mode');
const gameSection = document.querySelector('.game');
const titleDisplay = document.querySelector('.game-title');
const statusDisplay = document.querySelector('.status');
const countDisplay = document.querySelector('.count');
const inputNumber = document.querySelector('input[type="number"]');
const submitBtn = document.querySelector('.submit-btn');
const resetBtn = document.querySelector('.reset-btn');

const CHANCES_EASY = 8;
const CHANCES_NORMAL = 5;
const CHANCES_HARD = 3;
let gameMode = undefined;
let answer = undefined;
let submittedNumbers = undefined;
let count = undefined;

modeSection.addEventListener('click', (e) => {
  const target = e.target;
  if (target.tagName !== 'BUTTON') return;
  gameMode = target.dataset.mode;
  startGame();
  modeSection.classList.add('hide');
  gameSection.classList.remove('hide');
});

submitBtn.addEventListener('click', () => {
  const value = inputNumber.value;
  if (value < 1 || value > 100 || Math.trunc(value) != value) {
    fillStatusDisplay('invalid');
    return;
  }
  if (submittedNumbers.includes(value)) {
    fillStatusDisplay('duplication');
    return;
  }
  addSubmittedNumber(value);
  compareValueAnswer(value);
  setCount();
});

resetBtn.addEventListener('click', () => {
  startGame();
  submitBtn.disabled = false;
  inputNumber.value = '';
});

inputNumber.addEventListener('focus', (e) => {
  e.currentTarget.value = '';
});

function startGame() {
  answer = getRandomNumber();
  submittedNumbers = [];
  count =
    gameMode === 'easy'
      ? CHANCES_EASY
      : gameMode === 'normal'
      ? CHANCES_NORMAL
      : CHANCES_HARD;
  titleDisplay.innerHTML = `숫자 맞추기 게임<br/>(${gameMode} mode)`;
  fillStatusDisplay('start');
  fillCountDisplay(count);
}

function endGame() {
  submitBtn.disabled = true;
}

function getRandomNumber() {
  const number = Math.floor(Math.random() * 100) + 1;
  return number;
}

function fillStatusDisplay(status) {
  let txt = '';
  switch (status) {
    case 'start':
      txt = `숫자를 맞춰라!`;
      break;
    case 'down':
      txt = 'down!';
      break;
    case 'up':
      txt = 'up!';
      break;
    case 'invalid':
      txt = '1과 100사이 정수를 입력하세요.';
      break;
    case 'duplication':
      txt = '중복된 숫자입니다. 다른 숫자를 입력하세요.';
      break;
    case 'correct':
      txt = '정답입니다!';
    default:
      return;
  }
  statusDisplay.innerHTML = txt;
}

function fillCountDisplay(num) {
  countDisplay.innerHTML = `남은기회:<em>${num}</em>`;
}

function addSubmittedNumber(value) {
  submittedNumbers.push(value);
}

function compareValueAnswer(value) {
  if (value === answer) {
    endGame();
    fillStatusDisplay('correct');
  } else {
    if (value > answer) {
      fillStatusDisplay('down');
    } else {
      fillStatusDisplay('up');
    }
  }
}

function setCount() {
  fillCountDisplay(--count);
  if (count === 0) {
    endGame();
  }
}
