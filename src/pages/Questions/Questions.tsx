import React, { useState } from "react";
import * as styles from "./Questions.module.scss";
import { getQuestionsByPage } from "@/services/questionsApi";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import QuestionType from "@/types/Question";
import Question from "@/components/ui/Question";

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const { isLoading, error, sentinelRef } = useInfiniteScroll<QuestionType>(
    async (page) => {
      const newQuestions = await getQuestionsByPage(page);
      setQuestions((prev) => [...prev, ...newQuestions]);
      return newQuestions;
    },
    {
      threshold: 0.1,
      rootMargin: "400px",
    }
  );

  return (
    <div className={styles["questions"]}>
      {questions.length !== 0 &&
        questions.map((question) => {
          return <Question key={question.id} {...question} />;
        })}
      <div ref={sentinelRef} />
      {isLoading && <p className={styles["questions__loading"]}>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Questions;
