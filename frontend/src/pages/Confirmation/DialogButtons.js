import { Button } from "@material-ui/core";
import React from "react";
import strings from "../../localizeStrings";
import DialogActions from "@material-ui/core/DialogActions";

class DialogButtons extends React.Component {
  render() {
    const { confirmButtonText, onConfirm, onCancel, confirmDisabled } = this.props;

    return (
      <DialogActions>
        <Button aria-label="cancel" data-test="confirmation-dialog-cancel" color="secondary" onClick={() => onCancel()}>
          {strings.common.cancel}
        </Button>
        <Button
          aria-label="confirm"
          data-test="confirmation-dialog-confirm"
          color="primary"
          onClick={() => onConfirm()}
          disabled={confirmDisabled}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    );
  }
}
export default DialogButtons;
