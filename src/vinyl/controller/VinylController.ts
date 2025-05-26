import { NextFunction } from "express";
import { Model } from "mongoose";
import {
  NewVinylRequest,
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
    const { vinylId } = req.params;

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
    req: NewVinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { vinyl: vinylData } = req.body;

    const vinylExists = await this.vinylModel
      .findOne({ title: vinylData.title })
      .exec();

    if (vinylExists) {
      const error = new ServerError(
        statusCodes.CONFLICT,
        "This vinyl already exists",
      );

      next(error);

      return;
    }

    const newVinyl = await this.vinylModel.insertOne(vinylData);

    res.status(statusCodes.CREATED).json({ vinyl: newVinyl });
  };

  public getVinylById = async (
    req: VinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { vinylId } = req.params;

    const foundVinyl = await this.vinylModel.findById(vinylId).exec();

    if (!foundVinyl) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "This vinyl does not exist",
      );

      next(error);

      return;
    }
    res.status(statusCodes.OK).json({ vinyl: foundVinyl });
  };

  public updateVinyl = async (
    req: VinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ): Promise<void> => {
    const { vinylId } = req.params;
    const { vinyl: vinylData } = req.body;

    const vinylFound = await this.vinylModel.findById(vinylId).exec();

    if (!vinylFound) {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "This vinyl does not exist",
      );

      next(error);

      return;
    }

    const updatedVinyl = await this.vinylModel
      .findOneAndReplace({ _id: vinylId }, vinylData, { new: true })
      .exec();

    res.status(statusCodes.OK).json({ vinyl: updatedVinyl! });
  };
}

export default VinylController;
