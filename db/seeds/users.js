exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'User1', wins: 0, losses: 0}),
        knex('users').insert({name: 'User2', wins: 0, losses: 0}),
        knex('users').insert({name: 'User3', wins: 0, losses: 0}),
        knex('users').insert({name: 'User4', wins: 0, losses: 0})
      ]);
    });
};
