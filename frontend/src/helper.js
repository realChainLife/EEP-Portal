import DoneIcon from "@material-ui/icons/Check";
import OpenIcon from "@material-ui/icons/Remove";
import accounting from "accounting";
import dayjs from "dayjs";
import { Iterable } from "immutable";
import _cloneDeep from "lodash/cloneDeep";
import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";
import _isString from "lodash/isString";
import _isUndefined from "lodash/isUndefined";
import React from "react";

import currencies from "./currency";
import strings from "./localizeStrings";

const numberFormat = {
  decimal: ".",
  thousand: ",",
  precision: 2
};

export const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;

  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(wrappedComponentProp[VALUE])
      ? wrappedComponentProp[VALUE].toJS()
      : wrappedComponentProp[VALUE];
    return newProps;
  }, {});

  return <WrappedComponent {...propsJS} />;
};

const getCurrencyFormat = currency => ({
  ...numberFormat,
  ...currencies[currency]
});

export const compareObjects = (items, itemToAdd) => {
  if (!_isEmpty(items)) {
    const itemToAddClone = _cloneDeep(itemToAdd);
    const originalItem = items.find(item => item.data.id === itemToAdd.id);
    if (originalItem) {
      const changes = {};
      for (const key of Object.keys(itemToAddClone)) {
        if (!_isEqual(originalItem.data[key], itemToAddClone[key])) {
          changes[key] = itemToAddClone[key];
        }
      }
      return changes;
    } else {
      return itemToAdd;
    }
  }
  return itemToAdd;
};

export const fromAmountString = (amount, currency) => {
  // Unformatting an empty string will result in an error
  // we use '' as default value for number fields to prevent users from an unerasable 0
  if (_isString(amount) && amount.trim().length <= 0) {
    return "";
  }
  return accounting.unformat(amount, getCurrencyFormat(currency).decimal);
};

export const getCurrencies = () => {
  return Object.keys(currencies).map(currency => {
    return {
      primaryText: currency,
      value: currency
    };
  });
};

export const toAmountString = (amount, currency) => {
  if (_isString(amount) && amount.trim().length <= 0) {
    return "";
  }
  if (!currency) {
    return accounting.formatNumber(amount, numberFormat.precision, numberFormat.thousand, numberFormat.decimal);
  }

  return accounting.formatMoney(amount, getCurrencyFormat(currency));
};

export const unixTsToString = ts => {
  let dateString = dayjs.unix(ts).format("MMM D, YYYY");
  return dateString;
};

export const statusMapping = status => {
  switch (status) {
    case "closed":
      return strings.common.closed;
    case "open":
      return strings.common.open;
    default:
      return "unknown";
  }
};

export const amountTypes = amountType => {
  switch (amountType) {
    case "N/A":
      return strings.workflow.workflow_budget_status_na;
    case "allocated":
      return strings.workflow.workflow_budget_status_allocated;
    case "disbursed":
      return strings.workflow.workflow_budget_status_disbursed;
    default:
      break;
  }
};

export const statusIconMapping = {
  closed: <DoneIcon />,
  open: <OpenIcon />
};

export const formatString = (text, ...args) => {
  return strings.formatString(text, ...args);
};

export const preselectCurrency = (parentCurrency, setCurrency) => {
  const preSelectedCurrency = _isUndefined(parentCurrency) ? "EUR" : parentCurrency;
  setCurrency(preSelectedCurrency);
};

export const formattedTag = tag => {
  return tag.toLowerCase().replace(/[\s#]/g, "");
};

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
    missingPermissions.push({ action, id, displayName, intent: viewSummary, identity });
  }
  if (permissions[viewDetails] === undefined || !permissions[viewDetails].includes(identity)) {
    missingPermissions.push({ action, id, displayName, intent: viewDetails, identity });
  }
  return missingPermissions;
}
export const shortenedDisplayName = displayName => {
  const maxLength = 50;
  if (displayName.length > maxLength) {
    return displayName.slice(0, maxLength) + "...";
  }
  return displayName;
};

export function makePermissionReadable(intent) {
  return strings.permissions[intent.replace(/[.]/g, "_")] || intent;
}
