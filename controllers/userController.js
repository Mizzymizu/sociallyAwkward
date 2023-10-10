const ObjectId = require('mongoose').Types;
const { Users, Thoughts } = require('../models');

const totalUser = async () => {
    const totalCount = await Users.aggregate()
        .count('userCount');
        return totalCount;
}

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await Users.find();
            const userObj = {
                users,
                totalUser: await totalUser()
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
}