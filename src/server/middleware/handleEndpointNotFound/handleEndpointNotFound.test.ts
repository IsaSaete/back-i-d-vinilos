import { NextFunction, Request, Response } from "express";
import ServerError from "../../serverError/serverError.js";
import handleEndpointNotFound from "./handleEndpointNotFound.js";
import statusCodes from "../../../globals/statusCode.js";

describe("Given the handleEndpointNotFound middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the next function with a status code '404' and message 'Endpoint not found'", () => {
      const error = new ServerError(
        statusCodes.NOT_FOUND,
        "Endpoint not found",
      );

      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      handleEndpointNotFound(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: error.message,
        }),
      );
    });
  });
});
