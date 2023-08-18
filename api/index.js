const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const DB_PORT = process.env.DB_PORT;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(DB_PORT, () => {
    console.log(`Server listening at ${DB_PORT}`); // eslint-disable-line no-console
  });
});
