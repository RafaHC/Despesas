
const passport = require("passport");
const DespesasDao = require('../Dao/DespesasDao');
const LoginDao = require('../Dao/LoginDao');
module.exports = (app) => {

    app.get("/despesas/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
        DespesasDao.getDespesas(req.params.id)
        .then((recordsets) => {
            res.json(recordsets);
        }).catch(err => res.send(err))
    });

    app.post("/despesas", passport.authenticate('jwt', { session: false }), (req, res) => {
        DespesasDao.postDespesa(req.body)
        .then((recordsets) => {
            res.json(req.body);
        }).catch(err => res.send(err))
    });
    app.post("/user", (req, res) => {
        LoginDao.postUser(req.body)
        .then((recordsets) => {
            LoginDao.sendMail(req.body)
            .then(() => res.json(req.body))
            .catch(err => console.log(err))
            
        })
        .catch(err => res.send(err))
    });

    app.get('/', (req, resp) => {
        resp.send('Funcionando')
    })

}