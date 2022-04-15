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

router.put('/:id', validateActionsId, validateActionUpdate, async(req, res, next) => {
    try {
        const newActions = await Actions.update(req.params.id, req.passUpdate)
        res.json(newActions)
    } catch(err) {
        next(err)
    }
});

router.delete('/:id', validateActionsId, async(req, res, next) => {
    try {
        const deleter = await Actions.remove(req.params.id)
        res.json(deleter)
    } catch(err) {
        next(err)
    }
})

module.exports = router