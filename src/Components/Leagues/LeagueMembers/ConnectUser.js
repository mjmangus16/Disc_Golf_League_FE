import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Toolbar,
  IconButton
} from "@material-ui/core";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { green, red } from "@material-ui/core/colors";

const ConnectUser = ({
  status,
  close,
  email,
  change,
  deleteMember,
  loading,
  failed,
  success,
  update,
  width
}) => {
  const [hover, setHover] = useState(false);

  const displayDelete = () => {
    if (isWidthDown("sm", width)) {
      return (
        <IconButton
          color="secondary"
          onClick={deleteMember}
          style={{ color: red[500] }}
        >
          <DeleteIcon />
        </IconButton>
      );
    } else {
      return (
        <Button
          variant="outlined"
          size="small"
          onClick={deleteMember}
          style={{ color: red[500] }}
        >
          DELETE MEMBER
        </Button>
      );
    }
  };

  return (
    <Dialog open={status} onClose={() => close(false)}>
      <Toolbar>
        <DialogTitle style={{ flexGrow: 4 }}>Member Options</DialogTitle>
        {displayDelete()}
      </Toolbar>

      <DialogContent>
        <DialogContentText>
          Here you can delete a member or connect a member to their user
          account. Deleting will remove the member and all their rounds. Enter
          the users email to connect the member.
        </DialogContentText>
        <TextField
          error={failed.email || failed.error ? true : false}
          helperText={
            failed.email ? failed.email : failed.error && failed.error
          }
          autoFocus
          margin="dense"
          name="email"
          label="User Email"
          fullWidth
          defaultValue={email}
          onChange={e => change(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" size="small" onClick={() => close(false)}>
          Cancel
        </Button>
        <Button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          variant="contained"
          size="small"
          onClick={update}
          style={{
            backgroundColor: hover ? green[600] : green[400],
            borderColor: green[600]
          }}
        >
          {loading
            ? "Loading..."
            : !success
            ? "Connect To User"
            : "Successfully Connected"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withWidth()(ConnectUser);
