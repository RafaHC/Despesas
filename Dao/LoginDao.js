let connection = require('../config/database')();

let LoginDao = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * from  users `
            connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data)

            });
        })
    },
    postUser: (user) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO USERS (user, senha) VALUES ('${user.user}','${user.senha}')`;
            connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data)

            });
        })
    },
    setToken: (id, token) => {
        return new Promise((resolve, reject) => {
            let query = `UPDATE users SET token =  '${token}' WHERE id = ${id}`
            connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve();

            });
        })
    }


}

module.exports = LoginDao;