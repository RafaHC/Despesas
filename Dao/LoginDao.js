
const Sequelize = require('sequelize');
const connection = require('../config/databaseConfig');

const nodemailer = require('nodemailer');
// CONFIG DO  NODEMAILER
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rafaelhc103@gmail.com',
        pass: process.env.email_KEY.trim()
    },
    tls: {
        rejectUnauthorized: false
    }
});


let LoginDao = {
    getUsers: () => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * from  users`;
            connection.query(query,
                { type: Sequelize.QueryTypes.SELECT }
            ).then(recordsets => {
                resolve(recordsets);
            }).catch(err => reject(err))

        })
    },
    postUser: (user) => {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO USERS (user, senha, email) VALUES ($user,$senha,$email)`;
            connection.query(query,
                {
                    bind: { user: user.user, senha: user.senha, email: user.email },
                    type: Sequelize.QueryTypes.INSERT
                }
            ).then(recordsets => {
                resolve(recordsets);
            }).catch(err => reject(err))
        })
    },
    sendMail: (user) => {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: 'rafaelhc103@gmail.com',
                to: user.email,
                subject: 'Subject of your email', // Subject line
                html: `
                        <h1>Parabéns, Você criou sua conta
                        User: ${user.user}</h1>
                        
                        <p>Acompanhe nossas novidades</p>`
            };


            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve('Email sent: ' + info.response);
                }
            });
        })
    },
    verificarEmail: (email) => {
        return new Promise((resolve, reject) => {
            let query = `select email from users WHERE email=$email`;

            connection.query(query,
                { type: Sequelize.QueryTypes.SELECT, bind: {email: email} }
            ).then(recordsets => {
                resolve(recordsets);
            }).catch(err => reject(err))
        })
    }

}

module.exports = LoginDao;