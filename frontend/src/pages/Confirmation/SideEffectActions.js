import _isEmpty from "lodash/isEmpty";
import { grantPermission } from "../Overview/actions";
import { grantSubProjectPermission } from "../SubProjects/actions";
import { grantWorkflowItemPermission, assignSubproject, assignWorkflowItem } from "../Workflows/actions";

// Side effect describes an action which triggers indirectly according to the main intent.
// (e.g. main-intent:assign, side-effect: grant view permission)
export const createAllSideEffectActions = (
  permissions,
  identity,
  project,
  subproject = undefined,
  workflowitem = undefined
) => {
  const resources = ["project", "subproject", "workflowitem"];
  const actionType = "grant";
  const allSideEffectActions = [];
  resources.forEach(res => {
    const resPermissions = permissions[res];
    if (!_isEmpty(resPermissions)) {
      let id, displayName;
      switch (res) {
        case "project":
          id = project.id;
          displayName = project.displayName;
          break;

        case "subproject":
          id = subproject.id;
          displayName = subproject.displayName;
          break;

        case "workflowitem":
          id = workflowitem.id;
          displayName = workflowitem.displayName;
          break;

        default:
          id = project.id;
          displayName = project.displayName;
          break;
      }
      const actions = createSideEffectActions(resPermissions, res, actionType, id, displayName, identity);
      if (actions.length !== 0) allSideEffectActions.push(...actions);
    }
  });
  return allSideEffectActions;
};
// Find out which view permissions are missing and create side effect actions
function createSideEffectActions(permissions, resource, type, id, displayName, identity) {
  const viewSummary = `${resource}.viewSummary`;
  const viewDetails = `${resource}.viewDetails`;
  const viewWorkflowitem = `${resource}.view`;
  const listPermissions = `${resource}.intent.listPermissions`;
  const grantPermission = `${resource}.intent.grantPermission`;
  const revokePermission = `${resource}.intent.revokePermission`;
  let sideEffectActions = [];
  if (resource !== "workflowitem") {
    if (permissions[viewSummary] === undefined || !permissions[viewSummary].includes(identity)) {
      const action = { type, id, displayName, intent: viewSummary, identity };
      sideEffectActions.push(action);
    }
    if (permissions[viewDetails] === undefined || !permissions[viewDetails].includes(identity)) {
      const action = { type, id, displayName, intent: viewDetails, identity };
      sideEffectActions.push(action);
    }
  } else {
    if (permissions[viewWorkflowitem] === undefined || !permissions[viewWorkflowitem].includes(identity)) {
      const action = { type, id, displayName, intent: viewWorkflowitem, identity };
      sideEffectActions.push(action);
    }
  }
  // Only check for listPermissions if identity has grant/revoke permissions
  if (
    (permissions[grantPermission].includes(identity) || permissions[revokePermission].includes(identity)) &&
    (permissions[listPermissions] === undefined || !permissions[listPermissions].includes(identity))
  ) {
    const action = { type, id, displayName, intent: listPermissions, identity };
    sideEffectActions.push(action);
  }
  return sideEffectActions;
}

// Create grant/revoke actions including side effect actions
export function createAllPermissionActions(
  oldPermissions,
  newPermissions,
  project,
  subproject = {},
  workflowitem = {}
) {
  let actions = [];
  let resourceString;
  if (_isEmpty(subproject)) {
    resourceString = "project";
  } else {
    if (_isEmpty(workflowitem)) {
      resourceString = "subproject";
    } else {
      resourceString = "workflowitem";
    }
  }
  Object.keys(oldPermissions[resourceString]).forEach(key => {
    let resource;
    switch (resourceString) {
      case "project":
        resource = project;
        break;
      case "subproject":
        resource = subproject;
        break;
      case "workflowitem":
        resource = workflowitem;
        break;
      default:
        resource = project;
        break;
    }
    const permissionIds = oldPermissions[resourceString][key];
    const temporaryPermissionIds = newPermissions[key];

    const revokeIds = permissionIds.filter(id => !temporaryPermissionIds.includes(id));
    if (revokeIds.length > 0)
      revokeIds.forEach(id =>
        actions.push({
          type: "revoke",
          intent: key,
          identity: id,
          displayName: resource.displayName,
          id: resource.id
        })
      );
    const grantIds = temporaryPermissionIds.filter(id => !permissionIds.includes(id));
    if (grantIds.length > 0) {
      grantIds.forEach(id => {
        actions.push({
          type: "grant",
          intent: key,
          identity: id,
          displayName: resource.displayName,
          id: resource.id
        });
      });
    }
  });

  const ids = actions.reduce((ids, action) => {
    const id = action.identity;
    if (!ids.includes(id)) ids.push(id);
    return ids;
  }, []);
  let updatedPermissions = oldPermissions;
  updatedPermissions[resourceString] = newPermissions;
  ids.forEach(id => {
    const sideEffectActions = createAllSideEffectActions(updatedPermissions, id, project, subproject, workflowitem);
    actions = actions.concat(sideEffectActions);
  });

  return actions;
}

export function executeOriginalActions(
  actions,
  project,
  subproject,
  assignProject,
  assignSubproject,
  assignWorkflowitem,
  grantProjectPermission,
  grantSubprojectPermission,
  grantWorkflowitemPermission
) {
  for (const index in actions) {
    const action = actions[index];
    const resource = action.intent.split(".", 1)[0];
    const type = action.intent.split(".")[1];
    switch (resource) {
      case "project":
        switch (type) {
          case "grant":
            grantProjectPermission(action.payload.project.id, action.payload.intent, action.payload.grantee.id);
            break;
          case "assign":
            assignProject(
              action.payload.project.id,
              action.payload.project.displayName,
              action.payload.assignee.id,
              action.payload.assignee.displayName
            );
            break;
          default:
            break;
        }
        break;
      case "subproject":
        switch (type) {
          case "grant":
            grantSubProjectPermission(project.id, action.id, action.intent, action.identity);
            break;
          case "assign":
            assignSubproject(
              action.payload.project.id,
              action.payload.project.displayName,
              action.payload.subproject.id,
              action.payload.subproject.displayName,
              action.payload.assignee.id,
              action.payload.assignee.displayName
            );
            break;
          default:
            break;
        }
        break;
      case "workflowitem":
        switch (type) {
          case "grant":
            grantWorkflowItemPermission(project.id, subproject.id, action.id, action.intent, action.identity);
            break;
          case "assign":
            assignWorkflowitem(
              action.payload.project.id,
              action.payload.project.displayName,
              action.payload.subproject.id,
              action.payload.subproject.displayName,
              action.payload.workflowitem.id,
              action.payload.workflowitem.displayName,
              action.payload.assignee.id,
              action.payload.assignee.displayName
            );
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
}
