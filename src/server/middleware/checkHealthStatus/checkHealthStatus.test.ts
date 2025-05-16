import { Request, Response } from "express";
import checkHealthStatus from "./checkHealthStatus.js";
import statusCodes from "../../../globals/statusCode.js";

describe("Given the checkHealthStatus middleware", () => {
  describe("When it receives a repsonse", () => {
    const req = {} as Request;
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Then it should call the received response method status with 200", () => {
      const expectedStatus = statusCodes.OK;

      checkHealthStatus(req, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the received response method status with a message 'pong'", () => {
      checkHealthStatus(req, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: "pong" });
    });
  });
});
