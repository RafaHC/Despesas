const passport = require("passport");
const DespesasDao = require('../Dao/DespesasDao');
const LoginDao = require('../Dao/LoginDao');

//https://developer.okta.com/blog/2018/11/15/node-express-typescript
module.exports = (app) => {
    app.get("/despesas/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
        
        DespesasDao.getDespesas(req.params.id)
            .then((recordsets) => {
                res.json(recordsets);
            }).catch(err => res.send(err))
    });
    app.post("/despesas", passport.authenticate('jwt', { session: false }), (req, res) => {
        DespesasDao.postDespesa(req.body)
            .then(() => {
                res.json(req.body);
            }).catch(err => res.send(err))
    });
    app.post("/user", (req, resp) => {
        LoginDao.verificarEmail(req.body.email)
            .then(() => {
                LoginDao.postUser(req.body)
                    .then(() => {
                        LoginDao.sendMail(req.body)
                            .then(() => resp.json(req.body))
                            .catch(err => console.log(err))
                    })
                    .catch(err => resp.send(err))
            }).catch(err => resp.send(err))
    });
    app.get('/', (req, resp) => {
        resp.send('funcionando');
    })

}