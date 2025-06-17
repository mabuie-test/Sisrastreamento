const Device = require('../models/Device');

exports.createDevice = async (req, res) => {
  const { imei, label } = req.body;
  const device = await Device.create({
    tenantId: req.tenantId, imei, label
  });
  res.status(201).json(device);
};

exports.listDevices = async (req, res) => {
  const devices = await Device.find({ tenantId: req.tenantId });
  res.json(devices);
};
