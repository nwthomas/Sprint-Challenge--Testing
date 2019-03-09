exports.seed = function(knex, Promise) {
  return knex("games")
    .truncate()
    .then(function() {
      return knex("games").insert([
        { title: "Settlers of Catan", genre: "Family", releaseYear: 2010 },
        { title: "RISK", genre: "Family", releaseYear: 1987 },
        { title: "Poker", genre: "Card", releaseYear: 1879 },
        { title: "Camel Up", genre: "Family", releaseYear: 2007 },
        { title: "Monopoly", genre: "Party", releaseYear: 1964 },
        { title: "Colt Express", genre: "Party", releaseYear: 2013 }
      ]);
    });
};
