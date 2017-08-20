
exports.up = function(knex, Promise) {
  return knex.schema.table('archive', function (table) {
    table.dropColumn('game_type');
  })
};

exports.down = function(knex, Promise) {
  return knex.scheme.table('archive', function (table) {
    table.addColumn('game_type');
  })
};
