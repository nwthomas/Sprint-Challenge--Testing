exports.seed = function(knex, Promise) {
  return knex("games")
    .truncate()
    .then(function() {
      return knex("games").insert([
        { title: "Settlers of Catan" },
        { title: "RISK" },
        { title: "Poker" },
        { title: "Camel Up" },
        { title: "Monopoly" },
        { title: "Colt Express" }
      ]);
    });
};
