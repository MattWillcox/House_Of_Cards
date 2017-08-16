exports.up = function(knex, Promise) {
  return knex.schema.createTable('archive', function (table) {
    table.increments();
    table.integer('player1_id');
    table.integer('player2_id');
    table.integer('winner');
    table.string('game_type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('archive');
};
