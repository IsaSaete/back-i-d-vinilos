import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import { VinylControllerStructure, VinylRequest } from "./types.js";
import { VinylStructure } from "../types.js";
import ServerError from "../../server/serverError/serverError.js";

class VinylController implements VinylControllerStructure {
  constructor(private readonly vinylModel: Model<VinylStructure>) {}

  public getVinylsPage = async (
    req: VinylRequest,
    res: Response,
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

  public addVinylToCollection = async (
    req: VinylRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const vinylId = req.params.vinylId;

    const vinyl = await this.vinylModel.findById(vinylId).exec();

    if (!vinyl) {
      const error = new ServerError(404, "This vinyl does not exist");

      next(error);

      return;
    }

    if (vinyl.isOwned) {
      const error = new ServerError(
        409,
        "This vinyl is already in the collection",
      );
      next(error);

      return;
    }

    const ownedVinyl = await this.vinylModel
      .findByIdAndUpdate(vinylId, { isOwned: "true" }, { new: true })
      .exec();

    res.status(200).json({ vinyl: ownedVinyl });
  };
}

export default VinylController;
