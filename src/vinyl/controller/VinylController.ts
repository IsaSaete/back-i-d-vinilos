import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import {
  VinylControllerStructure,
  VinylRequest,
  VinylResponse,
} from "./types.js";
import { VinylStructure } from "../types.js";
import ServerError from "../../server/serverError/serverError.js";

class VinylController implements VinylControllerStructure {
  constructor(private readonly vinylModel: Model<VinylStructure>) {}

  public getVinylsPage = async (
    req: VinylRequest,
    res: VinylResponse,
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

    res.status(200).json({ vinyls, vinylsTotal });
  };

  public toggleVinylOwner = async (
    req: VinylRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { vinylId } = req.params;

    const vinyl = await this.vinylModel.findById(vinylId).exec();

    if (!vinyl) {
      const error = new ServerError(404, "This vinyl does not exist");

      next(error);

      return;
    }

    const updateVinyl = await this.vinylModel
      .findByIdAndUpdate(vinylId, { isOwned: !vinyl.isOwned }, { new: true })
      .exec();

    res.status(200).json({ vinyl: updateVinyl });
  };

  public deleteVinyl = async (
    req: VinylRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const vinylId = req.params.vinylId;

    const deleteVinyl = await this.vinylModel
      .findOneAndDelete({ _id: vinylId })
      .exec();

    if (!deleteVinyl) {
      const error = new ServerError(404, "This vinyl does not exist");

      next(error);

      return;
    }

    res.status(200).json({ vinyl: deleteVinyl });
  };
}

export default VinylController;
