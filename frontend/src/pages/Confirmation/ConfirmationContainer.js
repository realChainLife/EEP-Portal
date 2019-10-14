import _isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toJS } from "../../helper";
import { fetchProjectPermissions } from "../Overview/actions";
import { fetchSubProjectPermissions } from "../SubProjects/actions";
import { fetchWorkflowItemPermissions } from "../Workflows/actions";
import { cancelConfirmation, confirmConfirmation, executeConfirmedActions } from "./actions";
import ConfirmationDialog from "./ConfirmationDialog";

class ConfirmationContainer extends Component {
  componentDidUpdate() {
    if (_isEmpty(this.props.permissions.project)) this.fetchPermissions(this.props.intentToConfirm);
  }

  fetchPermissions(intentToConfirm) {
    const { payload } = this.props;
    switch (intentToConfirm.split(".")[0]) {
      case "project":
        this.props.fetchProjectPermissions(payload.project.id);
        break;
      case "subproject":
        this.props.fetchProjectPermissions(payload.project.id);
        this.props.fetchSubprojectPermissions(payload.project.id, payload.subproject.id);
        break;
      case "workflowitem":
        this.props.fetchProjectPermissions(payload.project.id);
        this.props.fetchSubprojectPermissions(payload.project.id, payload.subproject.id);
        this.props.fetchWorkflowitemPermissions(payload.project.id, payload.subproject.id, payload.workflowitem.id);
        break;
      default:
        break;
    }
  }

  render() {
    if (this.props.confirmationDialogOpen) {
      return (
        <ConfirmationDialog
          open={this.props.confirmationDialogOpen}
          intent={this.props.intentToConfirm}
          onConfirm={this.props.confirmConfirmation}
          onCancel={this.props.cancelConfirmation}
          executeConfirmedActions={this.props.executeConfirmedActions}
          payload={this.props.payload}
          permissions={this.props.permissions}
          confirmingUser={this.props.confirmingUser}
          isFetchingPermissions={this.props.isFetchingPermissions}
        />
      );
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProjectPermissions: pId => dispatch(fetchProjectPermissions(pId, true)),
    fetchSubprojectPermissions: (pId, sId) => dispatch(fetchSubProjectPermissions(pId, sId, true)),
    fetchWorkflowItemPermissions: (pId, spId, wId) => dispatch(fetchWorkflowItemPermissions(pId, spId, wId, true)),
    confirmConfirmation: () => dispatch(confirmConfirmation(true)),
    cancelConfirmation: () => dispatch(cancelConfirmation(false)),
    executeConfirmedActions: (actions, pId, subId) => dispatch(executeConfirmedActions(actions, pId, subId, true))
  };
};

const mapStateToProps = state => {
  return {
    confirmationDialogOpen: state.getIn(["confirmation", "open"]),
    intentToConfirm: state.getIn(["confirmation", "intent"]),
    confirmDisabled: state.getIn(["confirmation", "disabled"]),
    payload: state.getIn(["confirmation", "payload"]),
    permissions: state.getIn(["confirmation", "permissions"]),
    confirmingUser: state.getIn(["login", "id"]),
    isFetchingPermissions: state.getIn(["confirmation", "isFetchingPermissions"])
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ConfirmationContainer));
