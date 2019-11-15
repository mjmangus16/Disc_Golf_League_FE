import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  title: {
    gridColumn: 2
  },
  updateButton: {
    justifySelf: "end",
    marginRight: 20
  },
  profileLeaguesContainer: {
    marginTop: "7%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "75%",
    margin: "auto"
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
  }
}));

export default useStyles;
