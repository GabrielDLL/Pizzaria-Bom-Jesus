
module.exports = {
    eCliente: function(req,res,next){
        if(req.isAuthenticated() && req.user.tier == 0){
            return next()
        }else{
            console.log("Vc precisa ser cliente")
            res.redirect("/clientes/login")
        }
    }
}
