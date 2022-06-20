
module.exports = {
    eFuncionario: function(req,res,next){
        if(req.isAuthenticated() && req.user.tier == 1){
            return next()
        }else{
            console.log("Vc precisa ser funcionario")
            res.redirect("/funcionarios/login")
        }
    }
}
