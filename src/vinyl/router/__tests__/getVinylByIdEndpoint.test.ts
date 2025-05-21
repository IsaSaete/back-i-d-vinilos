import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Vinyl from "../../model/vinyl.js";
import { inColour } from "../../fixtures.js";
import app from "../../../server/app.js";
import { ResponsBodyError, ResponseBodyVinyl } from "../../types.js";
import statusCodes from "../../../globals/statusCode.js";

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

describe("Given the GER /vinyls/:vinylId endpoint", () => {
  describe("When it receives a request with In Colour vinyl id", () => {
    test("Then it should respond with a 200 status code and In Colour vinyl", async () => {
      await Vinyl.create(inColour);

      const response = await request(app).get(`/vinyls/${inColour._id}`);
      const body = response.body as ResponseBodyVinyl;

      expect(response.status).toBe(200);
      expect(body.vinyl).toEqual(
        expect.objectContaining({ title: "In Colour" }),
      );
    });

    describe("When it receives a request with 2a1b5b7b9b04f6a2e654e4b2 id that isn't exists", () => {
      test("Then it should call the received with 404 status code and 'This vinyls doesn`t exist' error message", async () => {
        const falseId = "2a1b5b7b9b04f6a2e654e4b2";
        const expectedStatus = statusCodes.NOT_FOUND;
        const expectedErrorMessage = "This vinyl does not exist";

        const response = await request(app).get(`/vinyls/${falseId}`);
        const body = response.body as ResponsBodyError;

        expect(response.status).toBe(expectedStatus);
        expect(body.error).toBe(expectedErrorMessage);
      });
    });

    describe("When it receives a request with '12345' id not valid", () => {
      test("Then it should call the received with 400 status code and 'Id not valid' error message", async () => {
        const invalidId = "12345";
        const expectedStatusCode = statusCodes.BAD_REQUEST;
        const expectedErrorMessage = "Id not valid";

        const response = await request(app).get(`/vinyls/${invalidId}`);
        const body = response.body as ResponsBodyError;

        expect(response.status).toBe(expectedStatusCode);
        expect(body.error).toBe(expectedErrorMessage);
      });
    });
  });
});
