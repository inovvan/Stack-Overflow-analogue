import * as styles from "./app.module.scss";
import react from 'react';
import {
  TextField,
  Button,
  Switch,
  MenuItem,
  Select,
  Checkbox,
  Modal,
} from "novvenny-custom-components-lib";
import { useState } from "react";

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h1 className={styles.mainStyle}>Welcome to My App</h1>
      <p>This is a simple React application.</p>
      <div>
        <TextField id="name" labelText="Name" variant="outlined" error={true} />
        <Button size="large" variant="contained">
          QWESAD
        </Button>
        <Switch name="qwe" value="qwe" />
        <Select id="1" variant="filled" labelText="qweda">
          <MenuItem value="1">One</MenuItem>
          <MenuItem value="2">Two</MenuItem>
          <MenuItem value="3">Three</MenuItem>
        </Select>
        <Checkbox name="check" value="check" labelText="qwe" checked />
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h1>Welcome to the Custom Components Library</h1>
          <p>This is a simple modal example.</p>
        </Modal>
      </div>
    </div>
  );
};
