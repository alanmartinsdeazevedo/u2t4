const express = require('express');

const app = express();
app.use(express.json());

let produtos = [];


function adicionarProduto(produto) {
    if (!produto) {
        throw new Error('Formato inválido');
    } else {
        produtos.push(produto);
    } 
}

function lerProdutos() {
    return produtos
}

function lerProduto (id) {
    return produtos[id]
}

function deletarProduto (id) {

    if (id < 0 || id >= produtos.length) {
        throw new Error('ID inválido');
    } else {
        produtos.splice(id, 1);
    }
}

function atualizarProduto (id, novoProduto) {
    if (!novoProduto) {
        throw new Error('Formato inválido');
    } else {
        produtos[id] = novoProduto;
    }
}

//POST /products: Criar um novo produto.
app.post('/products', async (req, res) => {
    if (!req.body || !req.body.produto) {
        return res.status(400).json({ message: 'Requisição inválida' });
    }
    try {
        adicionarProduto(req.body.produto);
        res.status(201).json({ message: 'O produto foi adicionado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar o produto' });
    }
});

//GET /products: Listar todos os produtos.
app.get('/products', async (req, res) => {
    res.json(lerProdutos());
});

//GET /products/:id: Obter um produto específico por ID.
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    res.json(lerProduto(id));
});

//PUT /products/:id: Atualizar um produto existente por ID.
app.put('/produtos/:id', async (req, res) => {
    const id = req.params.id;
    const novoProduto = req.body.produto;
    if (!novoProduto || !novoProduto.nome || !novoProduto.preco) {
        return res.status(400).json({ message: 'Requisição inválida' });
    }
    atualizarProduto(id, novoProduto);
    res.json({ message: 'Produto foi atualizado' });
});

//DELETE /products/:id: Deletar um produto por ID.
app.delete('/produtos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        deletarProduto(id);
        res.json({ message: 'Produto foi excluído' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = {
    adicionarProduto,
    lerProdutos,
    lerProduto,
    atualizarProduto,
    deletarProduto
}

app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));