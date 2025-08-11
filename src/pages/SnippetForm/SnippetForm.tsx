import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate, useParams } from "react-router-dom";
import * as styles from "./SnippetForm.module.scss";
import {
  changeSnippet,
  createSnippet,
  getSnippetById,
} from "@/services/snippetsApi";
import {
  Select,
  Box,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";

type SnippetFormProps = {
  code?: string;
  language?: string;
  type: "create" | "edit";
};

const languageExtensions: Record<string, any> = {
  JavaScript: javascript({ jsx: true }),
  Python: python(),
  Java: java(),
  "C/C++": cpp(),
  Go: go(),
  Ruby: java(),
};

const SnippetForm: React.FC<SnippetFormProps> = ({ type }) => {
  const [language, setLanguage] = useState<string>("JavaScript");
  const [code, setCode] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (type === "edit") {
      setIsLoading(true);
      getSnippetById(id)
        .then((data) => {
          setCode(data.code);
          setLanguage(data.language);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (type === "create") {
      createSnippet({ code, language })
        .then(() => {
          setSuccess(true);
        })
        .catch((err) => {
          setError(err.response.data.errors[0].failures[0]);
        });
    } else {
      changeSnippet(id, { code, language })
        .then(() => {
          setSuccess(true);
        })
        .catch((err) => {
          setError(err.response.data.errors[0].failures[0]);
        });
    }
  };

  const handleLanguage = (event: SelectChangeEvent): void => {
    setLanguage(event.target.value);
  };

  const handleCodeInput = (value: string) => {
    setCode(value);
    setError("");
    setSuccess(false);
  };

  if (!user) return <Navigate to="/login" />;

  return isLoading ? (
    <p className={styles["post-snippet__loading"]}>Loading...</p>
  ) : (
    <div className={styles["post-snippet"]}>
      {type === "create" ? (
        <h2>Create new snippet</h2>
      ) : (
        <h2>Snippet editing</h2>
      )}
      <Box
        className={styles["post-snippet__form-container"]}
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-standard-label">
            Language
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={language}
            onChange={handleLanguage}
            label="Language"
            size="medium"
            sx={{
              fontSize: "18px",
            }}
          >
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="C/C++">C/C++</MenuItem>
            <MenuItem value="Go">Go</MenuItem>
            <MenuItem value="Ruby">Ruby</MenuItem>
          </Select>
        </FormControl>
        <CodeMirror
          height="250px"
          value={code}
          onChange={handleCodeInput}
          extensions={[languageExtensions[language]]}
          className={styles["post-snippet__code"]}
        />
        {success && (
          <p className={styles["post-snippet__success-message"]}>
            Snippet successfully {type === "create" ? "created!" : "edited!"}
          </p>
        )}
        {error && (
          <p className={styles["post-snippet__error-message"]}>{error}</p>
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
          {type === "create" ? "Create snippet" : "Edit snippet"}
        </Button>
      </Box>
    </div>
  );
};

export default SnippetForm;
