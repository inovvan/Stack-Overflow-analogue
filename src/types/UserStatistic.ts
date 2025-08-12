import User from "./User";

type UserStatistic = User & {
  statistic: {
    snippetsCount: string;
    rating: string;
    commentsCount: string;
    likesCount: string;
    dislikesCount: string;
    questionsCount: string;
    correctAnswersCount: string;
    regularAnswersCount: string;
  };
};

export default UserStatistic;