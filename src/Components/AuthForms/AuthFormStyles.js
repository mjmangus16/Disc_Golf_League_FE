import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    textDecoration: "none",
    color: "grey",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  errorText: {
    color: theme.palette.secondary.main,
    marginTop: 15
  },
  buttonProgress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -14,
    marginLeft: -16.5
  },
  loading_error_wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    minHeight: 24
  }
}));

export default useStyles;
