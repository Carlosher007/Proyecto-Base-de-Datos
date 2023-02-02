/** @format */
const {
  formSchemaLoginT,
  formSchemaRegistroT,
  formSchemaRegistroC,
} = require('../common/index');

module.exports.validateFormLoginT = (req, res, next) => {
  const formData = req.body;
  formSchemaLoginT
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
    })
    .then((valid) => {
      if (valid) {
        console.log('form is good');
        next();
      } else {
        res.status(422).send();
      }
    });
};

module.exports.validateFormRegisterT = (req, res, next) => {
  console.log(req.body);
  const formData = req.body;
  formSchemaRegistroT
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        // res.status(200).send();
        console.log('form is good');
        next();
      } else {
        res.status(422).send();
      }
    });
};

module.exports.validateFormRegisterC = (req, res, next) => {
  console.log(req.body);
  const formData = req.body;
  formSchemaRegistroC
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        // res.status(200).send();
        console.log('form is good');
        next();
      } else {
        res.status(422).send();
      }
    });
};

// (module.exports = validateFormLoginT), validateFormRegisterT;
