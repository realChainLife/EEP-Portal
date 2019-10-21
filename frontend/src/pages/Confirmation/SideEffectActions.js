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
  let missingPermissions = [];

  if (permissions[viewSummary] === undefined || !permissions[viewSummary].includes(identity)) {
    missingPermissions.push({ type: action, id, displayName, intent: viewSummary, identity });
  }
  if (permissions[viewDetails] === undefined || !permissions[viewDetails].includes(identity)) {
    missingPermissions.push({ type: action, id, displayName, intent: viewDetails, identity });
  }
  return missingPermissions;
}
