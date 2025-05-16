import { NextFunction, Response } from "express";
import { lp5 } from "../../fixtures.js";
import { VinylRequest } from "../types.js";
import { Model } from "mongoose";
import { VinylStructure } from "../../types.js";
import VinylController from "../VinylController.js";
import ServerError from "../../../server/serverError/serverError.js";
import statusCodes from "../../../globals/statusCode.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the deleteVinyl method", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with LP5 id", () => {
    const req: Pick<VinylRequest, "params"> = {
      params: { vinylId: lp5._id },
    };

    const vinylModel: Pick<Model<VinylStructure>, "findOneAndDelete"> = {
      findOneAndDelete: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(lp5) }),
    };
    test("Then it should call the received response's method status with 200", async () => {
      const expectedStatus = statusCodes.OK;

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.deleteVinyl(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the received response's method json with LP5 vinyl", async () => {
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.deleteVinyl(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ vinyl: lp5 });
    });
  });

  describe("When it receives a f7b34a4c8a2e9a05a2b8918a2 id that is not exist", () => {
    const req: Pick<VinylRequest, "params"> = {
      params: { vinylId: "7b34a4c8a2e9a05a2b8918a2" },
    };

    const vinylModel: Pick<Model<VinylStructure>, "findOneAndDelete"> = {
      findOneAndDelete: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
    };

    test("Then it should call the received next method with 404, 'This vinyl does not exist'", async () => {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "This vinyl does not exist",
      );

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.deleteVinyl(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
