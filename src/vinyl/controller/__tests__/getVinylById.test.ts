import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import { VinylRequest, VinylResponse } from "../types.js";
import { inColour } from "../../fixtures.js";
import VinylController from "../VinylController.js";
import { VinylStructure } from "../../types.js";
import ServerError from "../../../server/serverError/serverError.js";
import statusCodes from "../../../globals/statusCode.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the getVinylById method of VinylController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with In Colour id", () => {
    const req: Pick<VinylRequest, "params"> = {
      params: { vinylId: inColour._id },
    };

    const vinylModel: Pick<Model<VinylStructure>, "findById"> = {
      findById: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(inColour) }),
    };

    test("Then it should call the received response's method with 200", async () => {
      const expectedStatus = 200;

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.getVinylById(
        req as VinylRequest,
        res as VinylResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the received response's method json with In Colour vinyl", async () => {
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.getVinylById(
        req as VinylRequest,
        res as VinylResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ vinyl: inColour });
    });
  });

  describe("When ut receives a request with 'f7b13e4c9a5d9a02e3b7218a' id that doesn't exist in the database", () => {
    const req: Pick<VinylRequest, "params"> = {
      params: { vinylId: "f7b13e4c9a5d9a02e3b7218a" },
    };

    const vinylModel: Pick<Model<VinylStructure>, "findById"> = {
      findById: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
    };
    test("Then it should call the next function with 404, 'This vinyl does not exist' message", async () => {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "This vinyl does not exist",
      );

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.getVinylById(
        req as VinylRequest,
        res as VinylResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
