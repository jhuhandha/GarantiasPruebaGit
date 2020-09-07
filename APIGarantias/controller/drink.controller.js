const {Drink} = require('./../model');
const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs');

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      error: errors,
    });
  }

  if (!req.files) {
    return res.status(422).json({
      status: false,
      error: 'La imagen es requerida',
    });
  }

  let {body} = req;
  let {image} = req.files;
  try {
    await image.mv(`upload/drinks/${image.name}`);
    let drink = await Drink.create({
      name: body.name,
      icon: image.name,
      unit_price: body.unit_price,
    });
    return res.status(200).json({
      status: true,
      data: drink.toJSON(),
    });
  } catch (ex) {
    return res.status(500).json({
      status: false,
      error: ex.message,
    });
  }
};

module.exports = {
  create,
};
