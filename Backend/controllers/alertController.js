const Alert  = require('../models/Alert');
const Device = require('../models/Device');

exports.handleAlert = async (req, res) => {
  const { imei, code } = req.query;
  const device = await Device.findOne({ imei });
  if (!device) return res.status(404).json({ error: 'Dispositivo não encontrado' });

  // registra alerta
  await Alert.create({
    tenantId: device.tenantId,
    device:   device._id,
    type:     code
  });

  // atualiza status de bloqueio
  if (code === 'GEOFENCE_OUT') device.status = 'blocked';
  if (code === 'GEOFENCE_IN')  device.status = 'active';
  await device.save();

  res.sendStatus(200);
};
