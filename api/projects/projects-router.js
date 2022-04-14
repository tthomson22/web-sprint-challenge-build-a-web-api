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
});

router.post('/', validateProject, async(req, res, next) => {
    try {
        const newProject = await Projects.insert(req.body);
        res.json(newProject);
    } catch(err) {
        next(err)
    }
});

router.put('/:id', validateProjectsId, validateProject, async(req, res, next) => {
    try {
        const newProjects = await Projects.update(req.params.id, req.pass)
        res.json(newProjects)
    } catch(err) {
        next(err)
    }
});

router.delete('/:id', validateProjectsId, async(req, res, next) => {
    try {
        const deleter = await Projects.remove(req.params.id)
        res.json(deleter)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectsId, async(req, res, next) => {
    try {
        const getActions = await Projects.getProjectActions(req.params.id)
        res.json(getActions)
    } catch(err) {
        next(err)
    }
})

module.exports = router