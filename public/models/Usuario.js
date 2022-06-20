const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome:{
        type: String,
        required: true
    },
    usuario:{
        type: String,
        required: true
    },
    tier:{
        //0 - cliente
        //1 - funcionario
        //2 - entregador
        default:0,
        type: Number,
        required: true
    },
    senha:{
        type: String,
        required: true
    }
})

mongoose.model("usuarios", Usuario)