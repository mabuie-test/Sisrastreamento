// routes/userRoutes.js
const express = require('express');
const User    = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const tenantMiddleware = require('../middleware/tenantMiddleware');
const roleMiddleware   = require('../middleware/roleMiddleware');

const router = express.Router();

// Só admins podem listar utilizadores do seu tenant
router.get('/', authMiddleware, tenantMiddleware, roleMiddleware('admin'), async (req, res) => {
  const users = await User.find({ tenantId: req.user.tenantId }, 'username role');
  res.json(users);
});

// GET /api/users/:id — obter dados de um utilizador (para edição)
router.get('/:id', authMiddleware, tenantMiddleware, roleMiddleware('admin'), async (req, res) => {
  const user = await User.findOne({ _id: req.params.id, tenantId: req.user.tenantId }, 'username role');
  if (!user) return res.status(404).json({ error: 'Utilizador não encontrado' });
  res.json(user);
});

// PUT /api/users/:id — atualizar papel ou nome (não a password)
router.put('/:id', authMiddleware, tenantMiddleware, roleMiddleware('admin'), async (req, res) => {
  const { role } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.user.tenantId },
    { role },
    { new: true }
  );
  if (!user) return res.status(404).json({ error: 'Utilizador não encontrado' });
  res.json(user);
});

module.exports = router;
