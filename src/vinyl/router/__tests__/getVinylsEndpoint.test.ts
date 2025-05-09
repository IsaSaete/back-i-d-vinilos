import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Vinyl from "../../model/vinyl.js";
import { mentalGroove, silentShout } from "../../fixturesDto.js";
import app from "../../../server/app.js";
import { GetVinylsResponseBody } from "../../types.js";

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

beforeEach(async () => {
  await Vinyl.deleteMany();
});

describe("Given the GET /vinyls endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status code 200", async () => {
      const expectedStatus = 200;

      await Vinyl.create(silentShout, mentalGroove);

      const response = await request(app).get("/vinyls");

      expect(response.status).toBe(expectedStatus);
    });

    test("Then it should respond with a total of 2 vinyls, Silen Shout & Mental Groove.", async () => {
      const newVinyls = await Vinyl.create(silentShout, mentalGroove);

      const expectedVinylsTotal = newVinyls.length;

      const response = await request(app).get("/vinyls");
      const body = response.body as GetVinylsResponseBody;

      expect(body.vinylsTotal).toBe(expectedVinylsTotal);

      expect(body.vinyls).toContainEqual(
        expect.objectContaining({ title: silentShout.title }),
      );

      expect(body.vinyls).toContainEqual(
        expect.objectContaining({ title: mentalGroove.title }),
      );
    });
  });
});
