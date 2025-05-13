import { NextFunction, Response } from "express";
import mongoose from "mongoose";
import { VinylRequest } from "../../../vinyl/controller/types.js";
import ServerError from "../../serverError/serverError.js";

const validateVinylId = async (
  req: VinylRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  const vinylId = req.params.vinylId;

  const isValidId = mongoose.isValidObjectId(vinylId);

  if (!isValidId) {
    const error = new ServerError(400, "Id not valid");

    next(error);

    return;
  }

  next();
};

export default validateVinylId;
