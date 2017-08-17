exports.up = function(knex, Promise) {
  return knex.schema.createTable('queue', function (table) {
    table.increments();
    table.integer('player1_id');
    table.string('game_type');
    table.timestamp('time_joined');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('queue');
};
