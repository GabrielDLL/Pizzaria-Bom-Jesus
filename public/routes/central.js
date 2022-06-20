const express = require("express")
const router = express.Router()
const path = require('path')
const {loggedIn} = require("../helpers/loggedIn")
const {eCliente} = require("../helpers/eCliente")
const {eFuncionario} = require("../helpers/eFuncionario")
const {eEntregador} = require("../helpers/eEntregador")

router.get("/",(req,res)=>{
    res.render('index');
})




module.exports = router