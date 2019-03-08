const request = require("supertest");

const server = require("./server.js");

describe("server.js", () => {
  describe("GET /", () => {
    it("should set the testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });

    it('should return { api: "up" }', async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({ api: "up" });
    });
  });

  describe("GET /games", () => {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/games");
      expect(res.status).toBe(200);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/games");
      expect(res.type).toBe("application/json");
    });
  });
});
