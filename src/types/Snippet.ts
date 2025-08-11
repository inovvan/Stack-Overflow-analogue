import User from "./User";
import Mark from "./Mark";
import Comment from "./Comment";

type Snippet = {
  id: string;
  code: string;
  language: string;
  marks?: Mark[];
  user?: User;
  comments?: Comment[];
}

export default Snippet;