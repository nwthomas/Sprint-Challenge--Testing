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
    res.status(200).json({
      message: "The games array was retrieved from the database successfully.",
      games
    });
  } catch (users) {
    res.status(500).json({
      message: "There was an error processing your request.",
      error: true
    });
  }
});

server.post("/games", async (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre || !releaseYear) {
    res.status(422).json({
      message:
        "Please include a title, genre, and release year, and try again.",
      error: true
    });
  } else {
    try {
      const newGame = await Games.insert(req.body);
      if (newGame) {
        res.status(200).json({
          message: "The new game was created successfully.",
          game: newGame
        });
      } else {
        res.status(404).json({
          message: "There was an error creating the new game in the database."
        });
      }
    } catch (error) {
      res.status(405).json({
        message: "There was an error processing your request.",
        error: true
      });
    }
  }
});

module.exports = server;
