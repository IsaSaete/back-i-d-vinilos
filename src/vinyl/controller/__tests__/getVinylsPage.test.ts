import { Response } from "express";
import { Model } from "mongoose";
import { VinylRequest } from "../types.js";
import { VinylStructure } from "../../types.js";
import { vinylsFixtures } from "../../fixtures.js";
import VinylController from "../VinylController.js";

let vinyls = [...vinylsFixtures];

beforeEach(() => {
  jest.clearAllMocks();
  vinyls = [...vinylsFixtures];
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
              exec: jest.fn().mockResolvedValue(vinyls.slice(0, 6)),
            }),
          }),
        }),
      }),
      countDocuments: jest.fn().mockResolvedValue(vinyls.length),
    };

    test("Then it should call the response's mehtod with a status 200", async () => {
      const expectedStatus = 200;

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.getVinylsPage(req as VinylRequest, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with 6 vinyls", async () => {
      const expectedVinylsByPage = vinyls.slice(0, 6);

      const vinylController = new VinylController(
        vinylModel as Model<VinylStructure>,
      );

      await vinylController.getVinylsPage(req as VinylRequest, res as Response);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ vinyls: expectedVinylsByPage }),
      );
    });

    test("Then it should call the response's method json with 12 as a total number of vinyls", async () => {
      const expectedVinylsTotal = vinyls.length;

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
                .mockResolvedValue(
                  vinyls
                    .sort((vinylA: VinylStructure, vinylB: VinylStructure) =>
                      vinylA.artist.localeCompare(vinylB.artist),
                    )
                    .slice(6, 12),
                ),
            }),
          }),
        }),
      }),
      countDocuments: jest.fn().mockResolvedValue(vinyls.length),
    };

    test("Then it should call the response's method json from vinyl 7 to 12", async () => {
      const expectedVinylsPage2 = vinyls
        .sort((vinylA: VinylStructure, vinylB: VinylStructure) =>
          vinylA.artist.localeCompare(vinylB.artist),
        )
        .slice(6, 12);

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
