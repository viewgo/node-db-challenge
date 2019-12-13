const express = require("express");

const Projects = require("./projects-model.js");

const router = express.Router();

// ###PROJECTS###
router.get("/projects", (req, res) => {
  Projects.find()
    .then(projects => {
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
    Projects.addTask(newTask, id)
      .then(task => {
        res.status(201).json(task);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: "Failed to add task"
        });
      });
  }
});

module.exports = router;
