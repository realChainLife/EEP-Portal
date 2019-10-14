import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import strings from "../../localizeStrings";
import DialogButtons from "./DialogButtons";
import ActionsTable from "./ActionsTable";
import _isEmpty from "lodash/isEmpty";
import { getMissingViewPermissions } from "./SideEffectActions";
import WarningTypography from "./WarningTypography";
import { Typography, CircularProgress } from "@material-ui/core";
import { formatString } from "../../helper";

const styles = {
  paperRoot: {
    width: "100%",
    overflow: "visible"
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

const ConfirmationDialog = props => {
  const { classes, open = false, intent, payload, permissions, confirmingUser } = props;
  // If permissions are not fetched yet show Loading indicator
  if (props.isFetchingPermissions || _isEmpty(props.permissions.project)) {
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
  let actions,
    title,
    content,
    confirmButtonText = strings.common.confirm,
    onConfirm = props.onConfirm,
    permittedToGrant = false;

  // Implement a new confirmation dialog by setting title, content and confirmButtonText
  // The intent onConfirm is handled by the saga which has triggered the confirmation
  // Sideeffect actions must be handled here
  // The payload is defined by the saga which triggers the CONFIRM_INTENT-action
  switch (intent) {
    case "project.assign":
      permittedToGrant = permissions.project["project.intent.grantPermission"].includes(confirmingUser);
      actions = getMissingViewPermissions({ project: permissions.project }, payload.assignee.id, {
        id: payload.project.id,
        displayName: payload.project.displayName
      });
      if (!_isEmpty(actions)) {
        title = strings.confirmation.additional_permissions_required;
        confirmButtonText = strings.confirmation.grant_and_assign;
        content = (
          <>
            <Typography>
              {formatString(
                strings.confirmation.permissions_text,
                payload.assignee.displayName,
                "project",
                payload.project.displayName
              )}
            </Typography>
            <ActionsTable actions={actions} />
          </>
        );
      } else {
        title = strings.confirmation.confirm_assign;
        confirmButtonText = strings.common.assign;
        content = (
          <Typography>
            {formatString(
              strings.confirmation.assigning_text,
              payload.assignee.displayName,
              "project",
              payload.project.displayName
            )}
          </Typography>
        );
      }
      break;
    default:
      title = "Are you sure?";
      content = "Confirmation Dialog for " + intent + " is not implemented yet";
      break;
  }
  onConfirm = () => {
    if (!_isEmpty(actions)) props.executeConfirmedActions(actions, payload.project.id, payload.subprojectid);
    props.onConfirm();
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
        onConfirm={onConfirm}
        onCancel={props.onCancel}
        confirmDisabled={!permittedToGrant && !_isEmpty(actions)}
      />
    </Dialog>
  );
};

export default withStyles(styles)(ConfirmationDialog);
