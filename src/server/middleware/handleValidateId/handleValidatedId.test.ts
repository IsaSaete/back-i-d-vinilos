import { NextFunction, Response } from "express";
import { VinylRequest } from "../../../vinyl/controller/types.js";
import { lp5, marineroDeLuces } from "../../../vinyl/fixtures.js";
import ServerError from "../../serverError/serverError.js";
import validateVinylId from "./handleValidateId.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the validatedId middleware", () => {
  const res = {} as Response;
  const next = jest.fn();

  describe("When it receives a request with Marinero de luces id that is not valid", () => {
    test("Then it should call the received next function with 400, 'Id not valid' error", async () => {
      const error = new ServerError(400, "Id not valid");

      const req: Pick<VinylRequest, "params"> = {
        params: { vinylId: marineroDeLuces._id },
      };

      await validateVinylId(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request with LP5 id vinyl that is valid", () => {
    test("Then it should call the received next function", async () => {
      const req: Pick<VinylRequest, "params"> = {
        params: { vinylId: lp5._id },
      };

      await validateVinylId(
        req as VinylRequest,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith();
    });
  });
});
