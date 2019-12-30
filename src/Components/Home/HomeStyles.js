import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loadingCircle: {
    color: theme.palette.secondary.main
  },
  gridContainer: {
    width: "75%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  pageHeading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.15rem",
      marginBottom: 15
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer"
  },
  heading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem"
    }
  },
  headers: {
    fontWeight: 600,
    textDecoration: "underline",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.65rem",
      fontWeight: 500
    }
  },
  columnData: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.65rem"
    }
  }
}));

export default useStyles;
