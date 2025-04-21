require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/cadaster', async (req, res) => {
  const { nome, email, senha, tipo_user } = req.body;
  try {
    await pool.query('INSERT INTO users (nome, email, senha, tipo_user) VALUES ($1, $2, $3, $4)', [nome, email, senha, tipo_user]);
    res.status(201).send('Usuário criado!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/login', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE ( nome = $1 OR email = $2 ) AND senha = $3',
      [nome, email, senha]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});