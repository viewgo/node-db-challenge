exports.seed = function(knex, Promise) {
  return knex("tasks").insert([
    { description: "finish making seeds" },
    { description: "push to github" },
    { description: "finish portfolio first" },
  ]);
};
