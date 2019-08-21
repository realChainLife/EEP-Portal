import { VError } from "verror";

import { Ctx } from "../../../lib/ctx";
import * as ProjectCreated from "../workflow/project_created";
import * as Joi from "joi";

export interface Info {
  ctx: Ctx;
}

function mkMessage(info: Info, cause: Joi.ValidationError): string {
  const msg = `invalid fields`;
  return `${msg}: ${cause}`;
}

export class InvalidFields extends VError {
  constructor(info: Info, cause: Joi.ValidationError) {
    super(
      {
        name: "InvalidFields",
        cause,
        info,
      },
      mkMessage(info, cause),
    );
  }
}
