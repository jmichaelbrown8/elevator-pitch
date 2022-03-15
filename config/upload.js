const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const { space_id, idea_id } = req.params;
    const myPath = path.join(__dirname, `../uploads/${space_id}/${idea_id}/`);
    fs.mkdir(myPath, { recursive: true }, () => {
      callBack(null, myPath);
    });
    // directory name where we save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const filefilter = (req, file, cb) => {
  if (!file) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filefilter,
});

module.exports = upload;
