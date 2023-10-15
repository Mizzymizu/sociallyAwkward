const connection = require('../config/connection');
const { Users, Thoughts } = require('../models');
const { getRandomUsername, getRandomThoughts } = require('../utils/data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    // Delete all databases if they exist
    let usersCheck = await connection.db.listCollections({ name: 'users' }).next();
    if (usersCheck.length) {
        await connection.db.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).next();
    if (thoughtsCheck.length) {
        await connection.db.dropCollection('thoughts');
    }

    // Create empty array to hold users
    const users = [];

    // Add students to the students array
    for (let i = 0; i < 20; i++ ) {
        const username = getRandomUsername();
        const thoughts = getRandomThought();

        const user = {
            username,
            thoughts
        }

        users.push(user);
    }

    await Users.collection.insertMany(users);

})