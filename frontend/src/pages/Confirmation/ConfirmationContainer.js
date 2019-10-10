import React, { Component } from "react";
import { connect } from "react-redux";
import { toJS } from "../../helper";
import ConfirmationDialog from "./ConfirmationDialog";
import { confirmConfirmation, cancelConfirmation, executeConfirmedActions } from "./actions";
import { fetchProjectPermissions } from "../Overview/actions";
import { fetchSubProjectPermissions } from "../SubProjects/actions";
import { fetchWorkflowItemPermissions } from "../Workflows/actions";

class ConfirmationContainer extends Component {
  fetchPermissions(intentToConfirm) {
    const { payload } = this.props;
    switch (intentToConfirm.split()[0]) {
      case "project":
        this.props.fetchProjectPermissions(payload.projectId);
        break;
      case "subproject":
        this.props.fetchProjectPermissions(payload.projectId);
        this.props.fetchSubprojectPermissions(payload.projectId, payload.subprojectId);
        break;
      case "workflowitem":
        this.props.fetchProjectPermissions(payload.projectId);
        this.props.fetchSubprojectPermissions(payload.projectId, payload.subprojectId);
        this.props.fetchWorkflowitemPermissions(payload.projectId, payload.subprojectId, payload.workflowitemId);
        break;
      default:
        break;
    }
  }

  render() {
    if (this.props.confirmationDialogOpen) {
      this.fetchPermissions(this.props.intentToConfirm);
    }
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
      />
    );
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
    confirmingUser: state.getIn(["login", "id"])
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ConfirmationContainer));
