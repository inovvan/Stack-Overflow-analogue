import User from "./User";

type Mark = {
    id: string;
    type: 'like' | 'dislike';
    user: User;
}

export default Mark;