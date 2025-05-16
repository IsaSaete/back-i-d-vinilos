import type { StatusCode } from "./types.js";

const statusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
} satisfies StatusCode;

export default statusCodes;
