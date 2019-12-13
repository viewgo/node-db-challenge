const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  add,
  findAllTasks,
  findTaskById,
  findTasksByProjectId,
  addTask
};

function find() {
  return db("projects");
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function add(project) {
  return db("projects")
    .insert(project, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function findAllTasks() {
  return db("tasks");
}

function findTaskById(id) {
  return db("tasks")
    .where({ id })
    .first();
}

function findTasksByProjectId(id) {
  console.log(id);
  /*SELECT t.id, t.description, t.notes, t.completed, p.id as project_id, p.name as project_name, p.description as project_description
FROM projects_tasks as pt
JOIN tasks as t ON pt.task_id = t.id
JOIN projects as p ON pt.project_id = p.id
WHERE pt.project_id = 2*/
  return db("projects_tasks as pt")
    .select(
      "t.id",
      "t.description",
      "t.notes",
      "t.completed",
      "p.id as project_id",
      "p.name as project_name",
      "p.description as project_description"
    )
    .join("tasks as t", "pt.task_id", "t.id")
    .join("projects as p", "pt.project_id", "p.id")
    .where("pt.project_id", id);
}

function addTask(task, projectId) {
  return db("tasks")
    .insert(task, "id")
    .then(([id]) => {
      const project_task = { project_id: projectId, task_id: id };
      console.log(project_task);
      console.log(db("projects_tasks").insert(project_task));
      return id;
    })
    .then(id => {
      return findTaskById(id);
    });
}
