import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const UpdateSchedule = ({ schedule, match }) => {
  console.log(schedule);
  console.log(match);
  return <div>CREATE SCHEDULE</div>;
};

UpdateSchedule.propTypes = {};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  schedule: state.leagues.selectedLeague.schedule
});

export default connect(mapStateToProps, {})(UpdateSchedule);
