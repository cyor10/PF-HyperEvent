const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const { PORT } = process.env;

conn.sync({ force: false, alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`); // eslint-disable-line no-console
  });
});
