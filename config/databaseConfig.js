let Sequelize = require('sequelize');

let urlBd = process.env.CLEARDB_DATABASE_URL;
let user = urlBd.substring(8, 22);
let password = urlBd.substring(23, 31);

let connection = new Sequelize('heroku_97cf472f3f1b796', user, password, {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

connection.authenticate()
    .then(() => console.log('Conexao estabelecida'))
    .catch((err) => console.log("Ocorreu um erro " + err))
    .done();

  
  
module.exports = connection;