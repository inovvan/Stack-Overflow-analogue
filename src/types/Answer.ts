import User from "@/types/User";
import Question from "./Question";

type Answer = {
  id: string;
  content: string;
  isCorrect: boolean;
  user?: User;
};

export default Answer;