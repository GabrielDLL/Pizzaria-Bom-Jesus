if(process.env.NODE_ENV == "production"){
   module.exports = {mongoURI: "mongodb+srv://gabriel:Verde88@cluster0.718qi.mongodb.net/?retryWrites=true&w=majority"}
}else{
    module.exports = {mongoURI: "mongodb://localhost/pizzaria"}
}