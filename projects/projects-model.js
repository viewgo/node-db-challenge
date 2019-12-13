const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  add,
  findAllTasks,
  findTaskById,
  findTasksByProjectId,
  addTask,
  updateProjectTask,
  findAllResources,
  findResourceById,
  findResourcesByProjectId,
  addResource
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

function addTask(task) {
  return db("tasks")
    .insert(task, "id")
    .then(([id]) => {
      return findTaskById(id);
    });
}

function updateProjectTask(project_id, task_id) {
  console.log(`updating with p_id: ${project_id} and t_id: ${task_id}`);
  return db("projects_tasks")
    .insert({ project_id, task_id })
    .then(project_task => {
      console.log(project_task);
    });
}

function findAllResources() {
  return db("resources");
}

function findResourceById(id) {
  return db("resources")
    .where({ id })
    .first();
}

function findResourcesByProjectId(id) {
  console.log(id);
  /*SELECT r.name, r.description, r.project_id
FROM resources as r
WHERE project_id = 1*/
  return db("resources as r")
    .select("r.name", "r.description", "r.project_id")
    .where("r.project_id", id);
}

function addResource(resource, projectId) {
  newResource = { ...resource, project_id: projectId };
  return db("resources")
    .insert(newResource, "id")
    .then(([id]) => {
      return findResourceById(id);
    });
}
