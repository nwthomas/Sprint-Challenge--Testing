const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("./server.js");

describe("server.js", () => {
  afterEach(async () => {
    await db("games").truncate();
  });

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

  describe("POST /games", () => {
    it("should return an status code of 422 if the information sent is incomplete", async () => {
      const res = await request(server).post("/games");
      expect(res.status).toBe(422);
    });

    it("should return an status code of 200 if the information sent is complete", async () => {
      const newGame = { title: "Nate", genre: "isDone", releaseYear: 2019 };
      const res = await request(server)
        .post("/games")
        .send(newGame);
      expect(res.status).toBe(200);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/games");
      expect(res.type).toBe("application/json");
    });

    // Stretch goal of testing adding duplicate named game
    it("should throw an error if a duplicate named game insertion attempt is made", async () => {
      const newGame1 = { title: "Nathan", genre: "isDone", releaseYear: 2019 };
      const newGame2 = { title: "Nathan", genre: "Family", releaseYear: 2222 };
      const res1 = await request(server)
        .post("/games")
        .send(newGame1);
      const res2 = await request(server)
        .post("/games")
        .send(newGame2);
      expect(res2.status).toBe(405);
    });
  });
});
