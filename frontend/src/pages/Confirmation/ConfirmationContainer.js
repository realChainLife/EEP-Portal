import _isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toJS } from "../../helper";
import { fetchProjectPermissions, grantPermission } from "../Overview/actions";
import { assignProject, fetchSubProjectPermissions } from "../SubProjects/actions";
import { assignSubproject, assignWorkflowItem, fetchWorkflowItemPermissions } from "../Workflows/actions";
import { addActions, cancelConfirmation, confirmConfirmation, executeConfirmedActions } from "./actions";
import ConfirmationDialog from "./ConfirmationDialog";
import { executeOriginalActions } from "./SideEffectActions";

class ConfirmationContainer extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.confirmed !== prevProps.confirmed && this.props.confirmed === true) {
      executeOriginalActions(
        prevProps.originalActions,
        this.props.project,
        this.props.subproject,
        this.props.assignProject,
        this.props.assignSubproject,
        this.props.assignWorkflowitem,
        this.props.grantProjectPermission,
        this.props.grantSubprojectPermission,
        this.props.grantWorkflowitemPermission
      );
    }
  }

  fetchPermissions(project, subproject, workflowitem) {
    this.props.fetchProjectPermissions(project.id);
    if (!_isEmpty(subproject)) this.props.fetchSubprojectPermissions(project.id, subproject.id);
    if (!_isEmpty(workflowitem)) this.props.fetchWorkflowitemPermissions(project.id, subproject.id, workflowitem.id);
  }

  render() {
    if (this.props.confirmationDialogOpen) {
      const permissions = this.props.permissions;
      if (
        this.props.originalActions.some(action => !_isEmpty(action.payload)) &&
        _isEmpty(permissions.project) &&
        !this.props.isFetchingProjectPermissions &&
        !this.props.isFetchingSubprojectPermissions &&
        !this.props.isFetchingWorkflowitemPermissions
      )
        this.fetchPermissions(this.props.project, this.props.subproject, this.props.workflowitem); // TODO: don't fetch Permissions every time the dialog opens
      return this.props.confirmed === false ? (
        <ConfirmationDialog
          open={this.props.confirmationDialogOpen}
          originalActions={this.props.originalActions}
          onConfirm={this.props.confirmConfirmation}
          onCancel={this.props.cancelConfirmation}
          executeConfirmedActions={this.props.executeConfirmedActions}
          permissions={this.props.permissions}
          confirmingUser={this.props.confirmingUser}
          isFetchingProjectPermissions={this.props.isFetchingProjectPermissions}
          isFetchingSubprojectPermissions={this.props.isFetchingSubprojectPermissions}
          isFetchingWorkflowitemPermissions={this.props.isFetchingWorkflowitemPermissions}
          executedActions={this.props.executedActions}
          actions={this.props.actions}
          addActions={this.props.addActions}
          actionsAreExecuted={this.props.actionsAreExecuted}
          executingActions={this.props.executingActions}
          project={this.props.project}
          subproject={this.props.subproject}
          workflowitem={this.props.workflowitem}
        />
      ) : null;
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProjectPermissions: pId => dispatch(fetchProjectPermissions(pId, false)),
    fetchSubprojectPermissions: (pId, sId) => dispatch(fetchSubProjectPermissions(pId, sId, false)),
    fetchWorkflowitemPermissions: (pId, spId, wId) => dispatch(fetchWorkflowItemPermissions(pId, spId, wId, false)),
    confirmConfirmation: () => dispatch(confirmConfirmation(true)),
    cancelConfirmation: () => dispatch(cancelConfirmation(false)),
    executeConfirmedActions: (actions, pId, subId) => dispatch(executeConfirmedActions(actions, pId, subId, false)),
    addActions: actions => dispatch(addActions(actions)),
    assignProject: (projectId, projectDisplayName, assigneeId, assigneeDisplayName) =>
      dispatch(assignProject(projectId, projectDisplayName, assigneeId, assigneeDisplayName)),
    assignSubproject: (pId, pDisplayName, subpId, subpName, assigneeId, assigneeName) =>
      dispatch(assignSubproject(pId, pDisplayName, subpId, subpName, assigneeId, assigneeName)),
    assignWorkflowitem: (pId, pDisplayName, subpId, subpName, wId, wName, assigneeId, assigneeName) =>
      dispatch(assignWorkflowItem(pId, pDisplayName, subpId, subpName, wId, wName, assigneeId, assigneeName)),
    grantProjectPermission: (pId, permission, identity) => dispatch(grantPermission(pId, permission, identity))
  };
};

const mapStateToProps = state => {
  return {
    confirmationDialogOpen: state.getIn(["confirmation", "open"]),
    originalActions: state.getIn(["confirmation", "originalActions"]),
    confirmDisabled: state.getIn(["confirmation", "disabled"]),
    permissions: state.getIn(["confirmation", "permissions"]),
    confirmingUser: state.getIn(["login", "id"]),
    isFetchingProjectPermissions: state.getIn(["confirmation", "isFetchingProjectPermissions"]),
    isFetchingSubprojectPermissions: state.getIn(["confirmation", "isFetchingSubprojectPermissions"]),
    isFetchingWorkflowitemPermissions: state.getIn(["confirmation", "isFetchingWorkflowitemPermissions"]),
    executedActions: state.getIn(["confirmation", "executedActions"]),
    actions: state.getIn(["confirmation", "actions"]),
    actionsAreExecuted: state.getIn(["confirmation", "actionsAreExecuted"]),
    executingActions: state.getIn(["confirmation", "executingActions"]),
    confirmed: state.getIn(["confirmation", "confirmed"]),
    project: state.getIn(["confirmation", "project"]),
    subproject: state.getIn(["confirmation", "subproject"]),
    workflowitem: state.getIn(["confirmation", "workflowitem"])
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ConfirmationContainer));
