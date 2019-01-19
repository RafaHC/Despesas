//let connection = require('../config/database')();

var mysql = require('mysql');
let urlBd = process.env.CLEARDB_DATABASE_URL;
let user = urlBd.substring(8,22);
let password = urlBd.substring(23,31);
//create a connection
var db_config = {
	host:'us-cdbr-iron-east-01.cleardb.net',
	user: user,
	password: password,
	database:'heroku_97cf472f3f1b796'
};

	let connection = mysql.createConnection(db_config); // Recreate the connection, since


let DespesasDao = {
    getDespesas: (id) => {
      return new Promise((resolve, reject) => {
        let query = `SELECT b.id, a.nome, a.valor, a.id as despesaId from  despesas as a
                        INNER JOIN users as b on a.userId = b.id
                        WHERE a.userId = ${id}`;
        connection.query(query ,(err, data) => {
            if(err) {
                reject(err);
            }

            resolve(data)

        });
      })
    },
    postDespesa: (despesa) => {
        return new Promise((resolve, reject) => {
          let query = `INSERT INTO despesas (nome, valor, userId) 
                    VALUES ('${despesa.nome}',${despesa.valor},${despesa.userId})`;
          connection.query(query ,(err, data) => {
              if(err) {
                  reject(err);
              }
  
              resolve({message: 'Cadastrado com sucesso'})
  
          });
        })
      },

   
}

module.exports = DespesasDao;