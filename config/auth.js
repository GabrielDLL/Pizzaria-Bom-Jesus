const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

require("../public/models/Usuario")
const Usuario = mongoose.model("usuarios")

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'usuario', passwordField: 'senha'},(usuario,senha,done)=>{
        Usuario.findOne(({usuario: usuario})).lean().then((usuario)=>{
            if(!usuario){
                return done(null,false,{message: "Esta conta não existe"})
            }else
            
            bcrypt.compare(senha, usuario.senha,(erro,batem)=>{
                if(batem){
                    return done(null,usuario)
                }
                else
                {
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        })
    }))
        passport.serializeUser((usuario, done)=>{
            done(null,usuario)
        })
    
        passport.deserializeUser((id,done)=>{
            Usuario.findById(id, (err,usuario)=>{
                done(err, usuario)
            })
        
        })


}