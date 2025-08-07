import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthProvider from "./context/AuthContext";
import Login from "@/pages/Login";
import Registration from "@/pages/Registration";
import Home from "@/pages/Home";

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
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
