const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, '../public/uploads/images');
    // directory name where we save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
