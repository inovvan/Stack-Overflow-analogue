import { Snackbar, Alert } from "@mui/material";
import { createContext, useState, ReactNode } from "react";

type SnackbarContextType = {
    handleSnackbarOpen: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSnackbarOpen = () => {
    setIsOpen(true);
  };

  const handleSnackbarClose = () => {
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ handleSnackbarOpen }}>
      {children}
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%", fontSize: "16px" }}
        >
          {"Something is wrong :("}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
