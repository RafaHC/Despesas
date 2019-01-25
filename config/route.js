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
        req.assert('nome', 'Nome é obrigatório!').notEmpty();
        req.assert('valor', 'Formato invalido').isFloat();
        req.assert('userId', 'Id do Usuario é obrigatório!').notEmpty();
        let erros = req.validationErrors();

        if(erros){
            res.status(400).json(erros)    
            return;
        }
        DespesasDao.postDespesa(req.body)
            .then(() => {
                res.json(req.body);
            }).catch(err => res.send(err))
    });
    app.post("/user", (req, resp) => {
        req.assert('user', 'Usuario é obrigatório!').notEmpty();
        req.assert('senha', 'Senha é obrigatória').notEmpty();
        req.assert('email', 'Email é obrigatório!').notEmpty();
        let erros = req.validationErrors();

        if(erros){
            resp.status(400).json(erros)    
            return;
        }

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
    });
    app.delete("/despesas/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
        
        DespesasDao.deleteDespesa(req.params.id)
            .then((recordsets) => {
                res.json(recordsets);
            }).catch(err => res.send(err))
    });

}