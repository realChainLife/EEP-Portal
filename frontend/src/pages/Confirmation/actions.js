export const CONFIRMATION_REQUIRED = "CONFIRMATION_REQUIRED";
export const CONFIRMATION_CONFIRMED = "CONFIRMATION_CONFIRMED";
export const CONFIRMATION_CANCELED = "CONFIRMATION_CANCELED";
export const ADD_ACTIONS = "ADD_ACTIONS";
export const EXECUTE_CONFIRMED_ACTIONS = "EXECUTE_CONFIRMED_ACTIONS";
export const EXECUTE_CONFIRMED_ACTIONS_FAILURE = "EXECUTE_CONFIRMED_ACTIONS_FAILURE";
export const EXECUTE_CONFIRMED_ACTIONS_SUCCESS = "EXECUTE_CONFIRMED_ACTIONS_SUCCESS";

export function showConfirmationDialog(intent, payload = {}) {
  return {
    type: CONFIRMATION_REQUIRED,
    intent,
    payload
  };
}
export function cancelConfirmation() {
  return {
    type: CONFIRMATION_CANCELED
  };
}
export function confirmConfirmation() {
  return {
    type: CONFIRMATION_CONFIRMED
  };
}

export function addActions(actions) {
  return {
    type: ADD_ACTIONS,
    actions
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
