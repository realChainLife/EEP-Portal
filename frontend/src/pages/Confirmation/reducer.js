import { fromJS } from "immutable";

import { LOGOUT } from "../Login/actions";
import {
  CONFIRM_INTENT,
  INTENT_CANCELED,
  INTENT_CONFIRMED,
  STORE_ACTIONS,
  EXECUTE_CONFIRMED_ACTIONS_SUCCESS,
  EXECUTE_CONFIRMED_ACTIONS
} from "./actions";
import {
  FETCH_PROJECT_PERMISSIONS_SUCCESS,
  FETCH_PROJECT_PERMISSIONS,
  GRANT_PERMISSION_SUCCESS
} from "../Overview/actions";
import {
  FETCH_SUBPROJECT_PERMISSIONS_SUCCESS,
  FETCH_SUBPROJECT_PERMISSIONS,
  GRANT_SUBPROJECT_PERMISSION_SUCCESS
} from "../SubProjects/actions";
import {
  FETCH_WORKFLOWITEM_PERMISSIONS_SUCCESS,
  FETCH_WORKFLOWITEM_PERMISSIONS,
  GRANT_WORKFLOWITEM_PERMISSION_SUCCESS
} from "../Workflows/actions";

const defaultState = fromJS({
  open: false,
  intent: "",
  permissions: { project: {}, subproject: {}, workflowitem: {} },
  payload: {},
  isFetchingProjectPermissions: false,
  isFetchingSubprojectPermissions: false,
  isFetchingWorkflowitemPermissions: false,
  executedActions: [],
  actionsAreExecuted: false,
  executingActions: false,
  actions: []
});

export default function confirmationReducer(state = defaultState, action) {
  switch (action.type) {
    case CONFIRM_INTENT:
      return state.merge({
        open: true,
        intent: action.intent,
        payload: action.payload
      });
    case INTENT_CONFIRMED: // TODO: don't fetch permissions every time confirmation dialog opens
      return defaultState;
    case INTENT_CANCELED:
      return defaultState;
    case FETCH_PROJECT_PERMISSIONS:
      return state.set("isFetchingProjectPermissions", true);
    case FETCH_PROJECT_PERMISSIONS_SUCCESS:
      return state
        .setIn(["permissions", "project"], fromJS(action.permissions))
        .set("isFetchingProjectPermissions", defaultState.get("isFetchingProjectPermissions"));
    case FETCH_SUBPROJECT_PERMISSIONS:
      return state.set("isFetchingSubprojectPermissions", true);
    case FETCH_SUBPROJECT_PERMISSIONS_SUCCESS:
      return state
        .setIn(["permissions", "subproject"], fromJS(action.permissions))
        .set("isFetchingSubprojectPermissions", defaultState.get("isFetchingSubprojectPermissions"));
    case FETCH_WORKFLOWITEM_PERMISSIONS:
      return state
        .set("isFetchingWorkflowitemPermissions", true)
        .setIn(["permissions", "workflowitemId"], action.workflowitemId);
    case FETCH_WORKFLOWITEM_PERMISSIONS_SUCCESS:
      return state
        .setIn(["permissions", "workflowitem"], fromJS(action.permissions))
        .set("isFetchingWorkflowitemPermissions", defaultState.get("isFetchingWorkflowitemPermissions"));
    case GRANT_PERMISSION_SUCCESS:
    case GRANT_SUBPROJECT_PERMISSION_SUCCESS:
    case GRANT_WORKFLOWITEM_PERMISSION_SUCCESS:
      return state.updateIn(["executedActions"], actions => [
        ...actions,
        { id: action.id, identity: action.identity, intent: action.intent }
      ]);
    case EXECUTE_CONFIRMED_ACTIONS:
      return state.set("executingActions", true);
    case EXECUTE_CONFIRMED_ACTIONS_SUCCESS:
      return state.set("actionsAreExecuted", true).set("executingActions", false);
    case STORE_ACTIONS:
      return state.set("actions", action.actions);
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
