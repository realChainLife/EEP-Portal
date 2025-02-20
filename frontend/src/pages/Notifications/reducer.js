import { fromJS } from "immutable";
import {
  SHOW_SNACKBAR,
  SNACKBAR_MESSAGE,
  FETCH_HISTORY_SUCCESS,
  OPEN_HISTORY,
  HIDE_HISTORY,
  FETCH_ALL_NOTIFICATIONS_SUCCESS,
  HIDE_SNACKBAR,
  FETCH_NOTIFICATION_COUNT_SUCCESS,
  SET_NOTIFICATIONS_PER_PAGE,
  LIVE_UPDATE_NOTIFICATIONS_SUCCESS,
  TIME_OUT_FLY_IN,
  ENABLE_LIVE_UPDATES,
  DISABLE_LIVE_UPDATES
} from "./actions";
import { LOGOUT } from "../Login/actions";

const defaultState = fromJS({
  notifications: [],
  newNotifications: [],
  showHistory: false,
  showSnackbar: false,
  snackbarMessage: "New Project added",
  snackbarError: false,
  historyItems: [],
  unreadNotificationCount: 0,
  notificationsPerPage: 20,
  notificationOffset: 0,
  isLiveUpdatesEnabled: true,
  totalNotificationCount: 0,
  currentNotificationPage: 1,
  notificationPageSize: 20
});

export default function navbarReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_ALL_NOTIFICATIONS_SUCCESS:
      return state.merge({
        notifications: fromJS(action.notifications),
        currentNotificationPage: action.currentNotificationPage,
        totalNotificationCount: action.totalNotificationCount
      });

    case ENABLE_LIVE_UPDATES: {
      return state.set("isLiveUpdatesEnabled", true);
    }

    case DISABLE_LIVE_UPDATES: {
      return state.set("isLiveUpdatesEnabled", false);
    }

    case LIVE_UPDATE_NOTIFICATIONS_SUCCESS: {
      const { newNotifications } = action;
      const count = newNotifications.length;
      const notificationCount =
        count > 0 ? state.get("notificationCount") + newNotifications.length : state.get("notificationCount");
      const unreadNotificationCount = state.get("unreadNotificationCount") + count;
      return state.merge({
        newNotifications: fromJS(newNotifications),
        notificationCount: notificationCount,
        unreadNotificationCount
      });
    }
    case TIME_OUT_FLY_IN: {
      return state.set("newNotifications", defaultState.get("newNotifications"));
    }
    case FETCH_NOTIFICATION_COUNT_SUCCESS:
      return state.merge({
        unreadNotificationCount: action.unreadNotificationCount,
        notificationCount: action.notificationCount
      });
    case SHOW_SNACKBAR:
      return state.merge({
        showSnackbar: action.show,
        snackbarError: action.isError
      });
    case HIDE_SNACKBAR:
      return state.set("showSnackbar", action.show);
    case SNACKBAR_MESSAGE:
      return state.set("snackbarMessage", action.message);
    case FETCH_HISTORY_SUCCESS:
      return state.set("historyItems", fromJS(action.historyItems));
    case OPEN_HISTORY:
      return state.set("showHistory", true);
    case HIDE_HISTORY:
      return state.set("showHistory", false);
    case SET_NOTIFICATIONS_PER_PAGE:
      return state.set("notificationPageSize", action.notificationPageSize);
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
