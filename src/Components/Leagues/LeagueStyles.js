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
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
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
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  formTextInputScore: {
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  formTextLabel: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  formTextInputScore2: {
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  createRoundName: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  formTextLabel2: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  tableTypoH: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  tableTypo: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
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
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.25rem"
    }
  },
  missingData: {
    marginTop: 25,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  leagueNameHeading: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.15rem"
    }
  },
  roundInfo: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  roundMemberName: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  memberSelectItems: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  memberInputLabel: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.75rem"
    }
  },
  standingsPanelButton: {
    [theme.breakpoints.down("xs")]: {
      margin: 5
    }
  },
  standingsPanelTable: {
    [theme.breakpoints.down("xs")]: {
      margin: 5
    }
  }
}));

export default useStyles;
