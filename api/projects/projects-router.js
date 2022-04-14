// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')

const {
    validateProjectsId,
    validateProject
} = require('./projects-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get()
        res.json(projects)
    } catch(err) {
        next(err)
    }
});

router.get('/:id', validateProjectsId, async(req, res, next) => {
    try{
        const project = await Projects.get(req.params.id);
        res.json(project)
    } catch(err) {
        next(err)
    }
})

router.post('/', validateProject, async(req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body)
        res.json(newProject)
    } catch(err) {
        next(err)
    }
})

module.exports = router