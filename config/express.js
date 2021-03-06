const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
let app = express();
let _ = require('lodash');
var passport = require("passport");
var passportJWT = require("passport-jwt");
const LoginDao = require('../Dao/LoginDao');
const expressValidator = require('express-validator');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

var jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = process.env.SECRET_KEY;

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {

    LoginDao.getUsers()
        .then((data) => {
            users = data;
            var user = _.find(users, (user) => {
                return user.id === jwt_payload.id;
            });
            if (user) {
                next(null, user);
            } else {
                next(null, false);
            }
        })

});

passport.use(strategy);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',  'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/login", (req, res) => {

    LoginDao.getUsers()
        .then((data) => {
            let users = data;
            if (req.body.user && req.body.senha) {
                var user = req.body.user;
                var password = req.body.senha;
            }

            var user = users[_.findIndex(users, { user: user.toLowerCase() })];
            if (!user) {
                res.status(200).json({ erro: true, message: "Usuario não encontrado!" });
            }

            if (user.senha === password) {

                var payload = { id: user.id };
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                let formataToken = `JWT ${token}`;
                        res.json({ id: user.id, token: formataToken, email: user.email });
            } else {
                res.status(200).json({ erro: true, message: "Senha Incorreta!" });
            }
        }).catch(err => res.status(500).send(err));
});

app.listen(process.env.PORT || 3000, () => console.log('Server Rodando'))

module.exports = app;
