// Importando as bibliotecas

const express = require('express'); // Define que vou acionar a biblioteca do express.
const axios = require('axios'); // Define que vai acionar a biblioteca do axios.

const app = express(); // Vai definir qual o servidor
const PORT = 3000; // Especifica a porta do servidor

// Endpoint para buscar o endereço pelo CEP

app.get('/cep/:cep', async (req, res) =>{
        
    const { cep } = req.params;

    try{
        // Fazendo requisição para a API ViaCEP

        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = response.data;

        // Se o CEP não for encontrado
        if(endereco.erro){
            return res.status(404).json({mensagem: 'CEP não encontrado'});
        }

        // Retorna o endereço formatado

        res.json(
            {
                cep: endereco.cep,
                logradouro: endereco.logradouro,
                bairro: endereco.bairro,
                cidade: endereco.localidade,
                estado: endereco.uf
            })
    }catch(error){
        res.status(500).json({mensagem: 'Erro ao consultar o CEP'});
    }
});

// Iniciando o servidor

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})