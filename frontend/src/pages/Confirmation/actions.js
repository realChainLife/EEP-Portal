export const CONFIRM_INTENT = "CONFIRM_INTENT";
export const INTENT_CONFIRMED = "INTENT_CONFIRMED";
export const INTENT_CANCELED = "INTENT_CANCELED";
export const EXECUTE_CONFIRMED_ACTIONS = "EXECUTE_CONFIRMED_ACTIONS";

export function showConfirmationDialog(intent, payload = {}) {
  return {
    type: CONFIRM_INTENT,
    intent,
    payload
  };
}
export function cancelConfirmation() {
  return {
    type: INTENT_CANCELED
  };
}
export function confirmConfirmation() {
  return {
    type: INTENT_CONFIRMED
  };
}

export function executeConfirmedActions(actions, projectId = "", subprojectId = "", showLoading = false) {
  return {
    type: EXECUTE_CONFIRMED_ACTIONS,
    actions,
    projectId,
    subprojectId,
    showLoading
  };
}
