import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import * as styles from "./QuestionForm.module.scss";
import {
  changeQuestion,
  createQuestion,
  getQuestionById,
} from "@/services/questionsApi";
import { Box, Button, TextField } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import clsx from "clsx";

type QuestionFormProps = {
  type: "create" | "edit";
};

const QuestionForm: React.FC<QuestionFormProps> = ({ type }) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (type === "edit") {
      setIsLoading(true);
      getQuestionById(id)
        .then((data) => {
          setCode(data.attachedCode);
          setTitle(data.title);
          setDescription(data.description);
          if (data.user.id !== user?.id) {
            navigate("/home");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const resetMessages = () => {
    if (error ) setError("");
    if (success) setSuccess(false);
  };

  const resetForm = () => {
    setCode("");
    setTitle("");
    setDescription("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (type === "create") {
      createQuestion({ title, description, attachedCode: code })
        .then(() => {
          resetForm();
          setSuccess(true);
        })
        .catch((err) => {
          setError(err.response.data.errors[0].failures[0]);
        });
    } else {
      changeQuestion(id, { title, description, attachedCode: code })
        .then(() => {
          setSuccess(true);
        })
        .catch((err) => {
          setError(err.response.data.errors[0].failures[0]);
        });
    }
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    resetMessages();
  };

  const handleDescriptionInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
    resetMessages();
  };

  const handleCodeInput = (value: string) => {
    setCode(value);
    resetMessages();
  };

  if (!user) return <Navigate to="/login" />;

  return isLoading ? (
    <p className={styles["question-from__loading"]}>Loading...</p>
  ) : (
    <div className={styles["question-from"]}>
      {type === "create" ? <h2>Ask a question</h2> : <h2>Question editing</h2>}
      <Box
        className={styles["question-from__form-container"]}
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          multiline
          variant="outlined"
          label="Title"
          fullWidth
          value={title}
          onChange={handleTitleInput}
          error={Boolean(error)}
        />
        <TextField
          multiline
          rows={4}
          variant="outlined"
          label="Description"
          fullWidth
          value={description}
          onChange={handleDescriptionInput}
          error={Boolean(error)}
        />
        <CodeMirror
          height="250px"
          value={code}
          onChange={handleCodeInput}
          className={clsx(styles["question-from__code"], error && styles["question-from__code--error"])}
        />
        {success && (
          <p className={styles["question-from__success-message"]}>
            Question successfully {type === "create" ? "created!" : "edited!"}
          </p>
        )}
        {error && (
          <p className={styles["question-from__error-message"]}>{error}</p>
        )}
        <Button
          size="large"
          sx={{
            fontSize: "18px",
          }}
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          {type === "create" ? "Ask a question" : "Edit the question"}
        </Button>
      </Box>
    </div>
  );
};

export default QuestionForm;
