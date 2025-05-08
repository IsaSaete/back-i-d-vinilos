import { Response } from "express";
import { VinylRequest } from "../types.js";
import { Model } from "mongoose";
import { VinylStructure } from "../../types.js";
import { vinylsFixtures } from "../../fixtures.js";
import VinylController from "../VinylController.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given the getVinylsPage method of VinylController", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a response", () => {
    const req: Pick<VinylRequest, "query"> = { query: { page: "" } };

    const vinylModel: Pick<Model<VinylStructure>, "find" | "countDocuments"> = {
      find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(vinylsFixtures.slice(0, 6)),
            }),
          }),
        }),
      }),
      countDocuments: jest.fn().mockResolvedValue(vinylsFixtures.length),
    };

    test("Then it should call the response's mehtod with a status 200", async () => {
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.getVinylsPage(req as VinylRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test("Then it should call the response's method json with 6 vinyls", async () => {
      const expectedVinylsByPage = vinylsFixtures.slice(0, 6);

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.getVinylsPage(req as VinylRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ vinyls: expectedVinylsByPage }),
      );
    });

    test("Then it should call the response's method json  with 10 as a total number of vinyls", async () => {
      const expectedVinylsTotal = vinylsFixtures.length;
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.getVinylsPage(req as VinylRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ vinylsTotal: expectedVinylsTotal }),
      );
    });
  });

  describe("When it receives a request with a page 2", () => {
    const pageNumber = 2;

    const req: Pick<VinylRequest, "query"> = {
      query: { page: pageNumber.toString() },
    };

    const vinylModel: Pick<Model<VinylStructure>, "find" | "countDocuments"> = {
      find: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest
                .fn()
                .mockResolvedValue(vinylsFixtures.sort().slice(6, 12)),
            }),
          }),
        }),
      }),
      countDocuments: jest.fn().mockResolvedValue(vinylsFixtures.length),
    };

    test("Then it should call the response's method json from vinyl 7 to 11", async () => {
      const expectedVinylsPage2 = vinylsFixtures.slice(6, 12);
      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.getVinylsPage(req as VinylRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ vinyls: expectedVinylsPage2 }),
      );
    });
  });
});
