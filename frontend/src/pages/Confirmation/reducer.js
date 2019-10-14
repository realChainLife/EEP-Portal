import { fromJS } from "immutable";

import { LOGOUT } from "../Login/actions";
import { CONFIRM_INTENT, INTENT_CANCELED, INTENT_CONFIRMED } from "./actions";
import { FETCH_PROJECT_PERMISSIONS_SUCCESS, FETCH_PROJECT_PERMISSIONS } from "../Overview/actions";
import { FETCH_SUBPROJECT_PERMISSIONS_SUCCESS, FETCH_SUBPROJECT_PERMISSIONS } from "../SubProjects/actions";
import { FETCH_WORKFLOWITEM_PERMISSIONS_SUCCESS, FETCH_WORKFLOWITEM_PERMISSIONS } from "../Workflows/actions";

const defaultState = fromJS({
  open: false,
  intent: "",
  permissions: { project: {}, subproject: {}, workflowitem: {} },
  payload: {},
  isFetchingProjectPermissions: false,
  isFetchingSubprojectPermissions: false,
  isFetchingWorkflowitemPermissions: false
});

export default function confirmationReducer(state = defaultState, action) {
  switch (action.type) {
    case CONFIRM_INTENT:
      return state.merge({
        open: true,
        intent: action.intent,
        payload: action.payload
      });
    case INTENT_CONFIRMED:
      return state.merge({
        open: defaultState.open,
        intent: defaultState.intent,
        permissions: defaultState, // TODO: don't fetch permissions every time confirmation dialog opens
        payload: defaultState.payload,
        isFetchingProjectPermissions: defaultState.isFetchingProjectPermissions,
        isFetchingSubprojectPermissions: defaultState.isFetchingSubprojectPermissions,
        isFetchingWorkflowitemPermissions: defaultState.isFetchingWorkflowitemPermissions
      });
    case INTENT_CANCELED:
      return state.merge({
        open: defaultState.open,
        intent: defaultState.intent,
        permissions: defaultState, // TODO: don't fetch permissions every time confirmation dialog opens
        payload: defaultState.payload,
        isFetchingProjectPermissions: defaultState.isFetchingProjectPermissions,
        isFetchingSubprojectPermissions: defaultState.isFetchingSubprojectPermissions,
        isFetchingWorkflowitemPermissions: defaultState.isFetchingWorkflowitemPermissions
      });
    case FETCH_PROJECT_PERMISSIONS:
      return state.set("isFetchingProjectPermissions", true);
    case FETCH_PROJECT_PERMISSIONS_SUCCESS:
      return state
        .setIn(["permissions", "project"], fromJS(action.permissions))
        .set("isFetchingProjectPermissions", defaultState.isFetchingProjectPermissions);
    case FETCH_SUBPROJECT_PERMISSIONS:
      return state.set("isFetchingSubprojectPermissions", true);
    case FETCH_SUBPROJECT_PERMISSIONS_SUCCESS:
      return state
        .setIn(["permissions", "subproject"], fromJS(action.permissions))
        .set("isFetchingSubprojectPermissions", defaultState.isFetchingSubprojectPermissions);
    case FETCH_WORKFLOWITEM_PERMISSIONS:
      return state
        .set("isFetchingWorkflowitemPermissions", true)
        .setIn(["permissions", "workflowitemId"], action.workflowitemId);
    case FETCH_WORKFLOWITEM_PERMISSIONS_SUCCESS:
      return state
        .setIn(["permissions", "workflowitem"], fromJS(action.permissions))
        .set("isFetchingWorkflowitemPermissions", defaultState.isFetchingWorkflowitemPermissions);
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
