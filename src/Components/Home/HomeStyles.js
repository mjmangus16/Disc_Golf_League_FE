import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loadingCircle: {
    color: theme.palette.secondary.main
  },
  homeContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gridTemplateRows: "60px auto",
    margin: "auto auto 15px",
    maxWidth: 1200
  },
  stateSelectContainer: {
    gridRow: "2/3",
    gridColumn: 1
  },
  gridContainer: {
    width: "100%",
    margin: "0px auto auto",
    gridColumn: 2,
    gridRow: 2,
    maxHeight: "650px",
    overflow: "scroll",
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
