import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  leagueName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.15rem"
    }
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
    padding: "5px 10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".75rem"
    }
  },
  spanStyle: {
    textDecoration: "underline",
    fontWeight: 500,
    paddingRight: 7
  },
  editLeagueHeaderCont: {
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "auto",
      paddingBottom: 25
    }
  },
  editLeageName: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: 400,
      margin: "auto"
    }
  },
  editLeagueFields: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: 250,
      margin: "auto"
    }
  },
  editLeagueField: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 20
    }
  },
  editLeagueFormControl: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 20
    }
  }
}));

export default useStyles;
