export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: Difficulty;
}

