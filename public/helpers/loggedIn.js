
module.exports = {
    loggedIn: function(req,res,next){
        if(req.user){
            return next()
        }else{
            req.route.path = req.route.path.split('/').join('')
            if(req.route.path == "pedido")
                {
                    req.route.path = "clientes"
                }
            res.redirect(`/${req.route.path}/login`)
        }
    },
}