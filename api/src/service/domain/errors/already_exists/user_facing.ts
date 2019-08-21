type SubjectType = "project" | "subproject" | "workflowitem" | "user" | "group";

export interface UserFacingError {
  type: "ALREADY_EXISTS";
  subject: SubjectType;
}
