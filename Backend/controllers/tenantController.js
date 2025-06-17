const Tenant = require('../models/Tenant');

exports.createTenant = async (req, res) => {
  const { name, contactEmail, plan } = req.body;
  const tenant = await Tenant.create({ name, contactEmail, plan });
  res.status(201).json(tenant);
};

exports.getTenants = async (req, res) => {
  const tenants = await Tenant.find();
  res.json(tenants);
};
