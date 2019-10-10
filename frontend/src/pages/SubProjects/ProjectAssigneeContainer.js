import _isEmpty from "lodash/isEmpty";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toJS } from "../../helper";
import AssigneeSelection from "../Common/AssigneeSelection";
import { fetchProjectPermissions } from "../Overview/actions";
import { assignProject } from "./actions";

class ProjectAssigneeContainer extends Component {
  render() {
    const {
      assignee,
      users,
      disabled,
      projectId,
      projectDisplayName,
      permissions,
      fetchProjectPermissions,
      assignProject
    } = this.props;

    return (
      <React.Fragment>
        <AssigneeSelection
          assigneeId={assignee}
          users={users}
          disabled={disabled}
          assign={(assigneeId, assigneeDisplayName) =>
            assignProject(projectId, projectDisplayName, assigneeId, assigneeDisplayName)
          }
          onOpen={() => (_isEmpty(permissions.project) ? fetchProjectPermissions(projectId) : null)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    permissions: state.getIn(["detailview", "permissions"]),
    projectId: state.getIn(["detailview", "id"]),
    projectDisplayName: state.getIn(["detailview", "projectName"])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjectPermissions: pId => dispatch(fetchProjectPermissions(pId, true)),
    assignProject: (projectId, projectDisplayName, assigneeId, assigneeDisplayName) =>
      dispatch(assignProject(projectId, projectDisplayName, assigneeId, assigneeDisplayName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(ProjectAssigneeContainer));
