import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

import strings from "../../../localizeStrings";
import PermissionTable from "./PermissionsTable";

const PermissionDialog = props => {
  return (
    <Dialog
      disableRestoreFocus
      data-test="permission-container"
      open={props.permissionDialogShown}
      onClose={props.hidePermissionDialog}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <PermissionTable {...props} disabled={props.disabled} />
      </DialogContent>
      <DialogActions>
        <Button data-test="permission-close" color="secondary" onClick={props.hidePermissionDialog}>
          {strings.common.cancel}
        </Button>
        <Button
          data-test="permission-submit"
          color="primary"
          onClick={
            JSON.stringify(props.temporaryPermissions) !== JSON.stringify(props.permissions)
              ? () => {
                  props.showConfirmationDialog({
                    project: { id: props.projectId, displayName: props.projectDisplayName },
                    subproject: { id: props.subprojectId, displayName: props.subprojectDisplayName },
                    workflowitem: { id: props.wId, displayName: props.workfowitemDisplayName },
                    newPermissions: props.temporaryPermissions
                  });
                }
              : props.hidePermissionDialog
          }
        >
          {strings.common.submit}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PermissionDialog;
