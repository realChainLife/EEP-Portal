import { Button, Typography } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import strings from "../../localizeStrings";

const styles = {
  dialogActions: {
    margin: "8px 4px 8px 24px"
  },
  progressInfo: {
    flex: "auto"
  }
};

class DialogButtons extends React.Component {
  render() {
    const {
      classes,
      confirmButtonText,
      onConfirm,
      onCancel,
      confirmDisabled,
      actions,
      executedActions,
      actionsAreExecuted,
      executingActions
    } = this.props;

    return (
      <DialogActions className={classes.dialogActions}>
        {actions.length ? (
          <Typography key="progressInfo" className={classes.progressInfo}>
            {strings.formatString(strings.preview.actions_done, executedActions.length, actions.length)}
          </Typography>
        ) : null}
        <Button
          disabled={executingActions || actionsAreExecuted}
          aria-label="cancel"
          data-test="confirmation-dialog-cancel"
          color="secondary"
          onClick={() => onCancel()}
        >
          {strings.common.cancel}
        </Button>
        <Button
          aria-label="confirm"
          data-test="confirmation-dialog-confirm"
          color="primary"
          onClick={() => onConfirm()}
          disabled={confirmDisabled || executingActions}
        >
          {actionsAreExecuted ? strings.common.done : confirmButtonText}
        </Button>
      </DialogActions>
    );
  }
}
export default withStyles(styles)(DialogButtons);
