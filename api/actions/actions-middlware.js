// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionsId(req, res, next){
    try {
        const action = await Actions.get(req.params.id)
        if(action){
            req.action = action
            next()
        } else {
            res.status(404).json({ message: 'action not found' })
        }
    } catch(err){
        next(err)
    }
}

async function validateActionInput(req, res, next) {
    const { description, notes, project_id } = req.body
    try{
        if(description && notes && project_id){
            req.passInput = {project_id, description, notes}
            next()
        } else {
            next({ status:400, message: 'notes and description required' })
        }
    } catch(err) {
        next(err)
    }
}

async function validateActionUpdate(req, res, next) {
    const { description, notes, project_id, completed } = req.body
    try{
        if(description && notes && project_id && typeof completed === 'boolean'){
            req.passUpdate = {project_id, description, notes, completed}
            next()
        } else {
            next({ status:400, message: 'notes and description required' })
        }
    } catch(err) {
        next(err)
    }
}



module.exports = {
    validateActionsId,
    validateActionInput,
    validateActionUpdate
}