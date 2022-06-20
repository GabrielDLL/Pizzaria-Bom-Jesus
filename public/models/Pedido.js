const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Pedido = new Schema({
    pizza:{
        type: String,
        required: true
    },
    qtd:{
        type: String,
        required: true
    },
    endereco:{
        type: String,
        required: true
    },
    status:{
        type: String,
        // pendente | cancelado | entregar | entregue
        default: "pendente",
        required: true
    },
    info:{
        type: String,
        // Pendente | Entregue | Cancelado
        default: "Pendente",
        required: true
    },
    motivo:{
        type: String,
        default:" ",
        required:true
    },
    cliente:{
        type: Schema.ObjectId,
         required: true
    },
    nome:{
        type: String,
        default:"Sem nome",
        required: true
    },
    entregador:{
        type: Schema.ObjectId,
        required: false
    },
    data:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("pedidos", Pedido)