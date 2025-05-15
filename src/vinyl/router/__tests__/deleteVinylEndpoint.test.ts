import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import Vinyl from "../../model/vinyl.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import { spiritOfEden } from "../../fixtures.js";
import app from "../../../server/app.js";
import { ResponsBodyError, ResponseBodyVinyl } from "../../types.js";

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

describe("Given the DELETE /vinyls/:vinylId endpoint", () => {
  describe("When it receives a request with a Spirit of Eden id that exists", () => {
    test("Then it should respond with a 200 status code and Spirit of Eden vinyl", async () => {
      const expectedStatus = 200;

      await Vinyl.create(spiritOfEden);

      const response = await request(app).delete(`/vinyls/${spiritOfEden._id}`);
      const body = response.body as ResponseBodyVinyl;

      expect(response.status).toBe(expectedStatus);
      expect(body.vinyl).toEqual(
        expect.objectContaining({ title: "Spirit of Eden" }),
      );
    });

    describe("When it receives a request  with '12345' id not valid", () => {
      test("Then it should call the received with a 400 status code and 'Id not valid' error message", async () => {
        const invalidId = "12345";
        const expectedStatusCode = 400;
        const expectedErrorMessage = "Id not valid";

        const response = await request(app).delete(`/vinyls/${invalidId}`);
        const body = response.body as ResponsBodyError;

        expect(response.status).toBe(expectedStatusCode);
        expect(body.error).toBe(expectedErrorMessage);
      });
    });

    describe("When it receives a request with 1d3b8c7e9b04f6c2e718a4b5 id that isn't exists", () => {
      test("Then it should call the received with a 404 status code and 'This vinyl does not exist'", async () => {
        const falseId = "1d3b8c7e9b04f6c2e718a4b5";
        const expectedStatus = 404;
        const expectedErrorMessage = "This vinyl does not exist";

        const response = await request(app).delete(`/vinyls/${falseId}`);
        const body = response.body as ResponsBodyError;

        expect(response.status).toBe(expectedStatus);
        expect(body.error).toBe(expectedErrorMessage);
      });
    });
  });
});
