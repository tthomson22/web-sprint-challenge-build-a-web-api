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

module.exports = {
    validateActionsId,
}