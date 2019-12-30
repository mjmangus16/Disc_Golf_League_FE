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

  createLeagueContainer: {
    maxWidth: 800,
    width: "90%",
    margin: "auto auto 25px auto"
  },
  createLeagueInfo: {
    margin: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem"
    }
  },
  updateScheduleContainer: {
    maxWidth: 800,
    margin: "auto auto 75px auto"
  },
  memberOptions: {
    flexGrow: 4
  },
  createRoundContainer: {
    width: "auto",
    maxWidth: 800,
    margin: "auto"
  },
  formTextInput: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  formTextInputScore: {
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  formTextLabel: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  formTextInputScore2: {
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem"
    }
  },
  createRoundName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem"
    }
  },
  formTextLabel2: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem"
    }
  },
  tableTypoH: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  tableTypo: {
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
  },
  memberNameHeading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem"
    }
  },
  missingData: {
    marginTop: 25,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  leagueNameHeading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.15rem"
    }
  },
  roundInfo: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  roundMemberName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  memberSelectItems: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  memberInputLabel: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  }
}));

export default useStyles;
