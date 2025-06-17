const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  tenantId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  device:    { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  latitude:  Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', TrackSchema);
