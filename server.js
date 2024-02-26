const express = require('express'); //chama o express
const app = express() //isntancia ele

const data = require("./data.json"); //dados fake, em uma aplicação real provavelmente seria o bdd


app.use(express.json());//use a notação json

//com express 
//req - request
//res - response

app.get('/clients', function(req, res){// /clients é o endpoint
    res.json(data); //retorna todos os clientes
}); 

app.get('/clients/:id', function(req, res){
    const { id } = req.params; //parametro da requisição
    const client = data.find(cli => cli.id = id);

    if (!client) return res.status(204).json(); //conteudo n foi encontrado
    res.json(client);
}); 

app.post('/clients/:id',function(req, res){ //id é parametro p pegar apenas um cliente
    //salvar um client novo
    const {name, email} = req.body;

    //lógica de salvamento vai aqui

    res.json ({name, email});
});

app.put('/clients/:id', function(req, res){
    //atualizar
    const { id } = req.params; 
    const client = data.find(cli => cli.id = id);

    if (!client) return res.status(204).json(); //conteudo n foi encontrado

    const {name} = req.body;
    client.name = name;

    res.json(client);

});

app.delete('/clients/:id',function(req, res){
    const { id } = req.params; 

    const clientsFiltered = data.filter(client => client.id != id); //tira da minha lista

    res.json(clientsFiltered);
});


app.listen(3000, function() { //start no servidor na porta 300 com função callback
    console.log('Server is running');
});