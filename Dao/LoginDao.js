let connection = require('../config/database')();


const nodemailer = require('nodemailer');
// CONFIG DO  NODEMAILER
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'rafaelhc103@gmail.com',
      pass: process.env.email_KEY.trim()
    },
    tls:{
      rejectUnauthorized: false
    }
  });
  

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
            let query = `INSERT INTO USERS (user, senha, email) VALUES ('${user.user}','${user.senha}', '${user.email}')`;
            connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                }

                resolve(data)

            });
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
            
            
            transporter.sendMail(mailOptions, function(error, info){
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
        let query = `select email from users WHERE email='${email}'`;
        connection.query(query, (err, data) => {
            if (err) {
                reject(err);
            }
            if(data.length == 0){
                resolve(true);
            }else{
                reject({message: 'Este Email ja esta sendo usado'})
            }

        });
    })
  }

}

module.exports = LoginDao;