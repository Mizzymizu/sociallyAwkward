const connection = require('../config/connection');
const { Users, Thoughts } = require('../models');

connection.on('error', (err) => err);