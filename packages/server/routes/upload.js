const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  }
});


const multerT = multer({
  storage,
  dest: './uploads',
}).fields([{name: 'doc_foto', maxCount: 1}, {name: 'foto_perfil', maxCount: 1}])

const multerC = multer({
  storage,
  dest: './uploads',
}).fields([
  { name: 'recibo', maxCount: 1 },
]);

const upload = multer({ storage: storage });   
exports.upload = upload.single('myFile')

exports.multerT = multerT
exports.multerC = multerC

exports.uploadFile = (req, res) => {
  console.log('Ruta doc_foto:', req.files.doc_foto[0].filename);
  console.log(req.body.oy)
  res.send({data: 'Enivar u archivo'})
}