const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile);

(async function connectToDB(retries = 5) {
    if (!retries) {
        throw new Error('Could not connect to DB');
    }
    try {
        await db.raw('select 1+1 as result');
    } catch (err) {
        console.error("Couldn't connect to DB:", { err });
        console.info(`Retries left: ${retries}`);
        await connectToDB(retries - 1);
    }
})();

module.exports = db;