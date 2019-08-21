import { VError } from "verror";

import { Ctx } from "../../../lib/ctx";
import * as ProjectCreated from "../workflow/project_created";

export interface Info {
  ctx: Ctx;
  requestData: ProjectCreated.InitialData;
}

function mkMessage(info: Info, cause?: Error | string): string {
  const msg = `failed to create project`;
  if (cause === undefined || cause instanceof Error) {
    return msg;
  }
  return `${msg}: ${cause}`;
}

export class ProjectCreationFailed extends VError {
  constructor(info: Info, cause?: Error | string) {
    super(
      {
        name: "ProjectCreationFailed",
        cause: cause instanceof Error ? cause : undefined,
        info,
      },
      mkMessage(info, cause),
    );
  }
}
