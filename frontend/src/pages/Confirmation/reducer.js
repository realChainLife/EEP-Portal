import { fromJS } from "immutable";

import { LOGOUT } from "../Login/actions";
import { CONFIRM_INTENT, INTENT_CANCELED, INTENT_CONFIRMED } from "./actions";
import { FETCH_PROJECT_PERMISSIONS_SUCCESS } from "../Overview/actions";
import { FETCH_SUBPROJECT_PERMISSIONS_SUCCESS } from "../SubProjects/actions";
import { FETCH_WORKFLOWITEM_PERMISSIONS_SUCCESS } from "../Workflows/actions";

const defaultState = fromJS({
  open: false,
  intent: "",
  permissions: { project: {}, subproject: {}, workflowitem: {} },
  payload: {}
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
        open: defaultState.open
      });
    case INTENT_CANCELED:
      return state.merge({
        open: defaultState.open
      });
    case FETCH_PROJECT_PERMISSIONS_SUCCESS:
      return state.setIn(["permissions", "project"], fromJS(action.permissions));
    case FETCH_SUBPROJECT_PERMISSIONS_SUCCESS:
      return state.setIn(["permissions", "subproject"], fromJS(action.permissions));
    case FETCH_WORKFLOWITEM_PERMISSIONS_SUCCESS:
      return state.setIn(["permissions", "workflowitem"], fromJS(action.permissions));
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
