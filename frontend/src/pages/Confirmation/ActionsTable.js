import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import TBDIcon from "@material-ui/icons/Remove";
import React from "react";
import strings from "../../localizeStrings";

const styles = {
  table: {
    marginTop: "24px"
  },
  tableBody: {
    display: "flex",
    flexDirection: "column"
  },
  textRow: {
    display: "flex",
    height: "40px"
  },
  headerRow: {
    display: "flex",
    height: "40px"
  },
  headerCell: {
    fontSize: "16px",
    textAlign: "left",
    flex: "1",
    borderBottom: "unset",
    padding: "0px"
  },
  columnHeaderCell: {
    fontSize: "14px",
    fontWeight: "bold",
    alignSelf: "center",
    flex: "1",
    padding: "0px 0px 0px 8px"
  },
  tableRow: {
    display: "flex",
    height: "30px",
    borderBottom: "unset"
  },
  tableCell: {
    fontSize: "14px",
    borderBottom: "unset",
    padding: "0px 0px 0px 8px",
    flex: 1
  }
};
/**
 ** @actions Displayed by the table in following format
 **
 ** action: {
 **   displayName: string - Display Name of the project/subproject/workflowitem
 **   intent: string      - e.g. project.intent.listPermissions
 **
 **}
 */
class ActionsTable extends React.Component {
  render() {
    const { classes, actions, executedActions, executingActions } = this.props;
    let table = [];
    if (actions !== undefined) {
      table = this.addHeader(classes, table);
      table = this.addActions(classes, table, actions, executedActions);
    }
    return (
      <React.Fragment>
        <Card>
          <Table className={classes.table}>
            <TableBody className={classes.tableBody}>{table}</TableBody>
          </Table>
        </Card>
        {executingActions ? <LinearProgress color="primary" /> : null}
      </React.Fragment>
    );
  }

  addHeader(classes, table) {
    table.push(
      <React.Fragment key={"wrapper"}>
        <TableRow className={classes.headerRow} key={"header"}>
          <TableCell className={classes.columnHeaderCell} style={{ flex: 3 }}>
            {strings.common.type}
          </TableCell>
          <TableCell className={classes.columnHeaderCell} style={{ flex: 8 }}>
            {strings.common.name}
          </TableCell>
          <TableCell className={classes.columnHeaderCell} style={{ flex: 5 }}>
            {strings.common.permission}
          </TableCell>
          <TableCell className={classes.columnHeaderCell} style={{ flex: 3 }}>
            {strings.confirmation.user_group}
          </TableCell>
          <TableCell className={classes.columnHeaderCell} style={{ textAlign: "right" }}>
            {strings.common.status}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
    return table;
  }

  addActions(classes, table, actions, executedActions) {
    actions.forEach((action, index) => {
      const type = strings.common[action.intent.split(".")[0]];
      table.push(
        <TableRow className={classes.tableRow} key={index + "-" + action.displayName + "-" + action.intent}>
          <TableCell className={classes.tableCell} style={{ flex: 3 }}>
            {type}
          </TableCell>
          <TableCell className={classes.tableCell} style={{ flex: 8 }}>
            {action.displayName}
          </TableCell>
          <TableCell className={classes.tableCell} style={{ flex: 5 }}>
            {this.makePermissionReadable(action.intent)}
          </TableCell>
          <TableCell className={classes.tableCell} style={{ flex: 3 }}>
            {action.identity}
          </TableCell>
          <TableCell className={classes.tableCell} style={{ textAlign: "right", position: "relative", bottom: "4px" }}>
            {this.getStatusIcon(executedActions, {}, action)}
          </TableCell>
        </TableRow>
      );
    });
    return table;
  }

  getStatusIcon(executedActions, failedWorkflowItem, action) {
    if (
      executedActions === undefined ||
      (action.id === failedWorkflowItem.id &&
        action.identity === failedWorkflowItem.identity &&
        action.intent === failedWorkflowItem.intent)
    ) {
      return <ErrorIcon />;
    } else {
      if (
        executedActions.some(
          item => action.id === item.id && action.identity === item.identity && action.intent === item.intent
        )
      ) {
        return <DoneIcon />;
      } else {
        return <TBDIcon />;
      }
    }
  }

  makePermissionReadable(intent) {
    const splittedString = intent.split(".");
    return strings.intents[splittedString[splittedString.length - 1]] || splittedString[splittedString.length - 1];
  }
}

export default withStyles(styles)(ActionsTable);
