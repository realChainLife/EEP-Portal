export type UserVisibleError = InvalidFields | NotAuthorized | AlreadyExists;

export interface ToUserFacingError {
  toUserFacingError(): UserVisibleError;
}
