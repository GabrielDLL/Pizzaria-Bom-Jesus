const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const path = require('path')
const {eCliente} = require("../helpers/eCliente")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/Pedido")
const Pedido = mongoose.model("pedidos")
const bcrypt = require('bcryptjs')
const passport = require("passport")

router.get("/",eCliente,(req,res)=>{
    Pedido.find({cliente: req.user.id}).sort({date: 'asc'}).lean().then(function(pedidos){
        res.render("area-clientes", {pedidos: pedidos})
    }).catch(function(err){
        //
        res.redirect("/admin");
    });
})

router.get("/login",(req,res)=>{
    res.render('login-clientes.ejs')
})

router.post("/login",(req,res,next)=>{
    
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        console.log("Deslogado com sucesso!")
        passport.authenticate("local",{
            successRedirect: "/clientes",
            failureRedirect: "/clientes/login",
            failureFlash: true
        })(req,res,next)
    })

    
})

router.get("/logout",eCliente,(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success_msg","Deslogado com sucesso!")
        res.redirect('/')
    })
    
})

router.get("/pedido",eCliente,(req,res)=>{
      res.render('pedidos-clientes.ejs')
})

router.post("/pedido",eCliente,(req,res)=>{
    const novoPedido = new Pedido({
        pizza: req.body.pizza,
        qtd: req.body.qtd,
        endereco: req.body.rua + ", " + req.body.numero + ", " + req.body.bairro,
        cliente: req.user.id,
        nome: req.user.nome,
     })
        novoPedido.save()
        res.redirect('/clientes')
})

router.get("/registro",(req,res)=>{
    res.render('registro-clientes.ejs', {erros: 0})
})

router.post("/registro",(req,res)=>{
    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.usuario || typeof req.body.usuario == undefined || req.body.usuario == null){
        erros.push({texto: "Usuário inválido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"})
    }
    
    if(req.body.senha.length < 4){
        erros.push({texto: "Senha muito curta"})
    }

    if(req.body.senha != req.body.senha2){
        erros.push({texto: "As senhas são diferentes, tente novamente!"})
    }

    if(erros.length > 0){
        console.log(erros)
        res.render('registro-clientes.ejs', {erros: erros})
    }else{
        // Procura geral
        Usuario.findOne({usuario: req.body.usuario}).lean().then((usuario)=>{
            if(usuario){
                req.flash("error_msg","Usuário já cadastrado")
                res.redirect("/clientes/registro")
            }else{
                 const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    usuario: req.body.usuario,
                    senha: req.body.senha,
                    tier: 0
                 })

                 bcrypt.genSalt(10,(erro,salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro,hash)=>{
                        if(erro){
                            res.redirect("/")
                        }
                        novoUsuario.senha = hash

                        novoUsuario.save().then(()=>{
                            res.redirect("/")
                        }).catch((err)=>{
                            //
                        })
                    })
                 })
            }
        }).catch((err) => {
            //
            res.redirect("/")
        })
    }
})


module.exports = router