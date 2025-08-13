import User from "@/types/User";

type Answer = {
  id: string;
  content: string;
  isCorrect: boolean;
  user?: User;
};

export default Answer;