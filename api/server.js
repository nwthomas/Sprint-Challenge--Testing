const express = require("express");

const Games = require("../games/gamesModel.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/games", async (req, res) => {
  try {
    const games = await Games.getAll();
    res
      .status(200)
      .json({
        message:
          "The games array was retrieved from the database successfully.",
        games
      });
  } catch (users) {
    res
      .status(500)
      .json({
        message: "There was an error processing your request.",
        error: true
      });
  }
});

module.exports = server;
