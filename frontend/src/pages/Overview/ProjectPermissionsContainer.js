import React, { Component } from "react";
import { connect } from "react-redux";

import PermissionDialog from "../Common/Permissions/PermissionDialog";
import withInitialLoading from "../Loading/withInitialLoading";
import { toJS } from "../../helper";
import { fetchUser } from "../Login/actions";

import _isEmpty from "lodash/isEmpty";
import { projectIntentOrder } from "../../permissions";
import strings from "../../localizeStrings";
import {
  hideProjectPermissions,
  fetchProjectPermissions,
  grantPermission,
  revokePermission,
  addTemporaryPermission,
  removeTemporaryPermission
} from "./actions";
import { showConfirmationDialog } from "../Confirmation/actions";

class ProjectPermissionsContainer extends Component {
  componentWillMount() {
    this.props.fetchUser(true);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.permissionDialogShown && nextProps.permissionDialogShown) {
      const projectId = nextProps.projectId;
      this.props.fetchProjectPermissions(projectId, true);
    }
  }

  isEnabled(allowedIntents) {
    const necessaryIntents = ["project.intent.grantPermission", "project.intent.revokePermission"];
    return necessaryIntents.some(i => allowedIntents.includes(i));
  }

  getAllowedIntents = () => {
    const { projects, projectId } = this.props;
    if (projects && !_isEmpty(projectId)) {
      const { allowedIntents } = projects.find(project => project.data.id === projectId);
      return allowedIntents;
    }
    return [];
  };

  render() {
    const allowedIntents = this.getAllowedIntents();

    return (
      <PermissionDialog
        {...this.props}
        title={strings.project.project_permissions_title}
        intentOrder={projectIntentOrder}
        disabled={!this.isEnabled(allowedIntents)}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    permissions: state.getIn(["overview", "permissions", "project"]),
    temporaryPermissions: state.getIn(["overview", "temporaryPermissions"]),
    user: state.getIn(["login", "user"]),
    permissionDialogShown: state.getIn(["overview", "permissionDialogShown"]),
    myself: state.getIn(["login", "id"]),
    projectId: state.getIn(["overview", "idForPermissions"]),
    projectDisplayName: state.getIn(["overview", "displayNameForPermissions"])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hidePermissionDialog: () => dispatch(hideProjectPermissions()),
    grant: (projectId, permission, identity) => dispatch(grantPermission(projectId, permission, identity, true)),
    revoke: (projectId, permission, identity) => dispatch(revokePermission(projectId, permission, identity, true)),
    fetchProjectPermissions: (projectId, showLoading) => dispatch(fetchProjectPermissions(projectId, showLoading)),
    fetchUser: showLoading => dispatch(fetchUser(showLoading)),
    addTemporaryPermission: (permission, userId) => dispatch(addTemporaryPermission(permission, userId)),
    removeTemporaryPermission: (permission, userId) => dispatch(removeTemporaryPermission(permission, userId)),
    showConfirmationDialog: (intent, payload) => dispatch(showConfirmationDialog(intent, payload)),
    grantProjectPermission: (pId, permission, identity) => dispatch(grantPermission(pId, permission, identity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withInitialLoading(toJS(ProjectPermissionsContainer)));
