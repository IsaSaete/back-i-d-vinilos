import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Vinyl from "../../model/vinyl.js";
import { inColourNotOwned, marineroDeLuces } from "../../fixtures.js";
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

describe("Given the PATCH /vinyls/add-to-collection/:vinylId endpoint", () => {
  describe("When it receives a request with a In Colour id vinyl that isn`t in collection", () => {
    test("Then it should respond with a status code 200 and the In Colour vinyl in the collection", async () => {
      const expectedStatus = 200;

      await Vinyl.create(inColourNotOwned);

      const response = await request(app).patch(
        `/vinyls/add-to-collection/${inColourNotOwned._id}`,
      );
      const body = response.body as ResponseBodyVinyl;

      expect(response.status).toBe(expectedStatus);
      expect(body.vinyl.isOwned).toBe(true);
    });
  });

  describe("When it receives a request with Marinero de Luces with id not valid", () => {
    test("Then it should call the received with a 400 status code and 'Id not valid' error message", async () => {
      const vinylIdNotValid = marineroDeLuces._id;

      const response = await request(app).patch(
        `/vinyls/add-to-collection/${vinylIdNotValid}`,
      );

      const body = response.body as ResponsBodyError;

      expect(response.status).toBe(400);
      expect(body.error).toBe("Id not valid");
    });
  });
});
