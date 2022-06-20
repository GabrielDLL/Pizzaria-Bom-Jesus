const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const path = require('path')
const {eEntregador} = require("../helpers/eEntregador")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
require("../models/Pedido")
const Pedido = mongoose.model("pedidos")
const passport = require("passport")
const eFuncionario = require("../helpers/eFuncionario")

router.get("/",eEntregador,(req,res)=>{
    Pedido.find({entregador: req.user._id}).sort({date: 1}).lean().then(function(pedidos){
        res.render("area-entregadores", {pedidos: pedidos})
    }).catch(function(err){
        req.flash("error_msg", "Houve um erro ao listar as categorias");
        res.redirect("/admin");
    });
})

router.post("/",(req,res)=>{
    const update={
            status: "entregue",
            info: "Entregue"
        }
        Pedido.findOneAndUpdate({_id: req.body.id}, update,{new: true}).lean().then(function(){
            req.flash("success_msg","Categoria editada com sucesso!");
            res.redirect("/entregadores")
        }).catch(function(err){
            req.flash("error_msg","Houve um erro ao editar a categoria, tente novamente!");
            res.redirect("/admin");
        })
   
})




router.get("/login",(req,res)=>{
    res.render('login-entregadores.ejs')
})

router.post("/login",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        console.log("Deslogado com sucesso!")
        passport.authenticate("local",{
            successRedirect: "/entregadores",
            failureRedirect: "/entregadores/login",
            failureFlash: true
        })(req,res,next)
    })
    
})

router.get("/logout",eEntregador,(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success_msg","Deslogado com sucesso!")
        res.redirect('/')
    })
    
})


module.exports = router