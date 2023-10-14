const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    think,
    rethink,
    unthink,
    react,
    unreact
} = require('../../controllers/thoughtController')



module.exports = router;