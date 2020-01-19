import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectBreadcrumb } from "../../Redux/actions/breadcrumbActions";
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

const Breadcrumbs_ = ({ breadcrumbs, selectBreadcrumb }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.length > 1 &&
          breadcrumbs.map((crumb, i) => {
            if (i !== breadcrumbs.length - 1) {
              return (
                <Typography
                  color="textPrimary"
                  key={`${crumb.name}${crumb.url}${i}`}
                  className={classes.crumbText}
                >
                  <Link
                    color="inherit"
                    to={crumb.url}
                    onClick={() => selectBreadcrumb(breadcrumbs, crumb)}
                    key={`${crumb.name}${crumb.url}${i}`}
                  >
                    {crumb.name}
                  </Link>
                </Typography>
              );
            } else {
              return (
                <Typography
                  color="textPrimary"
                  key={`${crumb.name}${crumb.url}${i}`}
                  className={classes.crumbText}
                >
                  {crumb.name}
                </Typography>
              );
            }
          })}
      </Breadcrumbs> */}
    </div>
  );
};

Breadcrumbs_.propTypes = {
  breadcrumbs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs
});

export default connect(mapStateToProps, { selectBreadcrumb })(Breadcrumbs_);
