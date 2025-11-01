import { fetchQuestions } from "./services/quizService.js";
import { Quiz } from "./components/Quiz.js";

/**
 * Renders the quiz question and options in the UI
 */
function renderQuestion(quiz: Quiz): void {
  const container = document.getElementById("quiz-container");
  if (!container) {
    throw new Error("Quiz container not found in DOM");
  }

  const question = quiz.getCurrentQuestion();
  const questionNum = quiz.getCurrentQuestionNumber();
  const totalQuestions = quiz.getTotalQuestions();

  container.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-header">
        <h1>TypeScript Quiz</h1>
        <div class="progress">
          Question ${questionNum} of ${totalQuestions}
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${(questionNum / totalQuestions) * 100}%"></div>
          </div>
        </div>
      </div>
      
      <div class="question-section">
        <p class="difficulty">Difficulty: <span class="difficulty-${question.difficulty}">${question.difficulty}</span></p>
        <h2 class="question-text">${question.question}</h2>
        
        <div class="options-container">
          ${question.options
            .map(
              (option, index) => `
            <button class="option-btn" data-answer="${option}">
              ${option}
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  // Attach event listeners to option buttons
  const optionButtons = container.querySelectorAll(".option-btn");
  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedAnswer = button.getAttribute("data-answer");
      if (selectedAnswer) {
        handleAnswer(quiz, selectedAnswer);
      }
    });
  });
}

/**
 * Handles the answer selection and moves to next question or shows result
 */
function handleAnswer(quiz: Quiz, selectedAnswer: string): void {
  // Store correct answer before checking (since checkAnswer increments the index)
  const correctAnswer = quiz.getCurrentCorrectAnswer();
  const isCorrect = quiz.checkAnswer(selectedAnswer);
  const container = document.getElementById("quiz-container");
  if (!container) return;

  // Show feedback
  const optionButtons = container.querySelectorAll(".option-btn");
  optionButtons.forEach((btn) => {
    const btnElement = btn as HTMLButtonElement;
    const answer = btnElement.getAttribute("data-answer");
    btnElement.disabled = true;

    if (answer === correctAnswer) {
      btnElement.classList.add("correct");
    } else if (answer === selectedAnswer && !isCorrect) {
      btnElement.classList.add("incorrect");
    }
  });

  // Move to next question after a short delay
  setTimeout(() => {
    if (quiz.isQuizFinished()) {
      showResult(quiz);
    } else {
      renderQuestion(quiz);
    }
  }, 1500);
}

/**
 * Displays the final quiz result
 */
function showResult(quiz: Quiz): void {
  const container = document.getElementById("quiz-container");
  if (!container) {
    throw new Error("Quiz container not found in DOM");
  }

  const result = quiz.getResult();

  container.innerHTML = `
    <div class="result-card">
      <h1>Quiz Completed! 🎉</h1>
      <div class="result-stats">
        <div class="stat-item">
          <span class="stat-label">Total Questions:</span>
          <span class="stat-value">${result.totalQuestions}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Correct Answers:</span>
          <span class="stat-value correct">${result.correctAnswers}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Percentage:</span>
          <span class="stat-value">${result.percentage}%</span>
        </div>
      </div>
      <div class="result-message">
        <p>${getResultMessage(result.percentage)}</p>
      </div>
      <button class="restart-btn" id="restart-btn">Restart Quiz</button>
    </div>
  `;

  // Attach restart button listener
  const restartBtn = document.getElementById("restart-btn");
  restartBtn?.addEventListener("click", () => {
    startQuiz();
  });
}

/**
 * Returns a message based on the percentage score
 */
function getResultMessage(percentage: number): string {
  if (percentage >= 90) return "Outstanding! You're a TypeScript expert! 🌟";
  if (percentage >= 70) return "Great job! You have a good understanding! 👏";
  if (percentage >= 50) return "Not bad! Keep practicing! 💪";
  return "Keep learning! TypeScript takes time to master. 📚";
}

/**
 * Displays loading state
 */
function showLoading(): void {
  const container = document.getElementById("quiz-container");
  if (container) {
    container.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>Loading questions...</p>
      </div>
    `;
  }
}

/**
 * Displays error state
 */
function showError(error: Error): void {
  const container = document.getElementById("quiz-container");
  if (container) {
    container.innerHTML = `
      <div class="error-card">
        <h2>❌ Error</h2>
        <p>${error.message}</p>
        <button class="retry-btn" id="retry-btn">Retry</button>
      </div>
    `;

    const retryBtn = document.getElementById("retry-btn");
    retryBtn?.addEventListener("click", () => {
      startQuiz();
    });
  }
}

/**
 * Main function to start the quiz
 */
async function startQuiz(): Promise<void> {
  try {
    showLoading();
    const questions = await fetchQuestions();
    const quiz = new Quiz(questions);
    renderQuestion(quiz);
  } catch (error) {
    console.error("Error starting quiz:", error);
    if (error instanceof Error) {
      showError(error);
    } else {
      showError(new Error("An unknown error occurred"));
    }
  }
}

// Initialize the quiz when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startQuiz);
} else {
  startQuiz();
}

