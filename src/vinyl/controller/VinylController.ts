import { NextFunction } from "express";
import { Model } from "mongoose";
import {
  VinylControllerStructure,
  VinylRequest,
  VinylResponse,
  VinylsResponse,
} from "./types.js";
import { VinylStructure } from "../types.js";
import ServerError from "../../server/serverError/serverError.js";
import statusCodes from "../../globals/statusCode.js";

class VinylController implements VinylControllerStructure {
  constructor(private readonly vinylModel: Model<VinylStructure>) {}

  public getVinylsPage = async (
    req: VinylRequest,
    res: VinylsResponse,
  ): Promise<void> => {
    let page = req.query.page;

    if (!page) {
      page = "1";
    }

    const vinylsTotal = await this.vinylModel.countDocuments();

    const vinylsByPage = 6;
    const vinylsToSkip = (Number(page) - 1) * vinylsByPage;

    const vinyls = await this.vinylModel
      .find()
      .sort({ artist: 1 })
      .skip(vinylsToSkip)
      .limit(vinylsByPage)
      .exec();

    res.status(statusCodes.OK).json({ vinyls, vinylsTotal });
  };

  public toggleVinylOwner = async (
    req: VinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { vinylId } = req.params;

    const vinyl = await this.vinylModel.findById(vinylId).exec();

    if (!vinyl) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "This vinyl does not exist",
      );

      next(error);

      return;
    }

    const updateVinyl = await this.vinylModel
      .findByIdAndUpdate(vinylId, { isOwned: !vinyl.isOwned }, { new: true })
      .exec();

    res.status(statusCodes.OK).json({ vinyl: updateVinyl! });
  };

  public deleteVinyl = async (
    req: VinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ): Promise<void> => {
    const vinylId = req.params.vinylId;

    const deleteVinyl = await this.vinylModel
      .findOneAndDelete({ _id: vinylId })
      .exec();

    if (!deleteVinyl) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "This vinyl does not exist",
      );

      next(error);

      return;
    }

    res.status(statusCodes.OK).json({ vinyl: deleteVinyl });
  };

  public addVinyl = async (
    req: VinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { vinyl } = req.body;

    const vinylExists = await this.vinylModel
      .findOne({ title: vinyl.title })
      .exec();

    if (vinylExists) {
      const error = new ServerError(
        statusCodes.CONFLICT,
        "This vinyl already exists",
      );

      next(error);

      return;
    }

    const newVinyl = await this.vinylModel.insertOne(vinyl);

    res.status(statusCodes.CREATED).json({ vinyl: newVinyl });
  };
}

export default VinylController;
