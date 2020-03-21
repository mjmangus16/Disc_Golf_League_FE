import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Breadcrumbs } from "@material-ui/core";

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

const Breadcrumbs_ = ({ league_id, crumbs }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {crumbs && (
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary" className={classes.crumbText}>
            <Link color="inherit" to={`/league/${league_id}`}>
              Return To League Home Page
            </Link>
          </Typography>
        </Breadcrumbs>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  crumbs: state.breadcrumbs.crumb,
  league_id: state.breadcrumbs.id
});

export default connect(mapStateToProps, {})(Breadcrumbs_);
