const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

exports.register = async (req, res) => {
  const { username, password, role, tenantId } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash: hash, role, tenantId });
  res.status(201).json({ id: user._id, username: user.username });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.passwordHash))
    return res.status(401).json({ error: 'Credenciais inválidas' });

  const token = jwt.sign(
    { userId: user._id, tenantId: user.tenantId, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRES_IN }
  );
  res.json({ token });
};
