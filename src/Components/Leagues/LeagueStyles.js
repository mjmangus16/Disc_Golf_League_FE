import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer"
  },
  loadingCircle: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "25%",
    left: "50%",
    marginTop: -25,
    marginLeft: -25
  }
}));

export default useStyles;
