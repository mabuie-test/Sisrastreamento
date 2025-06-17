const Track  = require('../models/Track');
const Device = require('../models/Device');

exports.createTrack = async (req, res) => {
  const { imei, lat, lng } = req.query;
  const device = await Device.findOne({ imei });
  if (!device) return res.status(404).json({ error: 'Dispositivo não encontrado' });

  const track = await Track.create({
    tenantId: device.tenantId,
    device:   device._id,
    latitude: parseFloat(lat),
    longitude: parseFloat(lng)
  });
  res.status(201).json(track);
};

exports.getHistory = async (req, res) => {
  const { deviceId } = req.query;
  const history = await Track.find({
    tenantId: req.tenantId,
    device:   deviceId
  })
  .sort({ timestamp: -1 })
  .limit(100);
  res.json(history);
};
