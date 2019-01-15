let connection = require('../config/database')();
const nodemailer = require('nodemailer');

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
    sentEmail: (email) => {
        const mailOptions = {
            from: 'rafaelhc103@gmail.com',
            to: email,
            subject: 'Subject of your email', // Subject line
            html: '<p>Your html Deu certo Mano</p>'// plain text body
        };
        
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log('error: ' + error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        
  }
}

module.exports = LoginDao;