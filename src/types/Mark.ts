import User from "./User";

type Mark = {
    id: string;
    type: 'like' | 'dislike' | 'none';
    user: User;
}

export default Mark;