import { Request, Response } from "express";
import ServerError from "../../serverError/serverError.js";
import handleErrors from "./handleErrors.js";
import statusCodes from "../../../globals/statusCode.js";

describe("Given the handleErrors middleware", () => {
  const req = {} as Request;
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("When it receives a response and a '404, Endpoint not found' error", () => {
    const error = new ServerError(404, "Endpoint not found");

    test("Then it should call the response's method status with 404", () => {
      handleErrors(error, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(error.statusCode);
    });

    test("Then it should call the response's method json with an 'Endpoint not found' error message", () => {
      handleErrors(error, req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("When it receives a response without status code and 'Can't read properties of undefined' error Message", () => {
    const error = new Error("Can't read properties of undefined");

    test("Then it should call the response's method status with 500", () => {
      const expectedStatus = statusCodes.INTERNAL_SERVER_ERROR;

      handleErrors(error as ServerError, req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with an 'Internal Server Error' message", () => {
      const expectedErrorMessage = "Internal server error";

      handleErrors(error as ServerError, req, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });
});
