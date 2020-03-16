import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Breadcrumbs, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap",
    minHeight: 40,
    margin: "auto",
    padding: 15,
    maxWidth: 900
  },
  crumbText: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem"
    }
  },
  paper: {
    padding: theme.spacing(1, 2)
  }
}));

const Breadcrumbs_ = ({ league_id }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary" className={classes.crumbText}>
          <Link color="inherit" to={`/league/${league_id}`}>
            {"Back To League Home"}
          </Link>
        </Typography>
      </Breadcrumbs> */}
    </div>
  );
};

export default Breadcrumbs_;
