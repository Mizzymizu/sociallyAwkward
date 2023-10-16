const connection = require('../config/connection');
const { Users, Thoughts } = require('../models');
const { getRandomUsername, getRandomThought, getRandomEmail } = require('../utils/data');

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

    // Add users to the users array
    for (let i = 0; i < 10; i++ ) {
        const usernames = getRandomUsername();
        const thoughts = getRandomThought();
        const email = getRandomEmail();

        const user = {
            usernames,
            email,
            thoughts
        }

        users.push(user);
    }

    await Users.collection.insertMany(users);

    const thoughts = [];

    for (let i = 0; i < 10; i++ ) {
        const thought = getRandomThought();

        const thoughtText ={
            ...thought
        }

        thoughts.push(thoughtText);
    }

    await Thoughts.collection.insertMany(thoughts);
})