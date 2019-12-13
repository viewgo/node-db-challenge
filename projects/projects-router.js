const express = require("express");

const Projects = require("./projects-model.js");

const router = express.Router();

// ###PROJECTS###
router.get("/projects", (req, res) => {
  Projects.find()
    .then(projects => {
      projects.map(project => {
        if (project.completed === 1) {
          project.completed = true;
        } else {
          project.completed = false;
        }
      });
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to get projects" });
    });
});

router.get("/projects/:id", (req, res) => {
  const { id } = req.params;

  Projects.findById(id)
    .then(project => {
      if (project) {
        if (project.completed === 1) {
          project.completed = true;
        } else {
          project.completed = false;
        }
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to get project" });
    });
});

router.post("/projects", (req, res) => {
  const newProject = req.body;

  if (!newProject.name) {
    res.status(400).json({
      errorMessage: "Please provide a name for the project."
    });
  } else {
    Projects.add(newProject)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: "Failed to add project"
        });
      });
  }
});

// ###TASKS###
router.get("/tasks", (req, res) => {
  Projects.findAllTasks()
    .then(tasks => {
      tasks.map(task => {
        if (task.completed === 1) {
          task.completed = true;
        } else {
          task.completed = false;
        }
      });
      res.status(200).json(tasks);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to get tasks" });
    });
});

router.get("/tasks/:id", (req, res) => {
  const { id } = req.params;

  Projects.findTaskById(id)
    .then(task => {
      if (task) {
        if (task.completed === 1) {
          task.completed = true;
        } else {
          task.completed = false;
        }
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: "Could not find task with given id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to get task" });
    });
});

router.get("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;

  Projects.findTasksByProjectId(id)
    .then(tasks => {
      if (tasks.length) {
        tasks.map(task => {
          if (task.completed === 1) {
            task.completed = true;
          } else {
            task.completed = false;
          }
        });
        res.status(200).json(tasks);
      } else {
        res
          .status(404)
          .json({ errorMessage: "Could not find project with given id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to get tasks" });
    });
});

router.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const newTask = req.body;

  if (!newTask.description) {
    res.status(400).json({
      errorMessage: "Please provide a description for the task."
    });
  } else {
    Projects.addTask(newTask)
      .then(task => {
        res.status(201).json(task);
        Projects.updateProjectTask(id, task.id);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: "Failed to add task"
        });
      });
  }
});

// ###RESOURCES##//#endregion
router.get("/resources", (req, res) => {
  Projects.findAllResources()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to get resources" });
    });
});

router.get("/resources/:id", (req, res) => {
  const { id } = req.params;

  Projects.findResourceById(id)
    .then(resource => {
      if (resource) {
        res.status(200).json(resource);
      } else {
        res
          .status(404)
          .json({ message: "Could not find resource with given id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to get resource" });
    });
});

router.get("/projects/:id/resources", (req, res) => {
  const { id } = req.params;

  Projects.findResourcesByProjectId(id)
    .then(resources => {
      if (resources.length) {
        res.status(200).json(resources);
      } else {
        res
          .status(404)
          .json({ errorMessage: "Could not find resources with given id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Failed to get resources" });
    });
});

router.post("/projects/:id/resources", (req, res) => {
  const { id } = req.params;
  const newResource = req.body;

  if (!newResource.name) {
    res.status(400).json({
      errorMessage: "Please provide a name for the resource."
    });
  } else {
    Projects.addResource(newResource, id)
      .then(resource => {
        res.status(201).json(resource);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: "Failed to add resource"
        });
      });
  }
});

module.exports = router;
