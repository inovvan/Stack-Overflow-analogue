import { useEffect, useState, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import * as styles from "./Question.module.scss";
import QuestionType from "@/types/Question";
import {
  getQuestionById,
  addAnswer,
  answerSetState,
} from "@/services/questionsApi";
import { TextField } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import IconButton from "@mui/material/IconButton";
import CodeMirror from "@uiw/react-codemirror";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import { FormControlLabel, Checkbox } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";
import { SnackbarContext } from "@/context/SnackbarContext";

const Question: React.FC = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<QuestionType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user: userAuth } = useContext(AuthContext);
  const { handleSnackbarOpen } = useContext(SnackbarContext);

  useEffect(() => {
    getQuestionById(id)
      .then((data: QuestionType) => {
        setQuestion(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching snippet:", err);
      });
  }, []);

  const handleAnswerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
    setError("");
  };

  const handleCheckboxChange =
    (answerId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const state = event.target.checked ? "correct" : "incorrect";

      answerSetState(answerId, state)
        .then(() => {
          setQuestion({
            ...question,
            isResolved: !event.target.checked,
            answers: question.answers.map((answer) => ({
              ...answer,
              isCorrect: answer.id === answerId && state === "correct",
            })),
          });
        })
        .catch((err) => {
          console.error(err);
          handleSnackbarOpen();
        });
    };

  const handleSendAnswer = () => {
    addAnswer(answer, question.id)
      .then((answer) => {
        setQuestion({ ...question, answers: [...question.answers, answer] });
        setAnswer("");
      })
      .catch((err) => {
        setError(err.response.data.errors[0].failures[0]);
      });
  };

  return (
    <div className={styles["question"]}>
      {isLoading ? (
        <p className={styles["question__loading"]}>Loading...</p>
      ) : (
        <div>
          <div className={styles["question__block"]}>
            <div className={styles["question__block-header"]}>
              <div className={styles["question__info-wrapper--row"]}>
                <HelpOutlineIcon
                  color={question.isResolved ? "success" : "warning"}
                />
                <div className={styles["question__info-wrapper--left-column"]}>
                  <h3>{question.title}</h3>
                  <p>Asked by user: {question.user.username}</p>
                </div>
              </div>
              <div className={styles["question__info-wrapper--right-column"]}>
                <p className={styles["question__info-status"]}>
                  {question.isResolved ? "Resolved" : "Unresolved"}
                </p>
                {userAuth?.id === question.user.id && (
                  <NavLink to={`/edit-question/${id}`}>
                    <IconButton color="inherit">
                      <EditDocumentIcon />
                    </IconButton>
                  </NavLink>
                )}
              </div>
            </div>
            <p>{question.description}</p>
            <CodeMirror
              height="250px"
              editable={false}
              value={question.attachedCode}
            />
          </div>
          <ul>
            {question.answers.map((answer) => (
              <li
                key={answer.id}
                className={styles["question__answer-container"]}
              >
                <span className={styles["question__answer-text"]}>
                  {answer.content}
                </span>
                <div className={styles["question__answer-author"]}>
                  <p>By {answer.user.username}</p>
                  {question.user.id === userAuth?.id ? (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleCheckboxChange(answer.id)}
                          checked={answer.isCorrect}
                          size="large"
                          color="success"
                        />
                      }
                      label="Solution"
                    />
                  ) : (
                    answer.isCorrect && (
                      <p className={styles["question__text--solution"]}>
                        Solution
                      </p>
                    )
                  )}
                </div>
              </li>
            ))}
          </ul>
          {userAuth && (
            <div className={styles["question__add-answer-container"]}>
              <TextField
                multiline
                rows={4}
                variant="filled"
                label="Add an answer"
                fullWidth
                value={answer}
                onChange={handleAnswerInput}
                error={Boolean(error)}
                helperText={error}
              />
              <IconButton onClick={handleSendAnswer} color="success">
                <MessageIcon fontSize="large" />
              </IconButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
