const ObjectId = require('mongoose').Types;
const { Users, Thoughts } = require('../models');
const { Reactions } = require('../models/Thoughts');

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
    // Get a single user by its _id and populated thought and friend data
    async getUserById(req, res) {
        try {
            const user = await Users.findOne({ _id: req.params.userId })
                .populate('thoughts')
                .populate('friends')
                .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'Uh oh, SpaghettiO! No user found with this id 8(' })
            }

            res.json({
                user
            })
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // Create a new user
    async createUser(req, res) {
        try {
            const user = await Users.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // Update a user by grabbing its _id
    async updateUser(req, res) {
        try {
            const user = Users.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                {runValidators: true, new: true}
            );

            if (!user) {
                return res.status(404).json({ message: 'Uh oh, SpaghettiO! No user found with this id 8(' })
            }

            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // Gasp! Delete a user by its _id
    async deleteUser(req, res) {
        try {
            const user = Users.findOneAndDelete({ _id:req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'Hah! You cant get rid of them that easily!'})
            }

            res.json({ message: 'Congrats, you destroyed another (social) life!' })
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    }
}