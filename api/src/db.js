require('dotenv').config(); 
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;
const {getEvents, getTaxonomies} = require('./utils/loadDb')

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
    native: false,
  });
  

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Ticket, Event, User, Category, Countries, States, Cities, Comment, Replys } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.belongsToMany(Event, { through: "users_events" });
Event.belongsToMany(User, { through: "users_events" });
User.hasMany(Comment, {foreignKey: 'user_id'})
User.hasMany(Replys, {foreignKey: 'user_id'})
Comment.hasMany(Replys, {foreignKey: 'comment_id'})
Event.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Ticket);
Ticket.belongsTo(User);

Event.hasMany(Ticket)
Ticket.belongsTo(Event)

States.belongsTo(Countries, { foreignKey: 'country_id' });
Cities.belongsTo(States, { foreignKey: 'state_id' });

const initializeDatabase = async () => {
  await getTaxonomies(Category); // Cargar categorías
  await getEvents(Event); // Cargar eventos
}

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
  initializeDatabase // para importart la conexión { conn } = require('./db.js');
};
