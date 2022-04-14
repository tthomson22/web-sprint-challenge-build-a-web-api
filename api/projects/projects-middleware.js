// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectsId(req, res, next){
    try {
        const project = await Projects.get(req.params.id)
        if(project){
            req.project = project
            next()
        } else {
            res.status(404).json({ message: 'project not found' })
        }
    } catch(err){
        next(err)
    }
}

module.exports = {
    validateProjectsId,
}