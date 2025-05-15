import { Model } from "mongoose";
import { NextFunction, Response } from "express";
import {
  fromDeewee,
  fromDeeweeNotOwned,
  inColour,
  inColourNotOwned,
} from "../../fixtures.js";
import { VinylStructure } from "../../types.js";
import { VinylRequest } from "../types.js";
import VinylController from "../VinylController.js";
import ServerError from "../../../server/serverError/serverError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the toggleVinylOwner method of VinylController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a In Colour id vinyl that isn`t in collection", () => {
    const req: Pick<VinylRequest, "params"> = {
      params: { vinylId: inColourNotOwned._id },
    };

    const vinylModel: Pick<
      Model<VinylStructure>,
      "findById" | "findByIdAndUpdate"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(inColourNotOwned),
      }),
      findByIdAndUpdate: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(inColour) }),
    };

    test("Then is should call the received response's method status with 200", async () => {
      const expectedStatus = 200;

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.toggleVinylOwner(
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

      await vinylController.toggleVinylOwner(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ vinyl: inColour });
    });
  });

  describe("When it receives a From Deewee id vinyl that is already in the collection", () => {
    const req: Pick<VinylRequest, "params"> = {
      params: { vinylId: fromDeewee._id },
    };

    const vinylModel: Pick<
      Model<VinylStructure>,
      "findById" | "findByIdAndUpdate"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(fromDeewee),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(fromDeeweeNotOwned),
      }),
    };

    test("Then it should return From Deewee vinyl that isn`t in collection'", async () => {
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );
      await vinylController.toggleVinylOwner(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );
      expect(res.json).toHaveBeenCalledWith({ vinyl: fromDeeweeNotOwned });
    });
  });

  describe("When it receives a f7b34a4c8a6d9c05e3b7218a id that is not exist", () => {
    const req: Pick<VinylRequest, "params"> = {
      params: { vinylId: "f7b34a4c8a6d9c05e3b7218a" },
    };

    const vinylModel: Pick<
      Model<VinylStructure>,
      "findById" | "findByIdAndUpdate"
    > = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    };

    test("Then it should call the received next method with 404, 'This vinyl does not exist'", async () => {
      const error = new ServerError(404, "This vinyl does not exist");

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );
      await vinylController.toggleVinylOwner(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
