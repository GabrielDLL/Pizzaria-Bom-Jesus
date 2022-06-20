const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const path = require('path')
const {eFuncionario} = require("../helpers/eFuncionario")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/Pedido")
const Pedido = mongoose.model("pedidos")
const passport = require("passport")

router.get("/",eFuncionario,(req,res)=>{
   
    Pedido.find().sort({created_at: -1}).lean().then(function(pedidos){
        Usuario.find({tier: 2}).lean().then(function(entregadores){
            res.render("area-funcionarios", {pedidos: pedidos, user: req.user, entregadores: entregadores})
        })
    }).catch(function(err){
        req.flash("error_msg", "Houve um erro ao listar as categorias");
        res.redirect("/admin");
    });
})

router.post("/",(req,res)=>{
    const update={
            status: "entregar",
            entregador: req.body.entregador
        }
        console.log(req.body.entregador)
        Pedido.findOneAndUpdate({_id: req.body.id}, update,{new: true}).lean().then(function(){
            req.flash("success_msg","Categoria editada com sucesso!");
            res.redirect("/funcionarios")
        }).catch(function(err){
            req.flash("error_msg","Houve um erro ao editar a categoria, tente novamente!");
            res.redirect("/admin");
        })
   
})

router.post("/cancelar",(req,res)=>{
    const update={
            status: "cancelado",
            info: "Cancelado",
            motivo: req.body.motivo
        }
        Pedido.findOneAndUpdate({_id: req.body.id}, update,{new: true}).lean().then(function(){
            req.flash("success_msg","Categoria editada com sucesso!");
            res.redirect("/funcionarios")
        }).catch(function(err){
            req.flash("error_msg","Houve um erro ao editar a categoria, tente novamente!");
            res.redirect("/admin");
        })
   
})



router.get("/login",(req,res)=>{
    res.render('login-funcionarios.ejs')
})

router.post("/login",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        console.log("Deslogado com sucesso!")
        passport.authenticate("local",{
            successRedirect: "/funcionarios",
            failureRedirect: "/funcionarios/login",
            failureFlash: true
        })(req,res,next)
    })
    
})

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success_msg","Deslogado com sucesso!")
        res.redirect('/')
    })
    
})

module.exports = router