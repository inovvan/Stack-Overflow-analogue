import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthProvider from "./context/AuthContext";
import Login from "@/pages/Login";
import Registration from "@/pages/Registration";
import Home from "@/pages/Home";
import Snippet from "@/pages/Snippet";
import UserSnippets from "@/pages/UserSnippets";
import SnippetForm from "@/pages/SnippetForm";
import Profile from "@/pages/Profile";
import Users from "@/pages/Users";
import UserInfo from "./pages/UserInfo";

declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

const theme = createTheme({
  palette: {
    white: {
      main: "#ffffffff",
      dark: "#b3ddffff",
      contrastText: "#000000ff",
    },
  },
});

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/home" element={<Home />} />
              <Route path="/snippet/:id" element={<Snippet />} />
              <Route path="/my-snippets" element={<UserSnippets />} />
              <Route path="/post-snippet" element={<SnippetForm key="create" type="create" />} />
              <Route path="/edit-snippet/:id" element={<SnippetForm key="edit" type="edit" />} />
              <Route path="/my-profile" element={<Profile />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user-info/:id" element={<UserInfo /> } />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
