const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  tenantId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', default: null },
  username:     { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role:         { type: String, enum: ['super-admin','admin','user'], default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);
