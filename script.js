let questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    id: 2,
    question: "Which HTML tag is used to create a hyperlink?",
    choices: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: "<a>",
  },
  {
    id: 3,
    question: "Which CSS property changes the text color?",
    choices: ["font-style", "background-color", "color", "text-decoration"],
    correctAnswer: "color",
  },
  {
    id: 4,
    question:
      "Which JavaScript keyword declares a variable that can be reassigned?",
    choices: ["const", "let", "static", "define"],
    correctAnswer: "let",
  },
  {
    id: 5,
    question: "Which JavaScript method adds an element to the end of an array?",
    choices: ["pop()", "shift()", "push()", "unshift()"],
    correctAnswer: "push()",
  },
];

// DOM Elements
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next");
const questionNumber = document.querySelector(".question-number");

// Quiz variables
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;


// Display Question
function displayQuestion() {
  answerSelected = false;

  const currentQuestion = questions[currentQuestionIndex];

  // Display question
  questionElement.textContent = currentQuestion.question;

  // Display question number
  questionNumber.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;

  // Clear previous answers
  answersContainer.innerHTML = "";

  // Generate answer buttons
  currentQuestion.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice;
    button.classList.add("answer");

    button.addEventListener("click", function () {
      selectAnswer(button, choice);
    });

    answersContainer.appendChild(button);
  });

  // Disable Next button until an answer is selected
  nextButton.disabled = true;
}

// Select Answer
function selectAnswer(selectedButton, answer) {
  if (answerSelected) return;

  answerSelected = true;

  const currentQuestion = questions[currentQuestionIndex];

  const allAnswers = document.querySelectorAll(".answer");

  // Disable all answer buttons
  allAnswers.forEach(function (button) {
    button.disabled = true;

    // Highlight correct answer
    if (button.textContent === currentQuestion.correctAnswer) {
      button.style.border = "2px solid green";
    }
  });

  // Check selected answer
  if (answer === currentQuestion.correctAnswer) {
    selectedButton.style.backgroundColor = "#d1fae5";
    selectedButton.style.border = "2px solid green";

    score++;
    scoreElement.textContent = `Score: ${score}`;
  } else {
    selectedButton.style.backgroundColor = "#fee2e2";
    selectedButton.style.border = "2px solid red";
  }

  // Enable Next button
  nextButton.disabled = false;
}

// Next Question
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showResults();
  }
}

// Show Final Results
function showResults() {
  questionElement.textContent = "Quiz Completed!";

  answersContainer.innerHTML = `
    <h2>Your final score: ${score} / ${questions.length}</h2>
    <p>You got ${Math.round((score / questions.length) * 100)}% correct answers.</p>
    <button id="restart" class="answer">Restart Quiz</button>
  `;

  questionNumber.textContent = "Finished";

  nextButton.style.display = "none";

  document.getElementById("restart").addEventListener("click", restartQuiz);
}

// Restart Quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  scoreElement.textContent = "Score: 0";

  nextButton.style.display = "block";

  displayQuestion();
}

// Next Button Event
nextButton.addEventListener("click", nextQuestion);

// Start Quiz
displayQuestion();
