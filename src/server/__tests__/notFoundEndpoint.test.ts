import request from "supertest";
import app from "../app.js";

describe("Given the GET/invent endpoint doesn't exist", () => {
  describe("When it receives a request", () => {
    test("Then it should show a response with a 404 status code and 'Endpoint not found' message", async () => {
      const expectedStatus = 404;
      const expectedMessage = "Endpoint not found";

      const response = await request(app).get("/invent");

      const body = response.body as { error: string };

      expect(response.status).toBe(expectedStatus);
      expect(body.error).toBe(expectedMessage);
    });
  });
});
