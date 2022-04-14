// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get()
        res.json(projects)
    } catch(err) {
        next(err)
    }
});

module.exports = router