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
  Toolbar
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const ConnectUser = ({
  status,
  close,
  email,
  change,
  deleteMember,
  loading,
  failed,
  success,
  update
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Dialog open={status} onClose={() => close(false)}>
      <Toolbar>
        <DialogTitle style={{ flexGrow: 4 }}>Member Options</DialogTitle>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={deleteMember}
        >
          DELETE MEMBER
        </Button>
      </Toolbar>

      <DialogContent>
        <DialogContentText>
          Here you can delete a member or connect a member to their user
          account. Deleting will remove the member and all their rounds. Enter
          the users email to connect the member.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="email"
          label="User Email"
          fullWidth
          defaultValue={email}
          onChange={e => change(e.target.value)}
        />
        {failed.error && (
          <Typography variant="body2" color="error">
            {failed.error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          variant="contained"
          size="small"
          onClick={update}
          style={{
            backgroundColor: hover ? green[600] : green[400],
            borderColor: green[600],
            minWidth: 200
          }}
        >
          {loading
            ? "Loading..."
            : !success
            ? "Connect To User"
            : "Successfully Connected"}
        </Button>

        <Button onClick={() => close(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConnectUser;
