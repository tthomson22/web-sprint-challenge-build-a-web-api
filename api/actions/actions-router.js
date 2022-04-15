// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

const {
    validateActionsId,
    validateActionInput,
    validateActionUpdate
} = require('./actions-middlware')

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.json(actions)
    } catch(err) {
        next(err)
    }
});

router.get('/:id', validateActionsId, async(req, res, next) => {
    try{
        const actionId = await Actions.get(req.params.id)
        res.json(actionId)
    } catch(err) {
        next(err)
    }
})

router.post('/', validateActionInput, validateActionsId, async(req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body);
        res.json(newAction);
    } catch(err) {
        next(err)
    }
});

module.exports = router