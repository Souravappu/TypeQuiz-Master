import { Question } from "../models/Question.js";
import { isQuestionArray } from "../utils/typeGuards.js";

/**
 * Fetches questions from the local JSON file
 * @returns Promise resolving to an array of Question objects
 * @throws Error if fetch fails or data is invalid
 */
export async function fetchQuestions(): Promise<Question[]> {
  try {
    const response = await fetch("/src/data/questions.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();

    // Type guard ensures valid structure
    if (!isQuestionArray(data)) {
      throw new Error("Invalid data format: questions array is malformed");
    }

    if (data.length === 0) {
      throw new Error("No questions available");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred while fetching questions");
  }
}

