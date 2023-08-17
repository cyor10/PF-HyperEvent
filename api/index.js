const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const env = process.env.ENV_DEPLOY || 'local';

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    if (env === 'local') {
      console.log('Server listening locally at 3001');
    } else {
      console.log('Server listening on hosting');
    }
  });
});
