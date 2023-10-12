const { Users, Thoughts } = require('../models');

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
    

    // PUT route to update a thought by its _id


    // DELETE route to remove a thought by its _id


    // POST route to create a reaction stored in a single thought's reactions array field


    // DELETE route to *PULL* and remove a reaction by the reaction's reactionId value
}