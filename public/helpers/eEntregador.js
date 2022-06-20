
module.exports = {
    eEntregador: function(req,res,next){
        if(req.isAuthenticated() && req.user.tier == 2){
            return next()
        }else{
            console.log("Vc precisa ser entregador")
            res.redirect("/entregadores/login")
        }
    }
}
