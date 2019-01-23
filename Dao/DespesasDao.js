const Sequelize = require('sequelize');
const connection = require('../config/databaseConfig');
let DespesasDao = {
    getDespesas: (id) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT b.id, a.nome, a.valor, a.id as despesaId from  despesas 
        as a INNER JOIN users as b on a.userId = b.id
        WHERE a.userId = $userId`;
            connection.query(query,
                { bind: { userId: id }, type: Sequelize.QueryTypes.SELECT }
            ).then(recordsets => {
                resolve(recordsets);
            }).catch(err => reject(err))

        })
    },
    postDespesa: (despesa) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO despesas (nome, valor, userId) 
                    VALUES ($nome,$valor,$userId)`;
            connection.query(query,
                {
                    bind: { nome: despesa.nome, valor: despesa.valor, userId: despesa.userId },
                    type: Sequelize.QueryTypes.INSERT
                }
            ).then(recordsets => {
                resolve(recordsets);
            }).catch(err => reject(err))
        })
    },
}

module.exports = DespesasDao;