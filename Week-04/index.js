const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');
const timerElement = document.getElementById('timer');
const timerContainerElement = document.querySelector('.timer-container');
const scoreContainerElement = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const exitButton = document.getElementById('exit-btn');
const questionNumberElement = document.getElementById('question-number');

let shuffledQuestions, currentQuestionIndex;
let timerInterval;
let timeLimit = 15;  
let score = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', startGame);
exitButton.addEventListener('click', exitGame);

function startGame() {
    startButton.classList.add('hide');
    scoreContainerElement.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    questionContainerElement.classList.remove('hide');
    timerContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    startTimer();
    updateQuestionNumber();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonElement.appendChild(button);
    });
}

function updateQuestionNumber() {
    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1}/${shuffledQuestions.length}`;
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild);
    }
    resetTimer();
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score++;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        displayScore();
    }
    clearInterval(timerInterval);  
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function startTimer() {
    let timeRemaining = timeLimit;
    timerElement.innerText = `Time: ${timeRemaining}`;
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.innerText = `Time: ${timeRemaining}`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            if (shuffledQuestions.length > currentQuestionIndex + 1) {
                nextButton.classList.remove('hide');
            } else {
                displayScore();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timerElement.innerText = `Time: ${timeLimit}`;
}

function displayScore() {
    questionContainerElement.classList.add('hide');
    timerContainerElement.classList.add('hide');
    scoreContainerElement.classList.remove('hide');
    scoreElement.innerText = `Your score: ${score}`;
}

function exitGame() {
    
    alert('Exiting the game.');
}

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false },
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false }
        ]
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answers: [
            { text: 'J.K. Rowling', correct: false },
            { text: 'Harper Lee', correct: true },
            { text: 'Mark Twain', correct: false },
            { text: 'Ernest Hemingway', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'What is the chemical symbol for water?',
        answers: [
            { text: 'O₂', correct: false },
            { text: 'H₂O', correct: true },
            { text: 'CO₂', correct: false },
            { text: 'NaCl', correct: false }
        ]
    },
    {
        question: 'How many bones are in the human body?',
        answers: [
            { text: '206', correct: true },
            { text: '208', correct: false },
            { text: '210', correct: false },
            { text: '212', correct: false }
        ]
    },
    {
        question: 'What is the hardest natural substance on Earth?',
        answers: [
            { text: 'Gold', correct: false },
            { text: 'Iron', correct: false },
            { text: 'Diamond', correct: true },
            { text: 'Platinum', correct: false }
        ]
    },
    {
        question: 'Who was the first President of the United States?',
        answers: [
            { text: 'Thomas Jefferson', correct: false },
            { text: 'Abraham Lincoln', correct: false },
            { text: 'George Washington', correct: true },
            { text: 'John Adams', correct: false }
        ]
    },
    {
        question: 'In which year did the Titanic sink?',
        answers: [
            { text: '1905', correct: false },
            { text: '1912', correct: true },
            { text: '1920', correct: false },
            { text: '1931', correct: false }
        ]
    },
]
