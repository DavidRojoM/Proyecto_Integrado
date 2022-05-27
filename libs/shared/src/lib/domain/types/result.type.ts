export type Result<Success, Error> =
  | { ok: true; value: Success }
  | { ok: false; error: Error };
