const db = require("../data/dbConfig.js");
const Games = require("./gamesModel.js");

describe("games model", () => {
  afterEach(async () => {
    await db("games").truncate();
  });

  describe("getAll()", () => {
    it("should retrieve all available games from the db", async () => {
      await Games.getAll();
      expect(Games).toBeDefined();
    });
  });

  describe("insert()", () => {
    it("should insert a new game into the db", async () => {
      const newGame = { title: "Nathan", genre: "isDone", releaseYear: 2019 };
      const insertedGame = await Games.insert(newGame);
      expect(insertedGame).toBeDefined();
    });
  });
});
