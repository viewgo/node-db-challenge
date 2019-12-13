exports.up = function(knex) {
  return knex.schema

    .createTable("projects", tbl => {
      tbl.increments();

      tbl.string("name", 255).notNullable();
      tbl.string("description", 255);
      tbl.boolean("completed").defaultTo(0);
    })

    .createTable("tasks", tbl => {
      tbl.increments();

      tbl.string("description", 255).notNullable();
      tbl.string("notes", 255);
      tbl.boolean("completed").defaultTo(0);
    })

    .createTable("resources", tbl => {
      tbl.increments();

      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl.string("name", 255).notNullable();
      tbl.string("description", 255);
    })

    .createTable("projects_tasks", tbl => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("project");
      tbl
        .integer("task_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tasks");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("projects");
};
