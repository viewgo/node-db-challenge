exports.seed = function(knex, Promise) {
  return knex("resources").insert([
    {
      project_id: 1,
      name: "https://github.com/viewgo/node-db-challenge",
      description: "push here"
    },
    {
      project_id: 2,
      name: "Portfolio Checker Website",
      description: "it'll check your portfolio for you"
    }
  ]);
};
