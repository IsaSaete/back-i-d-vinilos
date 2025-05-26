import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import statusCodes from "../../../globals/statusCode.js";
import app from "../../../server/app.js";
import { VinylBodyResponse } from "../../controller/types.js";
import { spiritOfEdenData } from "../../fixturesDto.js";
import Vinyl from "../../model/vinyl.js";
import { dileAlSol, spiritOfEden } from "../../fixtures.js";
import { ResponsBodyError } from "../../types.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();

  const mongoDbConnectionString = server.getUri();

  await connectToDatabase(mongoDbConnectionString);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given the PUT /vinyls/:id endpoint", () => {
  describe("When it receibes a request with Spirit of Eden vinyl new data and its id", () => {
    test("Then it should respond with a 200 status and Spirit of eden new data", async () => {
      const expectedStatus = statusCodes.OK;

      await Vinyl.create(spiritOfEden);

      const response = await request(app)
        .put(`/vinyls/${spiritOfEden._id}`)
        .send({ vinyl: spiritOfEdenData });

      const body = (await response).body as VinylBodyResponse;

      expect(response.status).toBe(expectedStatus);
      expect(body.vinyl).toEqual(
        expect.objectContaining({ title: "Spirit of Eden" }),
      );
    });

    describe("When it receives a request  with '12345' id not valid", () => {
      test("Then it should call the received with a 400 status code and 'Id not valid' error message", async () => {
        const invalidId = "12345";
        const expectedStatusCode = statusCodes.BAD_REQUEST;
        const expectedErrorMessage = "Id not valid";

        const response = await request(app).put(`/vinyls/${invalidId}`);

        const body = response.body as ResponsBodyError;

        expect(response.status).toBe(expectedStatusCode);
        expect(body.error).toBe(expectedErrorMessage);
      });
    });

    describe("When it receives a request with 12ab56789ee234fa789bc34 id that isn't exists and 'Dile al sol' vinyl data", () => {
      test("Then it should call the received with a 404 status code and 'This vinyl does not exist'", async () => {
        const falseId = "1d3b8c7e9b04f6c2e718a4b5";
        const expectedStatusCode = statusCodes.NOT_FOUND;
        const expectedErrorMessage = "This vinyl does not exist";

        const response = await request(app)
          .put(`/vinyls/${falseId}`)
          .send({ vinyl: dileAlSol });
        const body = response.body as ResponsBodyError;

        expect(response.status).toBe(expectedStatusCode);
        expect(body.error).toBe(expectedErrorMessage);
      });
    });
  });
});
