import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
  Toolbar
} from "@material-ui/core";
import useStyles from "./ProfileStyles";

const UpdateDialog = ({
  open,
  handleClose,
  handleUpdate,
  user,
  errors,
  logout,
  admin
}) => {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    org_name: "",
    f_name: "",
    l_name: ""
  });
  const [activateDelete, setActivateDelete] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState(false);

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

  const handleCancel = () => {
    setActivateDelete(false);
    setConfirmEmailError(false);
  };

  const handleDelete = () => {
    if (user.email === confirmEmail) {
      const result = window.confirm(
        "Are you sure you want to delete your account? This can not be reversed."
      );
      if (result) {
        logout();
        axiosWithAuth()
          .delete(`/api/users/delete/${user.user_id}`)
          .then(res => {
            window.alert(res.data.message);
          });
      }
    } else {
      setConfirmEmailError(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      {!activateDelete ? (
        <>
          <Toolbar>
            <DialogTitle
              id="form-dialog-title"
              className={classes.updateHeading}
            >
              Update Profile
            </DialogTitle>
            <Button onClick={() => setActivateDelete(true)}>
              DELETE ACCOUNT
            </Button>
          </Toolbar>
          <DialogContent>
            <DialogContentText>
              To update your profile, edit the text fields and then click the
              submit button.
            </DialogContentText>
            {admin && (
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
            )}

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
        </>
      ) : (
        <div>
          <DialogContent>
            <DialogContentText>
              Confirm that you want to delete your account by entering your
              email address below. Keep in mind, if you are the sole owner of
              any active leagues, you will not be able to delete your account.
              Please transfer ownership and try again.
            </DialogContentText>
            <TextField
              error={true}
              helperText={
                confirmEmailError && "That is not the correct email address"
              }
              autoFocus
              margin="dense"
              id="confirm_email"
              name="confirm_email"
              label="Email Address"
              fullWidth
              onChange={e => setConfirmEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
};

export default UpdateDialog;
