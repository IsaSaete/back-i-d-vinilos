import { NextFunction, Response } from "express";
import { VinylStructure } from "../../types.js";
import { Model } from "mongoose";
import {
  fromDeewee,
  fromDeeweeVinyl,
  leftism,
  leftismVinyl,
} from "../../fixtures.js";
import VinylController from "../VinylController.js";
import { VinylRequest, VinylResponse } from "../types.js";
import ServerError from "../../../server/serverError/serverError.js";
import statusCodes from "../../../globals/statusCode.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the addVinyl method", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a 'Leftism' vinyl Data", () => {
    const req: Pick<VinylRequest, "body"> = {
      body: { vinyl: leftismVinyl },
    };

    const vinylModel: Pick<Model<VinylStructure>, "findOne" | "insertOne"> = {
      findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
      insertOne: jest.fn().mockResolvedValue(leftism),
    };

    test("Then it should call the respone's method with 201", async () => {
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.addVinyl(
        req as VinylRequest,
        res as VinylResponse,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Then it should call the response's method json with Leftism vinyl", async () => {
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.addVinyl(
        req as VinylRequest,
        res as VinylResponse,
        next as NextFunction,
      );

      expect(res.json).toHaveBeenCalledWith({ vinyl: leftism });
    });
  });

  describe("When it receives a From Deewee vinyl Data that it's already exists", () => {
    const req: Pick<VinylRequest, "body"> = {
      body: { vinyl: fromDeeweeVinyl },
    };

    const vinylModel: Pick<Model<VinylStructure>, "findOne"> = {
      findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(fromDeewee),
      }),
    };

    test("Then it should call the next function with a code status 409 and a 'This vinyl already exists' message", async () => {
      const error = new ServerError(
        statusCodes.CONFLICT,
        "This vinyl already exists",
      );
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.addVinyl(
        req as VinylRequest,
        res as VinylResponse,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
