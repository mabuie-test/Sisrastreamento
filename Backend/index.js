require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const connectDB = require('./config/db');
const allRoutes = require('./routes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_, res) => res.sendStatus(200));

// Monta todas as rotas em /api
app.use('/api', allRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);
