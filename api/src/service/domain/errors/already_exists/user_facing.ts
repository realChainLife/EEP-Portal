type SubjectType = "project" | "subproject" | "workflowitem" | "user" | "group";

export interface AlreadyExists {
  type: "ALREADY_EXISTS";
  subject: SubjectType;
}
