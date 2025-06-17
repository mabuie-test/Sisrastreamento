// routes/bootstrap.js
const express = require('express');
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');

const router = express.Router();

/**
 * POST /bootstrap?secret=...
 * Body JSON: { username: string, password: string }
 *
 * Cria o primeiro super-admin se ainda não existir nenhum.
 */
router.post('/', async (req, res) => {
  try {
    // 1. Verifica segredo de bootstrap
    const secret = req.query.secret;
    if (!secret || secret !== process.env.BOOTSTRAP_SECRET) {
      return res.status(403).json({ error: 'Acesso proibido' });
    }

    // 2. Verifica existência de super-admin
    const count = await User.countDocuments({ role: 'super-admin' });
    if (count > 0) {
      return res.status(409).json({ error: 'Já existe um super‑admin' });
    }

    // 3. Validação mínima dos dados
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username e password são obrigatórios' });
    }

    // 4. Criptografa a password e cria o utilizador
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      passwordHash: hash,
      role: 'super-admin',
      tenantId: null
    });

    return res.status(201).json({
      message: 'Super‑admin criado com sucesso',
      user: { id: user._id, username: user.username }
    });
  } catch (err) {
    console.error('Erro no bootstrap:', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

module.exports = router;
