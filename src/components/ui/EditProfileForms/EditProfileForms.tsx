import React, { useContext, useState, useEffect } from "react";
import * as styles from "./EditProfileForms.module.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import { usernameEdit, passwordEdit } from "@/services/userApi";
import UserStatistic from "@/types/UserStatistic";

type EditProfileFormsProps = {
  setUser: React.Dispatch<React.SetStateAction<UserStatistic>>;
};

const EditProfileForms: React.FC<EditProfileFormsProps> = ({setUser}) => {
  const [newUsername, setNewUsername] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>("");
  const [errorUsernameEdit, setErrorUsernameEdit] = useState<string>("");
  const [errorPasswordEdit, setErrorPasswordEdit] = useState<string>("");
  const [successUsernameEdit, setSuccessUsernameEdit] = useState<string>("");
  const [successPasswordEdit, setSuccessPasswordEdit] = useState<string>("");

  const resetUsernameMessages = () => {
    if (errorUsernameEdit) setErrorUsernameEdit("");
    if (successUsernameEdit) setSuccessUsernameEdit("");
  };

  const resetPaswordMessages = () => {
    if (errorPasswordEdit) setErrorPasswordEdit("");
    if (successPasswordEdit) setSuccessPasswordEdit("");
  };

  const handleNewUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
    resetUsernameMessages();
  };

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
    resetPaswordMessages();
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    resetPaswordMessages();
  };

  const handleNewPasswordRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPasswordRepeat(e.target.value);
    resetPaswordMessages();
  };

  const handleSubmitUsernameEdit = (e: React.FormEvent) => {
    e.preventDefault();

    usernameEdit(newUsername)
      .then((data) => {
        setUser((prev) => ({ ...prev, username: data.data.username }));
        setNewUsername("");
        console.log("setNewUsername");
        setSuccessUsernameEdit(data.message);
        console.log("success");
      })
      .catch((err) => {
        setErrorUsernameEdit(err.response.data.errors[0].failures[0]);
      });
  };

  const handleSubmitPasswordEdit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== newPasswordRepeat) {
      setErrorPasswordEdit("New password and password confirm do not match!");
    } else {
      passwordEdit(oldPassword, newPassword)
        .then((data) => {
          setOldPassword("");
          setNewPassword("");
          setNewPasswordRepeat("");
          setSuccessPasswordEdit(data.message);
        })
        .catch((err) => {
          console.log(err);
          setErrorPasswordEdit(err.response.data.errors[0].failures[0]);
        });
    }
  };

  return (
    <div className={styles["edit-profile-forms"]}>
      <p className={styles["edit-profile-forms__title"]}>Edit your profile</p>
      <div className={styles["edit-profile-forms__container"]}>
        <Box
          className={styles["edit-profile-forms__form-wrapper"]}
          component="form"
          onSubmit={handleSubmitUsernameEdit}
          noValidate
        >
          <h5>Change your username:</h5>
          <TextField
            required
            fullWidth
            label="New username"
            value={newUsername}
            onChange={handleNewUsername}
            error={Boolean(errorUsernameEdit)}
          />
          {errorUsernameEdit && (
            <Typography color="error" align="center">
              {errorUsernameEdit}
            </Typography>
          )}
          {successUsernameEdit && (
            <Typography color="success" align="center">
              {successUsernameEdit}
            </Typography>
          )}
          <Button color="success" type="submit" fullWidth variant="contained">
            SAVE
          </Button>
        </Box>
        <Box
          className={styles["edit-profile-forms__form-wrapper"]}
          component="form"
          onSubmit={handleSubmitPasswordEdit}
          noValidate
        >
          <h5>Change your password:</h5>
          <TextField
            required
            fullWidth
            label="Old password"
            type="password"
            value={oldPassword}
            onChange={handleOldPassword}
            error={Boolean(errorPasswordEdit)}
          />
          <TextField
            required
            fullWidth
            label="New password"
            type="password"
            value={newPassword}
            onChange={handleNewPassword}
            error={Boolean(errorPasswordEdit)}
          />
          <TextField
            required
            fullWidth
            label="Confirm password"
            type="password"
            value={newPasswordRepeat}
            onChange={handleNewPasswordRepeat}
            error={Boolean(errorPasswordEdit)}
          />

          {errorPasswordEdit && (
            <Typography color="error" align="center">
              {errorPasswordEdit}
            </Typography>
          )}
          {successPasswordEdit && (
            <Typography color="success" align="center">
              {successPasswordEdit}
            </Typography>
          )}
          <Button color="success" type="submit" fullWidth variant="contained">
            CHANGE PASSWORD
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default EditProfileForms;
