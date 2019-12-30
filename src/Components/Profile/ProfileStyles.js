import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  title: {
    gridColumn: 2,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.15rem"
    }
  },
  updateButton: {
    justifySelf: "end",
    marginRight: 20
  },
  profileLeaguesContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "75%",
    margin: "7% auto auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "25px auto auto"
    }
  },
  updateHeading: {
    flexGrow: 4
  },
  deleteButton: {
    flexGrow: 1
  },
  headingContainer: {
    textDecoration: "underline"
  },
  headerContainer: {
    padding: theme.spacing(2)
  },
  gridContainer: {
    flexGrow: 1,
    marginTop: 10
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer"
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -14,
    marginLeft: -16
  },
  noLeagues: {
    paddingTop: 25
  },
  tableTypoH: {
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  tableTypo: {
    fontSize: "0.9rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.65rem"
    }
  },
  tableRow: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "WhiteSmoke",
      boxShadow: "2px 2px 8px gray"
    }
  }
}));

export default useStyles;
