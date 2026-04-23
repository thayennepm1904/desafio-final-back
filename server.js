
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');


const app = express();

app.use(cors());
app.use(express.json());


let desaparecidos = [];


app.get('/', (req, res) => {
  res.send('FUNCIONANDO AGORA');
});


app.post('/desaparecidos', (req, res) => {
  const {
    nome,
    idade,
    cidade,
    descricao,
    foto,
    ultimaLocalizacao,
    roupa
  } = req.body;

  if (!nome || !cidade) {
    return res.status(400).json({
      erro: 'Nome e cidade são obrigatórios'
    });
  }

  const novo = {
    id: uuidv4(),
    nome,
    idade,
    cidade,
    descricao,
    foto,
    ultimaLocalizacao,
    roupa,
    status: 'desaparecido',
    criadoEm: new Date()
  };

  desaparecidos.push(novo);

  res.status(201).json(novo);
});


app.get('/desaparecidos', (req, res) => {
  const { nome, cidade } = req.query;

  let resultado = desaparecidos;

  if (nome) {
    resultado = resultado.filter(d =>
      d.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  if (cidade) {
    resultado = resultado.filter(d =>
      d.cidade.toLowerCase().includes(cidade.toLowerCase())
    );
  }

  res.json(resultado);
});


app.get('/desaparecidos/:id', (req, res) => {
  const item = desaparecidos.find(d => d.id === req.params.id);

  if (!item) {
    return res.status(404).json({
      erro: 'Não encontrado'
    });
  }

  res.json(item);
});


app.put('/desaparecidos/:id', (req, res) => {
  const item = desaparecidos.find(d => d.id === req.params.id);

  if (!item) {
    return res.status(404).json({
      erro: 'Não encontrado'
    });
  }

  const {
    nome,
    idade,
    cidade,
    descricao,
    foto,
    ultimaLocalizacao,
    roupa,
    status
  } = req.body;

  if (nome) item.nome = nome;
  if (idade) item.idade = idade;
  if (cidade) item.cidade = cidade;
  if (descricao) item.descricao = descricao;
  if (foto) item.foto = foto;
  if (ultimaLocalizacao) item.ultimaLocalizacao = ultimaLocalizacao;
  if (roupa) item.roupa = roupa;
  if (status) item.status = status;

  res.json(item);
});


app.delete('/desaparecidos/:id', (req, res) => {
  const index = desaparecidos.findIndex(d => d.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      erro: 'Não encontrado'
    });
  }

  desaparecidos.splice(index, 1);

  res.json({
    mensagem: 'Removido com sucesso'
  });
});


app.get('/popular', (req, res) => {
  desaparecidos = []; 

  const dados = [
    { nome: "Maria Souza", cidade: "Duque de Caxias" },
    { nome: "Carlos Pereira", cidade: "Rio de Janeiro" },
    { nome: "Ana Lima", cidade: "Nova Iguaçu" },
    { nome: "João Batista", cidade: "São João de Meriti" },
    { nome: "Fernanda Alves", cidade: "Belford Roxo" },
    { nome: "Ricardo Gomes", cidade: "Nilópolis" },
    { nome: "Juliana Rocha", cidade: "Mesquita" },
    { nome: "Paulo Henrique", cidade: "Queimados" }
  ];

  dados.forEach(p => {
    desaparecidos.push({
      id: uuidv4(),
      ...p,
      status: 'desaparecido',
      criadoEm: new Date()
    });
  });

  res.json({ mensagem: "8 pessoas criadas com sucesso" });
});


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});