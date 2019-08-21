import { AlreadyExists } from "./already_exists/user_facing";
export type UserVisibleError = AlreadyExists;

export interface ToUserFacingError {
  toUserFacingError(): UserVisibleError;
}
