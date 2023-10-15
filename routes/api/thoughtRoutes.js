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

// /api/thoughts
router.route('/').get(getThoughts).post(think);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(rethink).delete(unthink);

// /api/thought/:thoughtId/reaction
router.route('/thoughtId/reaction').post(react).delete(unreact);




module.exports = router;