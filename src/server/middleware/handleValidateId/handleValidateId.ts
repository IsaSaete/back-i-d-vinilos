import { NextFunction, Response } from "express";
import mongoose from "mongoose";
import { VinylRequest } from "../../../vinyl/controller/types.js";
import ServerError from "../../serverError/serverError.js";
import statusCodes from "../../../globals/statusCode.js";

const validateVinylId = async (
  req: VinylRequest,
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
