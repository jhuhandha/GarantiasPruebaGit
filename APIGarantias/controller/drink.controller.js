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

const index = async (req, res) => {
  try {
    let drinks = await Drink.findAll();
    res.json({
      status: true,
      data: drinks,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

const showImage = (req, res) => {
  let ruta = path.join(__dirname, './../uploads/drinks/', req.params.image);
  return res.sendFile(ruta);
};

const edit = (req, res) => {
  Drink.findByPk(req.params.id)
    .then((drinks) =>
      res.json({
        status: true,
        data: drinks,
      })
    )
    .catch((err) =>
      res.status(500).json({
        status: false,
        error: err.message,
      })
    );
};

const updateImage = (req, callback) => {
  let data = {
    name: req.body.name,
    unit_price: req.body.unit_price,
  };

  if (req.files) {
    Drink.findByPk (req.params.id).then (drink => {
      console.log (drink);
      fs.unlinkSync (`uploads/drinks/${drink.icon}`);

      let image = req.files.image;
      image.mv (`uploads/drinks/${image.name}`, err => {
        if (err) return res.status (500).send (err);
        callback ({...data, icon: image.name});
      });
    });
  } else {
    callback (data);
  }
};

const modify = (req, res) => {
  const errors = validationResult (req);
  if (!errors.isEmpty ()) {
    return res.status (422).json ({status : false, error: errors.array ()});
  }

  updateImage (req, data => {
    Drink.update (data, {
      where: {
        id: req.params.id,
      },
    })
      .then (result =>
        res.json ({
          status: true,
          data: result,
        })
      )
      .catch (err =>
        res.status (500).json ({
          status: false,
          error: err,
        })
      );
  });
};

module.exports = {
  create,
  index,
  showImage,
  edit,
  modify
};


//http://localhost:3000/api/drink/show/juice.jpg?Authorization=klsdds