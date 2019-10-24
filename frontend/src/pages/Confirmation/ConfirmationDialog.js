import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import strings from "../../localizeStrings";
import DialogButtons from "./DialogButtons";
import ActionsTable from "./ActionsTable";
import _isEmpty from "lodash/isEmpty";
import { createAllSideEffectActions, createAllPermissionActions } from "./SideEffectActions";
import WarningTypography from "./WarningTypography";
import { Typography, CircularProgress } from "@material-ui/core";
import { formatString } from "../../helper";

const styles = {
  paperRoot: {
    width: "100%",
    overflow: "visible",
    maxWidth: "800px"
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "top",
    justifyContent: "center",
    marginRight: "50px"
  },
  loadingIndicator: {
    display: "inline-block",
    position: "relative",
    padding: "50px"
  }
};

// Implement a new confirmation dialog by setting title, content and confirmButtonText
// Sideeffect actions must be handled here
const ConfirmationDialog = props => {
  const {
    classes,
    open = false,
    intent,
    payload,
    permissions,
    confirmingUser,
    executedActions,
    actions,
    storeActions,
    actionsAreExecuted,
    executingActions
  } = props;

  // If permissions are not fetched yet show Loading indicator
  if (
    props.isFetchingProjectPermissions ||
    props.isFetchingSubprojectPermissions ||
    props.isFetchingWorkflowitemPermissions ||
    _isEmpty(props.permissions.project)
  ) {
    return (
      <Dialog classes={{ paper: classes.paperRoot }} open={open} data-test="confirmation-dialog">
        <div className={classes.loadingContainer}>
          <CircularProgress
            size={50}
            left={0}
            top={0}
            percentage={50}
            color="primary"
            className={classes.loadingIndicator}
          />
        </div>
      </Dialog>
    );
  }
  let title,
    content,
    confirmButtonText = strings.common.confirm,
    executeActions = props.onConfirm,
    permittedToGrant = false;

  switch (intent) {
    // The payload is defined by the saga which triggers the CONFIRM_INTENT-action
    case "project.assign":
      {
        // TODO: Verify payload
        // Parse payload variables
        const projectPermissions = { project: permissions.project };
        const project = {
          id: payload.project.id,
          displayName: payload.project.displayName
        };
        // If view permissions are missing the required actions will be generated
        if (_isEmpty(actions))
          storeActions(createAllSideEffectActions(projectPermissions, payload.assignee.id, project));
        permittedToGrant = permissions.project["project.intent.grantPermission"].includes(confirmingUser);

        if (!_isEmpty(actions)) {
          title = strings.confirmation.additional_permissions_required;
          confirmButtonText = strings.confirmation.grant_and_assign;
          const dialogText = formatString(
            strings.confirmation.permissions_text,
            payload.assignee.displayName,
            strings.common.project,
            payload.project.displayName
          );
          content = (
            <>
              <Typography>{dialogText}</Typography>
              <ActionsTable actions={actions} executedActions={executedActions} executingActions={executingActions} />
            </>
          );
        } else {
          title = strings.confirmation.confirm_assign;
          confirmButtonText = strings.common.assign;
          const dialogText = formatString(
            strings.confirmation.assigning_text,
            payload.assignee.displayName,
            strings.common.project,
            payload.project.displayName
          );
          content = <Typography>{dialogText}</Typography>;
        }
      }
      break;
    // The payload is defined by an action which is triggered by the PermissionDialog
    case "project.intent.grant":
    case "project.intent.revoke":
      {
        // TODO: Verify payload
        // Parse payload variables
        const projectPermissions = { project: permissions.project };
        const project = {
          id: payload.project.id,
          displayName: payload.project.displayName
        };
        // Create grant/revoke actions including side effect actions
        if (_isEmpty(actions))
          storeActions(createAllPermissionActions(projectPermissions, payload.newPermissions, project));
        permittedToGrant = permissions.project["project.intent.grantPermission"].includes(confirmingUser);
        title = strings.confirmation.additional_permissions_required;
        confirmButtonText = strings.common.grant;
        const dialogText =
          "Note that additionally to Write/Admin Permissions View Permissions are granted. Following actions show all actions that shall be executed";
        content = (
          <>
            <Typography>{dialogText}</Typography>
            <ActionsTable actions={actions} executedActions={executedActions} executingActions={executingActions} />
          </>
        );
      }
      break;

    case "subproject.intent.grant":
    case "subproject.intent.revoke":
      {
        // TODO: Verify payload
        // Parse payload variables
        const subprojectPermissions = { project: permissions.project, subproject: permissions.subproject };
        const project = {
          id: payload.project.id,
          displayName: payload.project.displayName
        };
        const subproject = {
          id: payload.subproject.id,
          displayName: payload.subproject.displayName
        };
        // Create grant/revoke actions including side effect actions
        if (_isEmpty(actions))
          storeActions(createAllPermissionActions(subprojectPermissions, payload.newPermissions, project, subproject));
        permittedToGrant = permissions.subproject["subproject.intent.grantPermission"].includes(confirmingUser);
        title = strings.confirmation.additional_permissions_required;
        confirmButtonText = strings.common.grant;
        const dialogText =
          "Note that additionally to Write/Admin Permissions View Permissions are granted. Following actions show all actions that shall be executed";
        content = (
          <>
            <Typography>{dialogText}</Typography>
            <ActionsTable actions={actions} executedActions={executedActions} executingActions={executingActions} />
          </>
        );
      }
      break;
    case "workflowitem.intent.grant":
    case "workflowitem.intent.revoke":
      {
        // TODO: Verify payload
        // Parse payload variables
        const project = {
          id: payload.project.id,
          displayName: payload.project.displayName
        };
        const subproject = {
          id: payload.subproject.id,
          displayName: payload.subproject.displayName
        };
        const workflowitem = {
          id: payload.workflowitem.id,
          displayName: payload.workflowitem.displayName
        };

        // Create grant/revoke actions including side effect actions
        if (_isEmpty(actions)) {
          storeActions(
            createAllPermissionActions(permissions, payload.newPermissions, project, subproject, workflowitem)
          );
        }
        permittedToGrant = permissions.subproject["subproject.intent.grantPermission"].includes(confirmingUser);
        title = strings.confirmation.additional_permissions_required;
        confirmButtonText = strings.common.grant;
        const dialogText =
          "Note that additionally to Write/Admin Permissions View Permissions are granted. Following actions show all actions that shall be executed";
        content = (
          <>
            <Typography>{dialogText}</Typography>
            {!_isEmpty(actions) ? <ActionsTable actions={actions} executedActions={executedActions} /> : null}
          </>
        );
      }
      break;

    case "subproject.assign": {
      // TODO: Verify payload
      // Parse payload variables
      const subprojectPermissions = { project: permissions.project, subproject: permissions.subproject };
      const project = {
        id: payload.project.id,
        displayName: payload.project.displayName
      };
      const subproject = {
        id: payload.subproject.id,
        displayName: payload.subproject.displayName
      };
      // If view permissions are missing the required actions will be generated
      if (_isEmpty(actions))
        storeActions(createAllSideEffectActions(subprojectPermissions, payload.assignee.id, project, subproject));
      permittedToGrant = isPermittedToGrant(confirmingUser, subprojectPermissions, actions);

      if (!_isEmpty(actions)) {
        title = strings.confirmation.additional_permissions_required;
        confirmButtonText = strings.confirmation.grant_and_assign;
        const dialogText = formatString(
          strings.confirmation.permissions_text,
          payload.assignee.displayName,
          strings.common.subproject,
          payload.subproject.displayName
        );
        content = (
          <>
            <Typography>{dialogText}</Typography>
            <ActionsTable actions={actions} executedActions={executedActions} executingActions={executingActions} />
          </>
        );
      } else {
        title = strings.confirmation.confirm_assign;
        confirmButtonText = strings.common.assign;
        const dialogText = formatString(
          strings.confirmation.assigning_text,
          payload.assignee.displayName,
          strings.common.subproject,
          payload.subproject.displayName
        );
        content = <Typography>{dialogText}</Typography>;
      }
      break;
    }
    case "workflowitem.assign": {
      // TODO: Verify payload
      // Parse payload variables
      const workflowitemPermissions = {
        project: permissions.project,
        subproject: permissions.subproject,
        workflowitem: permissions.workflowitem
      };
      const project = {
        id: payload.project.id,
        displayName: payload.project.displayName
      };
      const subproject = {
        id: payload.subproject.id,
        displayName: payload.subproject.displayName
      };
      const workflowitem = {
        id: payload.workflowitem.id,
        displayName: payload.workflowitem.displayName
      };
      // If view permissions are missing the required actions will be generated
      if (_isEmpty(actions)) {
        storeActions(
          createAllSideEffectActions(workflowitemPermissions, payload.assignee.id, project, subproject, workflowitem)
        );
      }
      permittedToGrant = isPermittedToGrant(confirmingUser, workflowitemPermissions, actions);

      if (!_isEmpty(actions)) {
        title = strings.confirmation.additional_permissions_required;
        confirmButtonText = strings.confirmation.grant_and_assign;
        const dialogText = formatString(
          strings.confirmation.permissions_text,
          payload.assignee.displayName,
          strings.common.workflowitem,
          payload.workflowitem.displayName
        );
        content = (
          <>
            <Typography>{dialogText}</Typography>
            <ActionsTable actions={actions} executedActions={executedActions} executingActions={executingActions} />
          </>
        );
      } else {
        title = strings.confirmation.confirm_assign;
        confirmButtonText = strings.common.assign;
        const dialogText = formatString(
          strings.confirmation.assigning_text,
          payload.assignee.displayName,
          strings.common.workflowitem,
          payload.workflowitem.displayName
        );
        content = <Typography>{dialogText}</Typography>;
      }
      break;
    }
    default:
      title = "Not implemented confirmation";
      content = "Confirmation Dialog for " + intent + " is not implemented yet";
      break;
  }
  executeActions = () => {
    const subproject = payload.subproject;
    if (!_isEmpty(actions))
      props.executeConfirmedActions(actions, payload.project.id, subproject ? subproject.id : undefined);
  };

  return (
    <Dialog classes={{ paper: classes.paperRoot }} open={open} data-test="confirmation-dialog">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      {!permittedToGrant && !_isEmpty(actions) ? (
        <WarningTypography text={strings.confirmation.no_permission_warning} />
      ) : null}
      <DialogButtons
        confirmButtonText={confirmButtonText}
        onConfirm={actionsAreExecuted ? props.onConfirm : executeActions}
        onCancel={props.onCancel}
        confirmDisabled={!permittedToGrant && !_isEmpty(actions)}
        actions={actions}
        executedActions={executedActions}
        actionsAreExecuted={actionsAreExecuted}
        executingActions={executingActions}
      />
    </Dialog>
  );
};

function isPermittedToGrant(identity, permissions, actions) {
  const resourcesToCheck = actions.reduce((resourcesToCheck, action) => {
    const resource = action.intent.split(".")[0];
    if (!resourcesToCheck.includes(resource)) {
      resourcesToCheck.push(resource);
    }
    return resourcesToCheck;
  }, []);

  resourcesToCheck.forEach(resource => {
    if (!permissions[resource][`${resource}.intent.grantPermission`].includes(identity)) return false;
  });
  return true;
}

export default withStyles(styles)(ConfirmationDialog);
