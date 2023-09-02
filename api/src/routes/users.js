var express = require("express");
var router = express.Router();
const { signupUser, loginUser, protectedUser,loginGoogleUser } = require("../controllers/index");
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage })


// Endpoint para crear un usuario
router.post("/signup",upload.single("file"), signupUser);

// Endpoint para iniciar sesión y obtener un token JWT
router.post("/login", loginUser);
router.post("/loginGoogle", loginGoogleUser)

// Endpoint protegido que solo puede ser accedido con un token JWT válido
router.get("/protected", protectedUser);

module.exports = router;
