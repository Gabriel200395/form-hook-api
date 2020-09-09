const express = require('express'); 
const mongoose =  require('mongoose');
const cors = require('cors');

require("./models/Artigos"); 
const Artigos = mongoose.model('artigo');

const app = express(); 

app.use(express.json());

//Middleware para acessar as urls e da permissão
app.use((req, res, next) => {
    console.log("acessou o middleware!");
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
});

// conectar com banco
mongoose.connect('mongodb://localhost/celke', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    console.log("conexão com sucesso ao banco de dados do mongo");
}).catch((erro)=>{
    console.log("conexão não realizada com sucesso ao banco de dados do mongo");
});


app.get("/artigo", (req, res) => {
    /*res.send("como criar uma Api")*/  
    /*return res.json({titulo:" como criar api"});*/    

    //Listar  artigos 
    Artigos.find({}).then((artigo) =>{
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message:"nenhum artigo encontrado!"
        })
    })

}); 

// listando os id do banco
app.get("/artigo/:id", (req, res) => {
         
        /*console.log(req.params.id);
        return res.json({id: req.params.id})*/ 

   Artigos.findOne({_id:req.params.id}).then((artigo) => {
       return res.json(artigo);
   }).catch((error) => {
         res.status(400).json({
            error: true, 
            message:"nenhum artigo encontado!"
         })  
     })      
}); 


// fazer Post No Banco
app.post("/artigo", (req, res) => {

    const artigo = Artigos.create(req.body, (err) => {
     if(err) return res.status(400).json({
       error: true,
       message: "Error Artigo não foi cadastrado com sucesso!"
     })  

     return res.status(200).json({
        error: false,
        message: "Artigo cadastratado"
     })
   });
});


// delete Params id

app.delete("/artigo/:id", (req, res) => {
     const artigo = Artigos.deleteOne({_id:req.params.id} , (err) => {
         if(err) return res.status(400).json({
           error: true,
           message:"Error: Artigo não foi apagado com sucesso"
         }) 
         return res.json({
            error: false,
            message:"Artigo apagado com sucesso"   
         })
     }) 
});

app.listen(8080, () => {
    console.log("servidor rodando na porta 8080: http://localhost:8080/")
});

