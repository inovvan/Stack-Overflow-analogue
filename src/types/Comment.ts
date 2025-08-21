import User from "./User";

type Comment = {
    id: string;
    content: string;
    user?: User;
}

export default Comment;