const { Thoughts, Users } = require('../models');

const allThoughts = async () => {
    const totalCount = await Thoughts.aggregate()
        .count('thoughtCount');
        return totalCount;
}

module.exports = {
    // GET route to get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            const thoughtObj = {
                thoughts,
                totalThoughts: await allThoughts()
            };

            res.json(thoughtObj);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // GET route to get a single thought by its _id
    async getThoughtById (req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
                .select('-__v');

                if (!thought) {
                    return res.statis(404).json({ message: 'Uh oh, SpaghettiO! No thought found with this id 8('})
                }

                res.json({ thought })
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // POST route to create a new thought (remember to push the created thought's _id to the associated user's thoughts array field)
    async think (req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // PUT route to update a thought by its _id
    async rethink (req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'You sure you thought this one out?' })
            }

            const user = await Users.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            )

            if (!user) {
                return res.status(404).json({ message: `Maybe this guy didn't think this one out...` })
            }

            res.json(user);
            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // DELETE route to remove a thought by its _id
    async unthink (req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'You sure you were the one that thought this one?' })
            }

            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(400).json(err)
        }
    },
    // POST route to create a reaction stored in a single thought's reactions array field
    async react (req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'You sure you wanna react to this one?' })
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json(err)
        }
    },
    // DELETE route to *PULL* and remove a reaction by the reaction's reactionId value
    async unreact (req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionsId: req.params.reactionId } } },
                { runValidations: true, new: true }
            );

            if(!thought) {
                return res.status(404).json({ message: 'You sure you reacted to the right thought?' })
            }

            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(400).json(err)
        }
    }
};