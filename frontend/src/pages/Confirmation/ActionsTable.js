import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
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
    const { classes, actions } = this.props;
    let table = [];
    if (actions !== undefined) {
      table = this.addHeader(classes, table);
      table = this.addActions(classes, table, actions);
    }
    return (
      <div>
        <Table className={classes.table}>
          <TableBody className={classes.tableBody}>{table}</TableBody>
        </Table>
      </div>
    );
  }

  addHeader(classes, table) {
    table.push(
      <React.Fragment key={"wrapper"}>
        <TableRow className={classes.headerRow} key={"header"}>
          <TableCell className={classes.columnHeaderCell} style={{ flex: 3 }}>
            {strings.common.type}
          </TableCell>
          <TableCell className={classes.columnHeaderCell} style={{ flex: 5 }}>
            {strings.common.name}
          </TableCell>
          <TableCell className={classes.columnHeaderCell} style={{ flex: 6 }}>
            {strings.common.permission}
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
    return table;
  }

  addActions(classes, table, actions) {
    actions.forEach((action, index) => {
      const type = strings.common[action.intent.split(".")[0]];
      table.push(
        <TableRow className={classes.tableRow} key={index + "-" + action.displayName + "-" + action.intent}>
          <TableCell className={classes.tableCell} style={{ flex: 3 }}>
            {type}
          </TableCell>
          <TableCell className={classes.tableCell} style={{ flex: 5 }}>
            {action.displayName}
          </TableCell>
          <TableCell className={classes.tableCell} style={{ flex: 6 }}>
            {this.makePermissionReadable(action.intent)}
          </TableCell>
        </TableRow>
      );
    });
    return table;
  }

  makePermissionReadable(intent) {
    return strings.permissions[intent.replace(/[.]/g, "_")] || intent;
  }
}

export default withStyles(styles)(ActionsTable);
