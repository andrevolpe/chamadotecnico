const express = require('express');

const server = express();

server.use(express.json());

const chamados = [
    { os: 1234, titulo: 'impressora com defeito', encerrado: true},
    { os: 1235, titulo: 'computador nao liga', encerrado: false} 
]

server.get('/chamado', function(request, response) {
    response.json(chamados);
})

server.post('/chamado', function(request, response) {

    const {os, titulo, encerrado} = request.body;
    chamados.push({os, titulo, encerrado});
    response.status(204).send();
})

server.put('/chamado/:id', function(request, response) { 
    const id = request.params.id;
    const {os, titulo, encerrado} = request.body;

    for(let i = 0; i < chamados.length; i++) {
        if(chamados[i].os == id) {
            chamados[i].titulo = titulo;
            chamados[i].encerrado = encerrado;
            break;
        }
    }

    return response.status(204).send();
})

server.delete('/chamado/:id', function(request, response) {

    const id = request.params.id;

    for(let i = 0; i < chamados.length; i++) {
        if(chamados[i].os == id) {
            chamados.splice(i, 1);
            break;
        }
    }

    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);