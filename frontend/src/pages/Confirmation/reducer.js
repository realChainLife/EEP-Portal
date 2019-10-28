import { fromJS } from "immutable";

import { LOGOUT } from "../Login/actions";
import {
  CONFIRMATION_REQUIRED,
  CONFIRMATION_CANCELED,
  CONFIRMATION_CONFIRMED,
  ADD_ACTIONS,
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
  GRANT_SUBPROJECT_PERMISSION_SUCCESS,
  ASSIGN_PROJECT_SUCCESS,
  FETCH_ALL_PROJECT_DETAILS_SUCCESS
} from "../SubProjects/actions";
import {
  FETCH_WORKFLOWITEM_PERMISSIONS_SUCCESS,
  FETCH_WORKFLOWITEM_PERMISSIONS,
  GRANT_WORKFLOWITEM_PERMISSION_SUCCESS,
  ASSIGN_SUBPROJECT_SUCCESS,
  ASSIGN_WORKFLOWITEM_SUCCESS,
  FETCH_ALL_SUBPROJECT_DETAILS_SUCCESS
} from "../Workflows/actions";

const defaultState = fromJS({
  open: false,
  intent: "",
  originalActions: [],
  permissions: { project: {}, subproject: {}, workflowitem: {} },
  payload: {},
  isFetchingProjectPermissions: false,
  isFetchingSubprojectPermissions: false,
  isFetchingWorkflowitemPermissions: false,
  executedOriginalActions: [],
  actions: [],
  executedActions: [],
  actionsAreExecuted: false,
  executingActions: false,
  confirmed: undefined,
  project: {},
  subproject: {},
  workflowitem: {}
});

export default function confirmationReducer(state = defaultState, action) {
  switch (action.type) {
    case CONFIRMATION_REQUIRED:
      const { project, subproject, workflowitem } = action.payload;
      return state.merge({
        open: true,
        confirmed: false,
        originalActions: state
          .updateIn(["originalActions"], intent => [...intent, { intent: action.intent, payload: action.payload }])
          .get("originalActions"),
        project: project || defaultState.get("project"),
        subproject: subproject || defaultState.get("subproject"),
        workflowitem: workflowitem || defaultState.get("workflowitem")
      });
    case CONFIRMATION_CONFIRMED: // TODO: don't fetch permissions every time confirmation dialog opens
      return defaultState.set("confirmed", true);
    case CONFIRMATION_CANCELED:
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
    case ADD_ACTIONS:
      return state.merge({
        actions: state.updateIn(["actions"], actions => [...actions, ...action.actions]).get("actions")
      });
    case ASSIGN_PROJECT_SUCCESS:
    case ASSIGN_SUBPROJECT_SUCCESS:
    case ASSIGN_WORKFLOWITEM_SUCCESS:
      return state.set("confirmed", defaultState.get("confirmed"));

    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
