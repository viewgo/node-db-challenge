exports.seed = function(knex, Promise) {
  return knex("projects").insert([
    {
      name: "Sprint Challenge",
      description: "Complete the challenge to move past week 2 of back-end."
    },
    { name: "Find a job", description: "You need one." }
  ]);
};
