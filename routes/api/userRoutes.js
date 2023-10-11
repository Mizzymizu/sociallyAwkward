const router = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteFriend,
    addFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers);



module.exports = router;