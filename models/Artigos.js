const mongoose = require('mongoose'); 

const Artigos = new mongoose.Schema({
       titulo:{
           type: String, 
           required: true
       },
       conteudo:{
           type:String, 
           required: true 
       }

},

// create update no banco
{
   timestamps: true,
});

mongoose.model('artigo', Artigos);