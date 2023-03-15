let words = [];

const form = document.querySelector('form');
const submitButton = document.querySelector('#submit');
const finishButton = document.querySelector('#finish');

submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  const wordInput = document.querySelector('#word');
  const translationInput = document.querySelector('#translation');
  words.push({ word: wordInput.value, translation: translationInput.value });
  wordInput.value = '';
  translationInput.value = '';
});

finishButton.addEventListener('click', function(event) {
  event.preventDefault();
  finishButton.style.visibility="hidden";
  form.style.display = 'none';
  const quizSection = document.querySelector('#quiz-section');
  quizSection.style.display = 'block';
  const quizWordsList = document.querySelector('#quiz-words');
  quizWordsList.innerHTML = '';
  const numWords = Math.min(words.length, 5);
  const usedIndices = new Set();
  for (let i = 0; i < numWords; i++) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * words.length);
    } while (usedIndices.has(randomIndex));
    usedIndices.add(randomIndex);
    const word = words[randomIndex].word;
    const listItem = document.createElement('li');
    listItem.innerText = word;
    quizWordsList.appendChild(listItem);
  }
});

const checkButton = document.querySelector('#check');
checkButton.addEventListener('click', function(event) {
  event.preventDefault();
  const quizWordsList = document.querySelector('#quiz-words');
  const quizWords = quizWordsList.children;
  const resultsList = document.querySelector('#results');
  resultsList.innerHTML = '';
  let correctCount = 0;
  for (let i = 0; i < quizWords.length; i++) {
    const word = quizWords[i].innerText;
    const translation = words.find(w => w.word === word).translation;
    const input = prompt(`Please translate the word "${word}"`);
    const resultItem = document.createElement('li');
    if (input === translation) {
      resultItem.innerText = `${word} - Correct!`;
      resultItem.style.color = 'green';
      correctCount++;
    } else {
      resultItem.innerText = `${word} - Incorrect. The correct translation is "${translation}".`;
      resultItem.style.color = 'red';
    }
    resultsList.appendChild(resultItem);
  }
  const score = Math.round(correctCount / quizWords.length * 100);
  const scoreMessage = `You got ${correctCount} out of ${quizWords.length} words correct (${score}%).`;
  const scoreItem = document.createElement('li');
  scoreItem.innerText = scoreMessage;
  resultsList.insertBefore(scoreItem, resultsList.firstChild);
  const resultsSection = document.querySelector('#results-section');
  resultsSection.style.display = 'block';
});