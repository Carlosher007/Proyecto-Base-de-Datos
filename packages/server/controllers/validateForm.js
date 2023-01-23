/** @format */
const {formSchemaLoginT,formSchemaRegistroT} = require("@project-mande/common");

const validateFormLoginT = (req, res) => {
  const formData = req.body;
  formSchemaLoginT
    .validate(formData)
    .catch((err) => {
      res.status(422).send();
      console.log(err.errors);
    })
    .then((valid) => {
      if (valid) {
        res.status(200).send();
        console.log('form is good');
      }
    });
};

const validateFormRegisterT = (req, res) => {
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
      }
    });
};

module.exports = validateFormLoginT, validateFormRegisterT;
