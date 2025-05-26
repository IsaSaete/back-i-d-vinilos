import { NextFunction, Response } from "express";
import mongoose from "mongoose";
import { ValidateIdRequest } from "../../../vinyl/controller/types.js";
import ServerError from "../../serverError/serverError.js";
import statusCodes from "../../../globals/statusCode.js";

const validateVinylId = async (
  req: ValidateIdRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const { vinylId } = req.params;

  const isValidId = mongoose.isValidObjectId(vinylId);

  if (!isValidId) {
    const error = new ServerError(statusCodes.BAD_REQUEST, "Id not valid");

    next(error);

    return;
  }

  next();
};

export default validateVinylId;
