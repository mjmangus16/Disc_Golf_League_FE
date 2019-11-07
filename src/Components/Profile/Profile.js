import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBreadcrumb } from "../../Redux/actions/breadcrumbActions";
import { logoutUser } from "../../Redux/actions/authActions";
import {
  getProfile,
  updateProfile,
  clearErrors,
  logout
} from "../../Redux/actions/profileActions";

import ProfileHeader from "./ProfileHeader";
import UpdateDialog from "./UpdateDialog";
import ProfileLeagues from "./ProfileLeagues";

import { CircularProgress } from "@material-ui/core";

import useStyles from "./ProfileStyles";

const Profile = ({
  email,
  breadcrumbs,
  history,
  get_loading,
  getProfile,
  updateProfile,
  f_name,
  l_name,
  org_name,
  user_id,
  errors,
  clearErrors,
  update_success,
  logoutUser
}) => {
  const classes = useStyles();
  const [updateOpen, setUpdateOpen] = useState(true);

  useEffect(() => {
    if (email) {
      getProfile(email);
    }
  }, [email]);

  const handleUpdateOpen = () => {
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    clearErrors();
  };

  const handleUpdate = userData => {
    updateProfile(user_id, userData, setUpdateOpen);
  };

  return (
    <div>
      {get_loading ? (
        <CircularProgress size={80} className={classes.buttonProgress} />
      ) : (
        <div>
          <UpdateDialog
            open={updateOpen}
            handleClose={handleUpdateClose}
            handleUpdate={handleUpdate}
            errors={errors}
            logout={logoutUser}
            user={{
              email,
              f_name,
              l_name,
              org_name,
              user_id
            }}
          />
          <ProfileHeader
            org_name={org_name}
            f_name={f_name}
            handleOpen={handleUpdateOpen}
            get_loading={get_loading}
            success={update_success}
          />
          <ProfileLeagues />
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
  update_success: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  breadcrumbs: state.breadcrumbs.breadcrumbs,
  errors: state.profile.errors,
  email: state.auth.email,
  f_name: state.profile.f_name,
  l_name: state.profile.l_name,
  user_id: state.profile.user_id,
  org_name: state.profile.org_name,
  get_loading: state.profile.get_loading,
  update_success: state.profile.update_success
});

export default connect(
  mapStateToProps,
  { getProfile, updateProfile, clearErrors, logoutUser }
)(Profile);