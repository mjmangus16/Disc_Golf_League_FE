import { fade, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  link: {
    textDecoration: "none",
    color: "black"
  }
}));
