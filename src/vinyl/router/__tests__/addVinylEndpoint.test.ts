import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import statusCodes from "../../../globals/statusCode.js";
import Vinyl from "../../model/vinyl.js";
import { leftism, leftismVinyl } from "../../fixtures.js";
import app from "../../../server/app.js";
import { VinylBodyResponse } from "../../controller/types.js";
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

describe("Given the POST /vinyls endpoint", () => {
  describe("When it receives a request with Leftism new vinyl data", () => {
    test("Then it should respond with a 201 status code and Leftism vinyl", async () => {
      const expectedStatus = statusCodes.CREATED;

      const response = await request(app)
        .post(`/vinyls`)
        .send({ vinyl: leftism });

      const body = (await response).body as VinylBodyResponse;

      expect(response.status).toBe(expectedStatus);
      expect(body.vinyl.title).toBe("Leftism");
    });
  });

  describe("When it receives a request with Leftism vinyl daya ant this vinyl already exists", () => {
    test("Then it should respond with a 409 status code and 'This vinyl already exists' message", async () => {
      const expectedStatus = statusCodes.CONFLICT;
      const expectedErrorMessage = "This vinyl already exists";

      await Vinyl.create(leftismVinyl);

      const response = await request(app)
        .post(`/vinyls`)
        .send({ vinyl: leftism });

      const body = (await response).body as ResponsBodyError;

      expect(response.status).toBe(expectedStatus);
      expect(body.error).toBe(expectedErrorMessage);
    });
  });
});
