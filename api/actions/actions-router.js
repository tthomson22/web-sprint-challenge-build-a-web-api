// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.json(actions)
    } catch(err) {
        next(err)
    }
});

module.exports = router