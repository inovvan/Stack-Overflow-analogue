import User from "./User";
import Answer from "./Answer";

type Question = {
  id: string;
  title: string;
  description: string;
  attachedCode: string;
  answers?: Answer[];
  user?: User;
  isResolved?: boolean;
};

export default Question;
