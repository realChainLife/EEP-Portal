export const SHOW_WORKFLOW_CREATE = "SHOW_WORKFLOW_CREATE";
export const HIDE_WORKFLOW_DIALOG = "HIDE_WORKFLOW_DIALOG";

export const SHOW_WORKFLOW_PREVIEW = "SHOW_WORKFLOW_PREVIEW";
export const HIDE_WORKFLOW_PREVIEW = "HIDE_WORKFLOW_PREVIEW";

export const STORE_WORKFLOWACTIONS = "STORE_WORKFLOWACTIONS";

export const SET_WORKFLOW_DRAWER_PERMISSIONS = "SET_WORKFLOW_DRAWER_PERMISSIONS";

export const CLOSE_DRAWER = "CLOSE_DRAWER";

export const WORKFLOWITEMS_SELECTED = "WORKFLOWITEMS_SELECTED";

export const SHOW_WORKFLOW_EDIT = "SHOW_WORKFLOW_EDIT";

export const SUBMIT_BATCH_FOR_WORKFLOW = "SUBMIT_BATCH_FOR_WORKFLOW";
export const SUBMIT_BATCH_FOR_WORKFLOW_SUCCESS = "SUBMIT_BATCH_FOR_WORKFLOW_SUCCESS";
export const SUBMIT_BATCH_FOR_WORKFLOW_FAILURE = "SUBMIT_BATCH_FOR_WORKFLOW_FAILURE";

export const WORKFLOW_NAME = "WORKFLOW_NAME";
export const WORKFLOW_TYPE = "WORKFLOW_TYPE";
export const WORKFLOW_APPROVAL_REQUIRED = "WORKFLOW_APPROVAL_REQUIRED";
export const WORKFLOW_AMOUNT = "WORKFLOW_AMOUNT";
export const WORKFLOW_EXCHANGERATE = "WORKFLOW_EXCHANGERATE";
export const DEFAULT_WORKFLOW_EXCHANGERATE = "DEFAULT_WORKFLOW_EXCHANGERATE";

export const WORKFLOW_AMOUNT_TYPE = "WORKFLOW_AMOUNT_TYPE";
export const WORKFLOW_PURPOSE = "WORKFLOW_PURPOSE";
export const WORKFLOW_ADDITIONAL_DATA = "WORKFLOW_ADDITIONAL_DATA";
export const WORKFLOW_CURRENCY = "WORKFLOW_CURRENCY";
export const WORKFLOW_STATUS = "WORKFLOW_STATUS";
export const WORKFLOW_ASSIGNEE = "WORKFLOW_ASSIGNEE";
export const WORKFLOW_DOCUMENT = "WORKFLOW_DOCUMENT";
export const CREATE_WORKFLOW = "CREATE_WORKFLOW";
export const CREATE_WORKFLOW_SUCCESS = "CREATE_WORKFLOW_SUCCESS";
export const EDIT_WORKFLOW_ITEM = "EDIT_WORKFLOW_ITEM";
export const EDIT_WORKFLOW_ITEM_SUCCESS = "EDIT_WORKFLOW_ITEM_SUCCESS";
export const WORKFLOW_EDIT = "WORKFLOW_EDIT";
export const SHOW_WORKFLOW_DETAILS = "SHOW_WORKFLOW_DETAILS";
export const HIDE_WORKFLOW_DETAILS = "HIDE_WORKFLOW_DETAILS";
export const CLOSE_WORKFLOWITEM_DETAILS = "CLOSE_WORKFLOWITEM_DETAILS";

export const ENABLE_WORKFLOW_EDIT = "ENABLE_WORKFLOW_EDIT";
export const DISABLE_WORKFLOW_EDIT = "DISABLE_WORKFLOW_EDIT";

export const UPDATE_WORKFLOW_ORDER = "UPDATE_WORKFLOW_ORDER";

export const REORDER_WORKFLOW_ITEMS = "REORDER_WORKFLOW_ITEMS";
export const REORDER_WORKFLOW_ITEMS_SUCCESS = "REORDER_WORKFLOW_ITEMS_SUCCESS";

export const RESET_SUCCEEDED_WORKFLOWITEMS = "RESET_SUCCEEDED_WORKFLOWITEMS";

export const SUBPROJECT_AMOUNT = "SUBPROJECT_AMOUNT";
export const OPEN_HISTORY = "OPEN_HISTORY";
export const HIDE_HISTORY = "HIDE_HISTORY";
export const OPEN_HISTORY_SUCCESS = "OPEN_HISTORY_SUCCESS";

export const SET_TOTAL_SUBPROJECT_HISTORY_ITEM_COUNT = "SET_TOTAL_SUBPROJECT_HISTORY_ITEM_COUNT";
export const FETCH_NEXT_SUBPROJECT_HISTORY_PAGE = "FETCH_NEXT_SUBPROJECT_HISTORY_PAGE";
export const FETCH_NEXT_SUBPROJECT_HISTORY_PAGE_SUCCESS = "FETCH_NEXT_SUBPROJECT_HISTORY_PAGE_SUCCESS";

export const ENABLE_BUDGET_EDIT = "ENABLE_BUDGET_EDIT";
export const POST_SUBPROJECT_EDIT = "POST_SUBPROJECT_EDIT";
export const POST_SUBPROJECT_EDIT_SUCCESS = "POST_SUBPROJECT_EDIT_SUCCESS";

export const WORKFLOW_CREATION_STEP = "WORKFLOW_CREATION_STEP";

export const FETCH_ALL_SUBPROJECT_DETAILS = "FETCH_ALL_SUBPROJECT_DETAILS";
export const FETCH_ALL_SUBPROJECT_DETAILS_SUCCESS = "FETCH_ALL_SUBPROJECT_DETAILS_SUCCESS";

export const SHOW_WORKFLOWITEM_PERMISSIONS = "SHOW_WORKFLOWITEM_PERMISSIONS";
export const HIDE_WORKFLOWITEM_PERMISSIONS = "HIDE_WORKFLOWITEM_PERMISSIONS";

export const SHOW_WORKFLOWITEM_ADDITIONAL_DATA = "SHOW_WORKFLOWITEM_ADDITIONAL_DATA";
export const HIDE_WORKFLOWITEM_ADDITIONAL_DATA = "HIDE_WORKFLOWITEM_ADDITIONAL_DATA";

export const FETCH_WORKFLOWITEM_PERMISSIONS = "FETCH_WORKFLOWITEM_PERMISSIONS";
export const FETCH_WORKFLOWITEM_PERMISSIONS_SUCCESS = "FETCH_WORKFLOWITEM_PERMISSIONS_SUCCESS";

export const GRANT_WORKFLOWITEM_PERMISSION = "GRANT_WORKFLOWITEM_PERMISSION";
export const GRANT_WORKFLOWITEM_PERMISSION_SUCCESS = "GRANT_WORKFLOWITEM_PERMISSION_SUCCESS";

export const REVOKE_WORKFLOWITEM_PERMISSION = "REVOKE_WORKFLOWITEM_PERMISSION";
export const REVOKE_WORKFLOWITEM_PERMISSION_SUCCESS = "REVOKE_WORKFLOWITEM_PERMISSION_SUCCESS";

export const ASSIGN_WORKFLOWITEM = "ASSIGN_WORKFLOWITEM";
export const ASSIGN_WORKFLOWITEM_SUCCESS = "ASSIGN_WORKFLOWITEM_SUCCESS";

export const ASSIGN_SUBPROJECT = "ASSIGN_SUBPROJECT";
export const ASSIGN_SUBPROJECT_SUCCESS = "ASSIGN_SUBPROJECT_SUCCESS";

export const CLOSE_WORKFLOWITEM = "CLOSE_WORKFLOWITEM";
export const CLOSE_WORKFLOWITEM_SUCCESS = "CLOSE_WORKFLOWITEM_SUCCESS";

export const CLOSE_SUBPROJECT = "CLOSE_SUBPROJECT";
export const CLOSE_SUBPROJECT_SUCCESS = "CLOSE_SUBPROJECT_SUCCESS";

export const STORE_WORKFLOW_ASSIGNEE = "STORE_WORKFLOW_ASSIGNEE";

export const SHOW_SUBPROJECT_ASSIGNEES = "SHOW_SUBPROJECT_ASSIGNEES";
export const HIDE_SUBPROJECT_ASSIGNEES = "HIDE_SUBPROJECT_ASSIGNEES";

export const SAVE_WORKFLOW_ITEM_BEFORE_SORT = "SAVE_WORKFLOW_ITEM_BEFORE_SORT";
export const HAVE_WORKFLOW_ITEM_CHANGED = "HAVE_WORKFLOW_ITEM_CHANGED";

export const LIVE_UPDATE_SUBPROJECT = "LIVE_UPDATE_SUBPROJECT";

export const TRIGGER_SUBPROJECT_APPLY_ACTIONS = "TRIGGER_SUBPROJECT_APPLY_ACTIONS";
export const SHOW_SUBPROJECT_CONFIRMATION_DIALOG = "SHOW_SUBPROJECT_CONFIRMATION_DIALOG";
export const HIDE_SUBPROJECT_CONFIRMATION_DIALOG = "HIDE_SUBPROJECT_CONFIRMATION_DIALOG";

export const SHOW_WORKFLOWITEM_CONFIRMATION_DIALOG = "SHOW_WORKFLOWITEM_CONFIRMATION_DIALOG";
export const HIDE_WORKFLOWITEM_CONFIRMATION_DIALOG = "HIDE_WORKFLOWITEM_CONFIRMATION_DIALOG";
export const ADD_TEMPORARY_WORKFLOWITEM_PERMISSION = "ADD_TEMPORARY_WORKFLOWITEM_PERMISSION";
export const REMOVE_TEMPORARY_WORKFLOWITEM_PERMISSION = " REMOVE_TEMPORARY_WORKFLOWITEM_PERMISSION";

export function fetchAllSubprojectDetails(projectId, subprojectId, showLoading = false) {
  return {
    type: FETCH_ALL_SUBPROJECT_DETAILS,
    projectId,
    subprojectId,
    showLoading
  };
}

export function storePermissions(permissions) {
  return {
    type: SET_WORKFLOW_DRAWER_PERMISSIONS,
    permissions
  };
}

export function resetSucceededWorkflowitems() {
  return {
    type: RESET_SUCCEEDED_WORKFLOWITEMS
  };
}

export function setTotalHistoryItemCount(count) {
  return {
    type: SET_TOTAL_SUBPROJECT_HISTORY_ITEM_COUNT,
    count
  };
}

export function fetchNextSubprojectHistoryPage(projectId, subprojectId, showLoading = false) {
  return {
    type: FETCH_NEXT_SUBPROJECT_HISTORY_PAGE,
    projectId,
    subprojectId,
    showLoading
  };
}

export function showWorkflowItemPreview(projectId, resources, selectedAssignee, permissions) {
  return {
    type: SHOW_WORKFLOW_PREVIEW,
    projectId,
    ressources: resources,
    selectedAssignee,
    permissions
  };
}

export function hideWorkflowItemPreview() {
  return {
    type: HIDE_WORKFLOW_PREVIEW
  };
}

export function storeWorkflowItemsAssignee(assignee) {
  return {
    type: STORE_WORKFLOW_ASSIGNEE,
    assignee
  };
}

export function setCurrentStep(step) {
  return {
    type: WORKFLOW_CREATION_STEP,
    step
  };
}

export function showWorkflowDetails(id) {
  return {
    type: SHOW_WORKFLOW_DETAILS,
    id
  };
}

export function hideWorkflowDetails() {
  return {
    type: HIDE_WORKFLOW_DETAILS
  };
}

export function closeWorkflowitemDetailsDialog() {
  return {
    type: CLOSE_WORKFLOWITEM_DETAILS
  };
}

export function showSubProjectAssignee(assignee) {
  return {
    type: SHOW_SUBPROJECT_ASSIGNEES,
    assignee
  };
}

export function hideSubProjectAssignee() {
  return {
    type: HIDE_SUBPROJECT_ASSIGNEES
  };
}

export function showWorkflowItemPermissions(wId, wDisplayName) {
  return {
    type: SHOW_WORKFLOWITEM_PERMISSIONS,
    wId,
    wDisplayName
  };
}

export function hideWorkflowItemPermissions() {
  return {
    type: HIDE_WORKFLOWITEM_PERMISSIONS
  };
}

export function showWorkflowitemAdditionalData(wId) {
  return {
    type: SHOW_WORKFLOWITEM_ADDITIONAL_DATA,
    wId
  };
}

export function hideWorkflowitemAdditionalData() {
  return {
    type: HIDE_WORKFLOWITEM_ADDITIONAL_DATA
  };
}

export function fetchWorkflowItemPermissions(projectId, subprojectId, workflowitemId, showLoading = false) {
  return {
    type: FETCH_WORKFLOWITEM_PERMISSIONS,
    projectId,
    subprojectId,
    workflowitemId,
    showLoading
  };
}

export function grantWorkflowItemPermission(
  projectId,
  subprojectId,
  workflowitemId,
  intent,
  identity,
  showLoading = false
) {
  return {
    type: GRANT_WORKFLOWITEM_PERMISSION,
    projectId,
    subprojectId,
    workflowitemId,
    intent,
    identity,
    showLoading
  };
}
export function revokeWorkflowItemPermission(
  projectId,
  subprojectId,
  workflowitemId,
  intent,
  identity,
  showLoading = false
) {
  return {
    type: REVOKE_WORKFLOWITEM_PERMISSION,
    projectId,
    subprojectId,
    workflowitemId,
    intent,
    identity,
    showLoading
  };
}

export function assignWorkflowItem(
  projectId,
  projectDisplayName,
  subprojectId,
  subprojectDisplayName,
  workflowitemId,
  workflowitemDisplayName,
  assigneeId,
  assigneeDisplayName,
  showLoading = false
) {
  return {
    type: ASSIGN_WORKFLOWITEM,
    projectId,
    projectDisplayName,
    subprojectId,
    subprojectDisplayName,
    workflowitemId,
    workflowitemDisplayName,
    assigneeId,
    assigneeDisplayName,
    showLoading
  };
}

export function assignSubproject(
  projectId,
  projectDisplayName,
  subprojectId,
  subprojectDisplayName,
  assigneeId,
  assigneeDisplayName,
  showLoading = false
) {
  return {
    type: ASSIGN_SUBPROJECT,
    projectId,
    projectDisplayName,
    subprojectId,
    subprojectDisplayName,
    assigneeId,
    assigneeDisplayName,
    showLoading
  };
}

export function enableSubProjectBudgetEdit(budgetEditEnabled) {
  return {
    type: ENABLE_BUDGET_EDIT,
    budgetEditEnabled
  };
}

export function enableWorkflowEdit() {
  return {
    type: ENABLE_WORKFLOW_EDIT
  };
}
export function disableWorkflowEdit() {
  return {
    type: DISABLE_WORKFLOW_EDIT
  };
}
export function saveWorkflowItemsBeforeSort(workflowItems) {
  return {
    type: SAVE_WORKFLOW_ITEM_BEFORE_SORT,
    workflowItems
  };
}

export function reorderWorkflowItems(projectId, subprojectId, workflowItems) {
  // Just the keys are necessary to update the sort on the backend
  const ordering = [];
  workflowItems.map(item => ordering.push(item.data.id));
  return {
    type: REORDER_WORKFLOW_ITEMS,
    projectId,
    subprojectId,
    ordering
  };
}

export function updateWorkflowOrderOnState(workflowItems) {
  return {
    type: UPDATE_WORKFLOW_ORDER,
    workflowItems
  };
}

export function storeWorkflowActions(actions) {
  return {
    type: STORE_WORKFLOWACTIONS,
    actions
  };
}
export function showCreateDialog() {
  return {
    type: SHOW_WORKFLOW_CREATE
  };
}

export function hideWorkflowDialog() {
  return {
    type: HIDE_WORKFLOW_DIALOG
  };
}

export function showEditDialog(id, displayName, amount, exchangeRate, amountType, description, currency, documents) {
  return {
    type: SHOW_WORKFLOW_EDIT,
    id,
    displayName,
    amount,
    exchangeRate,
    amountType,
    description,
    currency,
    documents
  };
}

export function storeWorkflowName(name) {
  return {
    type: WORKFLOW_NAME,
    name: name
  };
}

export function storeWorkflowType(workflowType) {
  return {
    type: WORKFLOW_TYPE,
    workflowType
  };
}

export function storeWorkflowDocument(id, base64) {
  return {
    type: WORKFLOW_DOCUMENT,
    id: id,
    base64: base64
  };
}

export function isWorkflowApprovalRequired(approvalRequired) {
  return {
    type: WORKFLOW_APPROVAL_REQUIRED,
    approvalRequired
  };
}

export function storeWorkflowAmount(amount) {
  return {
    type: WORKFLOW_AMOUNT,
    amount
  };
}
export function storeWorkflowExchangeRate(exchangeRate) {
  return {
    type: WORKFLOW_EXCHANGERATE,
    exchangeRate
  };
}

export function defaultWorkflowExchangeRate() {
  return {
    type: DEFAULT_WORKFLOW_EXCHANGERATE
  };
}

export function storeWorkflowAmountType(amountType) {
  return {
    type: WORKFLOW_AMOUNT_TYPE,
    amountType
  };
}

export function storeWorkflowCurrency(currency) {
  return {
    type: WORKFLOW_CURRENCY,
    currency: currency
  };
}

export function storeWorkflowComment(description) {
  return {
    type: WORKFLOW_PURPOSE,
    description
  };
}

export function storeWorkflowStatus(status) {
  return {
    type: WORKFLOW_STATUS,
    status: status
  };
}
export function storeWorkflowItemsSelected(workflowItems) {
  return {
    type: WORKFLOWITEMS_SELECTED,
    workflowItems
  };
}

export function createWorkflowItem(
  projectId,
  subprojectId,
  displayName,
  amount,
  exchangeRate,
  amountType,
  currency,
  description,
  status,
  documents
) {
  return {
    type: CREATE_WORKFLOW,
    projectId,
    subprojectId,
    displayName,
    amount: `${amount}`,
    exchangeRate,
    amountType,
    currency,
    description,
    documents,
    status
  };
}

export function editWorkflowItem(projectId, subprojectId, workflowitemId, changes) {
  return {
    type: EDIT_WORKFLOW_ITEM,
    projectId,
    subprojectId,
    workflowitemId,
    changes
  };
}

export function submitBatchForWorkflow(projectId, subprojectId, actions, showLoading = true) {
  return {
    type: SUBMIT_BATCH_FOR_WORKFLOW,
    projectId,
    subprojectId,
    actions,
    showLoading
  };
}

export function postSubProjectEdit(parent, streamName, status, amount) {
  return {
    type: POST_SUBPROJECT_EDIT,
    parent,
    streamName,
    status,
    amount
  };
}

export function closeSubproject(projectId, subprojectId, showLoading = false) {
  return {
    type: CLOSE_SUBPROJECT,
    projectId,
    subprojectId,
    showLoading
  };
}
export function closeWorkflowItem(projectId, subprojectId, workflowitemId, showLoading = false) {
  return {
    type: CLOSE_WORKFLOWITEM,
    projectId,
    subprojectId,
    workflowitemId,
    showLoading
  };
}

export function liveUpdateSubproject(projectId, subprojectId) {
  return {
    type: LIVE_UPDATE_SUBPROJECT,
    projectId,
    subprojectId
  };
}

export function showHistory() {
  return {
    type: OPEN_HISTORY
  };
}
export function hideHistory() {
  return {
    type: HIDE_HISTORY
  };
}

export function triggerApplyActions() {
  return {
    type: TRIGGER_SUBPROJECT_APPLY_ACTIONS
  };
}

export function showSubprojectConfirmationDialog(actions, assignee, permittedToGrant = false) {
  return {
    type: SHOW_SUBPROJECT_CONFIRMATION_DIALOG,
    actions,
    assignee,
    permittedToGrant
  };
}
export function hideSubprojectConfirmationDialog(actions = [], assignee = "") {
  return {
    type: HIDE_SUBPROJECT_CONFIRMATION_DIALOG,
    actions,
    assignee
  };
}
export function showWorkflowitemConfirmationDialog(workflowitemId, actions, assignee, permittedToGrant = false) {
  return {
    type: SHOW_WORKFLOWITEM_CONFIRMATION_DIALOG,
    id: workflowitemId,
    actions,
    assignee,
    permittedToGrant
  };
}
export function hideWorkflowitemConfirmationDialog(actions = [], assignee = "") {
  return {
    type: HIDE_WORKFLOWITEM_CONFIRMATION_DIALOG,
    actions,
    assignee
  };
}

export function addTemporaryPermission(permission, userId) {
  return {
    type: ADD_TEMPORARY_WORKFLOWITEM_PERMISSION,
    permission,
    userId
  };
}

export function removeTemporaryPermission(permission, userId) {
  return {
    type: REMOVE_TEMPORARY_WORKFLOWITEM_PERMISSION,
    permission,
    userId
  };
}
