import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

const styles = {
  warning: {
    backgroundColor: "rgb(255, 165, 0, 0.7)",
    color: "black",
    borderStyle: "solid",
    borderRadius: "4px",
    borderColor: "orange",
    padding: "2px",
    textAlign: "center"
  }
};

class WarningTypography extends React.Component {
  render() {
    return <Typography style={styles.warning}>{this.props.text}</Typography>;
  }
}

export default withStyles(styles)(WarningTypography);
