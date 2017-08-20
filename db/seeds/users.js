exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'User1'}),
        knex('users').insert({name: 'User2'})
      ]);
    });
};
