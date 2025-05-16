import createDebug from "debug";
import ServerError from "../../serverError/serverError.js";
import { NextFunction, Request, Response } from "express";
import statusCodes from "../../../globals/statusCode.js";

const debug = createDebug("vinyls:server:error");

const handleErrors = (
  error: ServerError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  debug("Error", error.message);

  res.status(error.statusCode ?? statusCodes.INTERNAL_SERVER_ERROR).json({
    error:
      error instanceof ServerError ? error.message : "Internal server error",
  });
};

export default handleErrors;
