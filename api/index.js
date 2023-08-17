const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const ENV_DEPLOY = process.env.ENV_DEPLOY || 'local';
const PORT = process.env.PORT || 3001;
const PORT_DEPLOY = process.env.PORT_DEPLOY;

const selectedPort = ENV_DEPLOY === 'local' ? PORT : PORT_DEPLOY

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(selectedPort, () => {
    if (ENV_DEPLOY === 'local') {
      console.log(`Server listening locally at ${selectedPort}`);
    } else {
      console.log('Server listening on hosting');
    }
  });
});
