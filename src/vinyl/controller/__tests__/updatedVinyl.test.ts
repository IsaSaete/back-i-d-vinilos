import { Model } from "mongoose";
import { NextFunction, Response } from "express";
import { newSpiritOfEden, spiritOfEden } from "../../fixtures.js";
import { dileAlSol, spiritOfEdenData } from "../../fixturesDto.js";
import { VinylRequest, VinylResponse } from "../types.js";
import { VinylStructure } from "../../types.js";
import VinylController from "../VinylController.js";
import statusCodes from "../../../globals/statusCode.js";
import ServerError from "../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the updateVinyl method of VinylController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives an Spirit of Eden vinyl new data and its id", () => {
    const req: Pick<VinylRequest, "params" | "body"> = {
      params: { vinylId: spiritOfEden._id },
      body: { vinyl: spiritOfEdenData },
    };

    const vinylModel: Pick<Model<VinylStructure>, "findOneAndUpdate"> = {
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(newSpiritOfEden),
      }),
    };

    test("Then it should call the received response's method status with 200", async () => {
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.updateVinyl(
        req as VinylRequest,
        res as VinylResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(statusCodes.OK);
    });

    test("Then it should call the respons'e method json with Spirit of Eden vinyl updated", async () => {
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.updateVinyl(
        req as VinylRequest,
        res as VinylResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ vinyl: newSpiritOfEden });
    });
  });

  describe("When it receives the id and data of the vinyl 'Dile al Sol' that doesn't exist", () => {
    const req: Pick<VinylRequest, "params" | "body"> = {
      params: { vinylId: "e5b2a74c1a6d9c05e3b7690b" },
      body: { vinyl: dileAlSol },
    };

    const vinylModel: Pick<Model<VinylStructure>, "findOneAndUpdate"> = {
      findOneAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the next function with 404, 'This vinyl does not exist'", async () => {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "This vinyl does not exist",
      );

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.updateVinyl(
        req as VinylRequest,
        res as VinylResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
