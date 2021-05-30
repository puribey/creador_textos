import multer from "multer";
import { crearErrorDatosInvalidos } from "../negocio/errores/ErrorDatosInvalidos.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const extname = filetypes.test(file.originalname.split(".")[1]);
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Pdf Only!");
    }
  },
}).single("demo");

const fileUpload = (req, res, next) => {
  if (!req.body.tienePdf) {
    next();
  }
  try {
    upload(req, res);

    if (req.file == undefined) {
      throw crearErrorDatosInvalidos("falta adjuntar pdf");
    }

    req.pdfName = req.file.originalname;
    next();
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      throw crearErrorDatosInvalidos(
        "el archivo adjunto debe pesar menos de 5MB"
      );
    }

    next(err);
  }
};

export default fileUpload;
