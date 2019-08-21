import Joi = require("joi");

import Intent, { projectIntents } from "../../../authz/intents";
import { Ctx } from "../../../lib/ctx";
import * as Result from "../../../result";
import { randomString } from "../../hash";
import * as AdditionalData from "../additional_data";
import { BusinessEvent } from "../business_event";
import { InvalidCommand } from "../errors/invalid_command";
import { NotAuthorized } from "../errors/not_authorized";
import { PreconditionError } from "../errors/precondition_error";
import { ServiceUser } from "../organization/service_user";
import { Permissions } from "../permissions";
import * as GlobalPermissions from "./global_permissions";
import * as Project from "./project";
import * as ProjectCreated from "./project_created";
import { ProjectedBudget, projectedBudgetListSchema } from "./projected_budget";
import { ProjectCreationFailed } from "../errors/invalid_fields";
import { AlreadyExists } from "../errors/already_exists/internal";

/**
 * Initial data for the new project as given in the request.
 *
 * Looks a lot like `InitialData` in the domain layer's `project_created.ts`, except
 * that there are more optional fields that get initialized using default values.
 */
export interface RequestData {
  id?: string;
  status?: "open" | "closed";
  displayName: string;
  description?: string;
  assignee?: string;
  thumbnail?: string;
  projectedBudgets?: ProjectedBudget[];
  additionalData?: AdditionalData.AdditionalData;
  tags?: string[];
}

interface Repository {
  getGlobalPermissions(): Promise<GlobalPermissions.GlobalPermissions>;
  projectExists(projectId: string): Promise<boolean>;
}

export async function createProject(
  ctx: Ctx,
  creatingUser: ServiceUser,
  data: RequestData,
  repository: Repository,
): Promise<Result.Type<BusinessEvent[]>> {
  const source = ctx.source;
  const publisher = creatingUser.id;
  const requestData = {
    id: data.id || randomString(),
    status: data.status || "open",
    displayName: data.displayName,
    description: data.description || "",
    assignee: data.assignee || creatingUser.id,
    thumbnail: data.thumbnail || "",
    projectedBudgets: data.projectedBudgets || [],
    permissions: newDefaultPermissionsFor(creatingUser),
    additionalData: data.additionalData || {},
    tags: data.tags || [],
  };
  const createEvent = ProjectCreated.createEvent(source, publisher, requestData);

  if (Result.isErr(createEvent)) {
    return new ProjectCreationFailed({ ctx, requestData }, createEvent);
  }

  // Make sure for each organization and currency there is only one entry:
  const badEntry = findDuplicateBudgetEntry(createEvent.project.projectedBudgets);
  if (badEntry !== undefined) {
    const error = new Error(
      `more than one projected budget for organization ${badEntry.organization} and currency ${
        badEntry.currencyCode
      }`,
    );
    return new ProjectCreationFailed({ ctx, requestData }, error);
  }

  if (await repository.projectExists(createEvent.project.id)) {
    return new AlreadyExists({ ctx, subject: "project" });
  }

  // Check authorization (if not root):
  if (creatingUser.id !== "root") {
    const intent = "global.createProject";
    const permissions = await repository.getGlobalPermissions();
    if (!GlobalPermissions.permits(permissions, creatingUser, [intent])) {
      const error = new NotAuthorized({
        ctx,
        userId: creatingUser.id,
        intent,
        target: permissions,
      });
      return new ProjectCreationFailed({ ctx, requestData }, error);
    }
  }

  // Check that the event is valid:
  const result = ProjectCreated.createFrom(ctx, createEvent);
  if (Result.isErr(result)) {
    const error = new InvalidCommand(ctx, createEvent, [result]);
    return new ProjectCreationFailed({ ctx, requestData }, error);
  }

  return [createEvent];
}

function newDefaultPermissionsFor(user: ServiceUser): Permissions {
  // The user can always do anything anyway:
  if (user.id === "root") return {};

  const intents: Intent[] = projectIntents;
  return intents.reduce((obj, intent) => ({ ...obj, [intent]: [user.id] }), {});
}

function findDuplicateBudgetEntry(
  projectedBudgets: ProjectedBudget[],
): { organization: string; currencyCode: string } | undefined {
  const budgetSet = new Set<string>();
  for (const { organization, currencyCode } of projectedBudgets) {
    const key = `${organization}_${currencyCode}`;
    if (budgetSet.has(key)) {
      return { organization, currencyCode };
    }
    budgetSet.add(key);
  }
}
