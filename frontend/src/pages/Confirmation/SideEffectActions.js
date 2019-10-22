import _isEmpty from "lodash/isEmpty";

export const getMissingViewPermissions = (
  permissions,
  identity,
  project,
  subproject = undefined,
  workflowitem = undefined
) => {
  const resources = ["project", "subproject", "workflowitem"];
  const action = "grant";
  const missingPermissions = [];
  resources.forEach(res => {
    const resPermissions = permissions[res];
    if (!_isEmpty(resPermissions)) {
      switch (res) {
        case "project":
          const pMissPerm = parseAction(resPermissions, res, action, project.id, project.displayName, identity);
          if (pMissPerm.length !== 0) missingPermissions.push(...pMissPerm);
          break;

        case "subproject":
          const sMissPerm = parseAction(resPermissions, res, action, subproject.id, subproject.displayName, identity);
          if (sMissPerm.length !== 0) missingPermissions.push(...sMissPerm);
          break;

        case "workflowitem":
          if (resPermissions[`${res}.view`] === undefined || !resPermissions[`${res}.view`].includes(identity)) {
            missingPermissions.push({
              action,
              id: workflowitem.id,
              displayName: workflowitem.displayName,
              intent: `${res}.view`,
              identity
            });
            return;
          }
          break;

        default:
          break;
      }
    }
  });
  return missingPermissions;
};

function parseAction(permissions, resource, action, id, displayName, identity) {
  const viewSummary = `${resource}.viewSummary`;
  const viewDetails = `${resource}.viewDetails`;
  const listPermissions = `${resource}.intent.listPermissions`;
  const grantPermission = `${resource}.intent.grantPermission`;
  const revokePermission = `${resource}.intent.revokePermission`;
  let missingPermissions = [];

  if (permissions[viewSummary] === undefined || !permissions[viewSummary].includes(identity)) {
    missingPermissions.push({ type: action, id, displayName, intent: viewSummary, identity });
  }
  if (permissions[viewDetails] === undefined || !permissions[viewDetails].includes(identity)) {
    missingPermissions.push({ type: action, id, displayName, intent: viewDetails, identity });
  }
  // Only check for listPermissions if identity has grant/revoke permissions
  if (
    (permissions[grantPermission].includes(identity) || permissions[revokePermission].includes(identity)) &&
    (permissions[listPermissions] === undefined || !permissions[listPermissions].includes(identity))
  ) {
    missingPermissions.push({ type: action, id, displayName, intent: listPermissions, identity });
  }
  return missingPermissions;
}

export function createActions(oldPermissions, newPermissions, project, subproject = {}, workflowitem = {}) {
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
    const sideEffectActions = getMissingViewPermissions(updatedPermissions, id, project, subproject, workflowitem);
    actions = actions.concat(sideEffectActions);
  });

  return actions;
}
