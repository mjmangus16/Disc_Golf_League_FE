import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "25%",
    left: "50%",
    marginTop: -14,
    marginLeft: -40
  },
  header: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr"
  },
  title: {
    gridColumn: 2
  },
  updateButton: {
    width: 200,
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
  }
}));

export default useStyles;
