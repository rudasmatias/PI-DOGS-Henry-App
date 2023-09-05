const { Router } = require("express");
const getDogsHandler = require("../handlers/getDogsHandler");
const getBreedByIdHandler = require("../handlers/getBreedByIdHandler");
const getBreedByNameHandler = require("../handlers/getBreedByNameHandler");
const createBreedByHandler = require("../handlers/postCreateBreedByHandler");
const getAllTemperaments = require("../handlers/getAllTemperaments");
const axios = require("axios");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/dogs", getDogsHandler);
router.get("/dogs/name", getBreedByNameHandler);
router.get("/dogs/:id", getBreedByIdHandler);
router.post("/dogs", createBreedByHandler);
router.get("/temperaments", getAllTemperaments);

module.exports = router;
