import { ChallengeCategory } from "../types";

export function parseCategoryToDuration(category: ChallengeCategory) {
  return parseInt(category.replace("s", ""), 10);
}
