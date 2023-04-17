export type DIFFICULTY = "EASY" | "MEDIUM" | "HARD" | "INHUMAN";

export interface BoardItem {
  value: number;
  isEditable?: boolean;
  isError?: boolean;
  isCorrect?: boolean;
}
