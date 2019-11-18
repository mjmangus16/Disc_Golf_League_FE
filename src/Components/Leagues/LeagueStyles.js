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
    color: theme.palette.secondary.main
  },
  headerContainer: {
    borderTop: "1px solid lightgrey",
    borderBottom: "1px solid lightgrey",
    padding: "10px 0px",
    marginTop: 15
  },
  headerSection: {
    margin: "auto"
  },
  typo: {
    padding: "5px 10px"
  },
  spanStyle: {
    textDecoration: "underline",
    fontWeight: 500,
    paddingRight: 7
  }
}));

export default useStyles;
