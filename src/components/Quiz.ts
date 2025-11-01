import { Question } from "../models/Question.js";
import { Result } from "../models/Result.js";

/**
 * Core Quiz class that manages quiz state and logic
 */
export class Quiz {
  private currentIndex: number = 0;
  private score: number = 0;

  constructor(private questions: Question[]) {
    if (questions.length === 0) {
      throw new Error("Cannot create quiz with no questions");
    }
  }

  /**
   * Gets the current question
   * @returns The current Question object
   */
  getCurrentQuestion(): Question {
    if (this.isQuizFinished()) {
      throw new Error("Quiz is finished. No more questions available.");
    }
    return this.questions[this.currentIndex];
  }

  /**
   * Gets the correct answer for the current question
   * @returns The correct answer string
   */
  getCurrentCorrectAnswer(): string {
    if (this.isQuizFinished()) {
      throw new Error("Quiz is finished. No more questions available.");
    }
    return this.questions[this.currentIndex].correctAnswer;
  }

  /**
   * Checks if the selected answer is correct and advances to the next question
   * @param selected - The selected answer string
   * @returns true if the answer is correct, false otherwise
   */
  checkAnswer(selected: string): boolean {
    if (this.isQuizFinished()) {
      throw new Error("Quiz is finished. Cannot check answer.");
    }

    const question = this.getCurrentQuestion();
    const isCorrect = selected === question.correctAnswer;

    if (isCorrect) {
      this.score++;
    }

    this.currentIndex++;
    return isCorrect;
  }

  /**
   * Checks if the quiz is finished
   * @returns true if all questions have been answered
   */
  isQuizFinished(): boolean {
    return this.currentIndex >= this.questions.length;
  }

  /**
   * Gets the quiz result
   * @returns Result object with total questions, correct answers, and percentage
   */
  getResult(): Result {
    const total = this.questions.length;
    return {
      totalQuestions: total,
      correctAnswers: this.score,
      percentage: Math.round((this.score / total) * 100),
    };
  }

  /**
   * Gets the current question number (1-based)
   * @returns Current question number
   */
  getCurrentQuestionNumber(): number {
    return this.currentIndex + 1;
  }

  /**
   * Gets the total number of questions
   * @returns Total questions count
   */
  getTotalQuestions(): number {
    return this.questions.length;
  }
}

