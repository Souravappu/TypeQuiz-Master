import { Question, Difficulty } from "../models/Question.js";

/**
 * Type guard to check if a value is a valid Difficulty enum value
 */
export function isDifficulty(value: string): value is Difficulty {
  return Object.values(Difficulty).includes(value as Difficulty);
}

/**
 * Type guard to check if an object is a valid Question
 */
export function isQuestion(obj: unknown): obj is Question {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  const question = obj as Record<string, unknown>;

  return (
    typeof question.id === "number" &&
    typeof question.question === "string" &&
    Array.isArray(question.options) &&
    question.options.every((opt: unknown) => typeof opt === "string") &&
    typeof question.correctAnswer === "string" &&
    isDifficulty(question.difficulty)
  );
}

/**
 * Type guard to check if an array contains valid Question objects
 */
export function isQuestionArray(arr: unknown): arr is Question[] {
  return Array.isArray(arr) && arr.every((item) => isQuestion(item));
}

