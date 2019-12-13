const express = require("express");

const Projects = require("./projects-model.js");

const router = express.Router();

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

module.exports = router;
