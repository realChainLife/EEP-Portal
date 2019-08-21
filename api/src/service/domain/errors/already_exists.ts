import { VError } from "verror";

import { Ctx } from "../../../lib/ctx";
import * as ProjectCreated from "../workflow/project_created";

type SubjectType = "project" | "subproject" | "workflowitem" | "user" | "group";

export interface UserFacingError {
  type: "ALREADY_EXISTS";
  subject: SubjectType;
}

export interface Info {
  ctx: Ctx;
  subject: SubjectType;
}

function mkMessage(info: Info, cause?: Error | string): string {
  const msg = `${info.subject} already exists`;
  if (cause === undefined || cause instanceof Error) {
    return msg;
  }
  return `${msg}: ${cause}`;
}

export class AlreadyExists extends VError {
  constructor(info: Info, cause?: Error | string) {
    super(
      {
        name: "AlreadyExists",
        cause: cause instanceof Error ? cause : undefined,
        info,
      },
      mkMessage(info, cause),
    );
  }

  public toUserFacingError(): UserFacingError {
    return {
      type: "ALREADY_EXISTS",
      subject: VError.info(this).subject,
    };
  }
}
