import { VError } from "verror";

import Intent from "./authz/intents";
import { Ctx } from "./lib/ctx";
import logger from "./lib/logger";
import { InternalError } from "./service/domain/errors/internal_errors";
import { UserVisibleError } from "./service/domain/errors/user_facing_errors";

interface ErrorBody {
  apiVersion: "1.0";
  error: {
    intent: Intent;
    reason: UserVisibleError | string;
  };
}

export function toHttpError(ctx: Ctx, error: any): { code: number; body: ErrorBody } {
  if (error instanceof Error && (error as any).toUserFacingError !== undefined) {
    error = (error as any) as InternalError;
    return doToHttpError(ctx, error);
  } else {
    logger.fatal({ error }, "BUG: Caught a non-Error type");
    console.trace();
    return {
      code: 500,
      body: toErrorBody({ intent: ctx.intent!, reason: "Sorry, something went wrong :(" }),
    };
  }
}
function doToHttpError(ctx: Ctx, error: InternalError): { code: number; body: ErrorBody } {
  const selectedError = selectError(error);
  const httpStatusCode = mapErrorToHttpStatusCode(selectedError);
  const userFacingError = selectedError.toUserFacingError();
  return {
    code: httpStatusCode,
    body: toErrorBody({ intent: ctx.intent!, reason: userFacingError }),
  };
}

function selectError(error: InternalError): InternalError {
  // We select the outer-most error:
  if (error.name !== "Error" && error.name !== "VError") {
    return error;
  }
  const cause = VError.cause(error);
  if (cause === null) {
    return error;
  } else {
    return selectError(cause);
  }
}

function mapErrorToHttpStatusCode(error: InternalError): number {
  switch (error.name) {
    case "BadRequest":
    case "AuthenticationFailed":
      return 400;

    case "NotAuthorized":
      return 403;

    case "PreconditionError":
    case "AlreadyExists":
      return 409;

    case "ProjectCreationFailed":
      return 400;

    default:
      return 500;
  }
}

function toErrorBody({
  intent,
  reason,
}: {
  intent: Intent;
  reason: UserVisibleError | string;
}): ErrorBody {
  return {
    apiVersion: "1.0",
    error: {
      intent,
      reason,
    },
  };
}
