import { Model } from "mongoose";
import { NextFunction, Response } from "express";
import { inColour, inColourNotOwned, marineroDeLuces } from "../../fixtures.js";
import { VinylStructure } from "../../types.js";
import { VinylRequest } from "../types.js";
import VinylController from "../VinylController.js";
import ServerError from "../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the addVinylToCollection method of VinylController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a In Colour id vinyl that isn`t in collection", () => {
    const req: Pick<VinylRequest, "params"> = {
      params: { vinylId: inColourNotOwned._id },
    };

    const vinylModel: Pick<Model<VinylStructure>, "findByIdAndUpdate"> = {
      findByIdAndUpdate: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(inColour) }),
    };

    test("Then is should call the received response's method status with 200", async () => {
      const expectedStatus = 200;

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.addVinylToCollection(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should return In Colour vinyl in the collection", async () => {
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.addVinylToCollection(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ vinyl: inColour });
    });
  });

  describe("When it receives a request with Marinero de luces id that is not valid", () => {
    const req: Pick<VinylRequest, "params"> = {
      params: { vinylId: marineroDeLuces._id },
    };

    const vinylModel: Pick<Model<VinylStructure>, "findByIdAndUpdate"> = {
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the received next method with 400, 'Id not valid' error", async () => {
      const error = new ServerError(400, "Id not valid");

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.addVinylToCollection(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
