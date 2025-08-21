import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import AuthProvider from "./context/AuthContext";
import Login from "@/pages/Login";
import Registration from "@/pages/Registration";
import Home from "@/pages/Home";
import Snippet from "@/pages/Snippet";
import UserSnippets from "@/pages/UserSnippets";
import SnippetForm from "@/pages/SnippetForm";
import Profile from "@/pages/Profile";
import Users from "@/pages/Users";
import UserInfo from "@/pages/UserInfo";
import Questions from "@/pages/Questions";
import QuestionForm from "@/pages/QuestionForm";
import Question from "@/pages/Question";
import SnackbarProvider from "@/context/SnackbarContext";
import theme from "./theme";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SnackbarProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/home" element={<Home />} />
                <Route path="/snippet/:id" element={<Snippet />} />
                <Route path="/my-snippets" element={<UserSnippets />} />
                <Route
                  path="/post-snippet"
                  element={<SnippetForm key="create" type="create" />}
                />
                <Route
                  path="/edit-snippet/:id"
                  element={<SnippetForm key="edit" type="edit" />}
                />
                <Route path="/my-profile" element={<Profile />} />
                <Route path="/users" element={<Users />} />
                <Route path="/user-info/:id" element={<UserInfo />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/question/:id" element={<Question />} />
                <Route
                  path="/ask-question"
                  element={<QuestionForm key="create" type="create" />}
                />
                <Route
                  path="/edit-question/:id"
                  element={<QuestionForm key="edit" type="edit" />}
                />
              </Route>
            </Routes>
          </ThemeProvider>
        </SnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
