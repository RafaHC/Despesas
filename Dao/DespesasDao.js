let connection = require('../config/database')();

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