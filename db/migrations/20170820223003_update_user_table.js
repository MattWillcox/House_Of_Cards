
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('losses');
    table.dropColumn('wins');
  })
};

exports.down = function(knex, Promise) {
  return knex.scheme.table('users', function (table) {
    table.addColumn('losses');
    table.addColumn('wins');
  })
};
