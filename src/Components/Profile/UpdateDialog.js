import React, { useState, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography
} from "@material-ui/core";

const UpdateDialog = ({ open, handleClose, handleUpdate, user, errors }) => {
  const [userData, setUserData] = useState({
    org_name: "",
    f_name: "",
    l_name: ""
  });

  useEffect(() => {
    setUserData({
      org_name: user.org_name,
      f_name: user.f_name,
      l_name: user.l_name
    });
  }, [user.org_name, user.f_name, user.l_name]);

  const onChangeHandler = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To update your profile, edit the text fields and then click the submit
          button.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="org_name"
          name="org_name"
          label="Organization Name"
          fullWidth
          defaultValue={userData.org_name}
          onChange={e => onChangeHandler(e)}
        />
        <TextField
          error={errors.f_name ? true : false}
          helperText={errors.f_name && errors.f_name}
          autoFocus
          margin="dense"
          id="f_name"
          name="f_name"
          label="First Name"
          fullWidth
          defaultValue={userData.f_name}
          onChange={e => onChangeHandler(e)}
        />
        <TextField
          error={errors.l_name ? true : false}
          helperText={errors.l_name && errors.l_name}
          autoFocus
          margin="dense"
          id="l_name"
          name="l_name"
          label="Last Name"
          fullWidth
          defaultValue={userData.l_name}
          onChange={e => onChangeHandler(e)}
        />
      </DialogContent>
      {errors.update && (
        <Typography variant="body2" color="error" align="center">
          {errors.update}
        </Typography>
      )}

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleUpdate(userData)} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
