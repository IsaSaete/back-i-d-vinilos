import { Response } from "express";
import { Model } from "mongoose";
import { VinylControllerStructure, VinylRequest } from "./types.js";
import { VinylStructure } from "../types.js";

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
}

export default VinylController;
