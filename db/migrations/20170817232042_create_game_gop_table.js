exports.up = function(knex, Promise) {
  return knex.schema.createTable('games_goofspiel', function (table) {
    table.increments();
    table.integer('user1_id');
    table.integer('user2_id');
    table.json('state');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games_goofspiel');
};
