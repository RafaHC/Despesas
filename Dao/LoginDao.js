
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
                    bind: { user: user.user.toLowerCase(), senha: user.senha, email: user.email },
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
                if(recordsets.length == 0){
                    resolve(true)
                }else{
                    reject({erro: true, message: 'Este email ja esta sendo usado'})
                }
            }).catch(err => reject(err))
        })
    },
    verificarUser: (user) => {
        return new Promise((resolve, reject) => {
            let query = `select user from users WHERE user=$user`;
            connection.query(query,
                { type: Sequelize.QueryTypes.SELECT, bind: {user: user} }
            ).then(recordsets => {
                if(recordsets.length == 0){
                    resolve(true)
                }else{
                    reject({erro: true, message: 'Este usuario ja esta sendo usado'})
                }
            }).catch(err => reject(err))
        })
    },
    getUser: (user) => {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM users WHERE user = $user AND email=email;`;
            connection.query(query,
                { type: Sequelize.QueryTypes.SELECT, bind: {user: user.user, email:user.email} }
            ).then(recordsets => {
                resolve(recordsets)
            }).catch(err => reject(err))
        })
    },
    alterarSenha: (user) => {
        return new Promise((resolve, reject) => {
            module.exports.getUser(user)
            .then((response) => {
                if(response.data == 0){
                    reject({message: 'Usuario não encontrado'})
                }else{
                    let query = `UPDATE users SET senha=$senha WHERE id=$id`;
                    connection.query(query,
                        { type: Sequelize.QueryTypes.SELECT, bind: {id: response[0].id, senha: user.senha} }
                    ).then(recordsets => {
                        resolve({message: 'Senha Atualizada com sucesso!"'})
                    }).catch(err => reject(err))
                }
            }).catch(err => reject(err))
            
        })
    },
    emailNovaSenha: (user) => {
        return new Promise((resolve, reject) => {
            console.log('here1')
            const mailOptions = {
                from: 'rafaelhc103@gmail.com',
                to: user.email,
                subject: 'Alteração de senha', // Subject line
                html: `
                        <h1>Parabéns, Você alterou sua senha
                        User: ${user.senha}</h1>
                        
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

}

module.exports = LoginDao;