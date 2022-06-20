// Carregando modulos
const express = require('express')
const app = express()
const central = require("./public/routes/central")
const clientes = require("./public/routes/clientes")
const funcionarios = require("./public/routes/funcionarios")
const entregadores = require("./public/routes/entregadores")

const path = require('path')
const mongoose = require('mongoose')
require("./public/models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require('bcryptjs')
const passport = require('passport')
require("./config/auth")(passport)
const db = require("./config/db")
const session = require("express-session")
const flash = require("connect-flash")
// Configurações
    
    // Sessão
        app.use(session({
            secret: "nodeapp",
            resave: true,
            saveUnitialized: true
        }));
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(flash())
    // Middleware
        app.use(function(req, res, next) {
            res.locals.success_msg = req.flash("success_msg");
            res.locals.error_msg = req.flash("error_msg");
            res.locals.error = req.flash("error");
            res.locals.user = req.user || null;
            next();
        }); 
    // Body Parser
        app.use(express.urlencoded({extended: true}));
        app.use(express.json())
    // Ejs
        app.set('view engine', 'ejs')
    // Mongoose
        mongoose.connect(db.mongoURI).then(function(){
            console.log("Conectado ao mongo!")
        }).catch(function(err){
            console.log("Falha ao se conectar ao mongo: "+ err)
        });
    // Public
         app.use(express.static(__dirname + '/public'))

         const adminFuncionario = new Usuario({
            nome: 'admin',
            usuario:'admin@funcionario',
            senha: 'admin',
            tier: 1
         })
         const adminEntregador = new Usuario({
            nome: 'admin',
            usuario:'admin@entregador',
            senha: 'admin',
            tier: 2
         })
        //  bcrypt.genSalt(10,(erro,salt) => {
        //     bcrypt.hash(adminFuncionario.senha, salt, (erro,hash)=>{
        //         adminFuncionario.senha = hash

        //         adminFuncionario.save()
        //     })
        //  })
        //  bcrypt.genSalt(10,(erro,salt) => {
        //     bcrypt.hash(adminEntregador.senha, salt, (erro,hash)=>{
        //         adminEntregador.senha = hash

        //         adminEntregador.save()
        //     })
        //  })

    app.use('/',central)
    app.use('/clientes',clientes)
    app.use('/funcionarios',funcionarios)
    app.use('/entregadores',entregadores)

const PORT = process.env.PORT || 8081
app.listen(PORT,function(){
    console.log("Servidor rodando!")
})