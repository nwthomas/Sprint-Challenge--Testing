exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", tbl => {
    tbl.increments();
    tbl.string("title", 255).notNullable();
    tbl.unique("title", "uq_games_title");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};
