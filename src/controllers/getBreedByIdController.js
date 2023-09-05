const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getBreedByIdApi = async (id) => {
  const { data } = await axios(`https://api.thedogapi.com/v1/breeds/${id}`);

  if (Object.keys(data).length === 0)
    throw new Error("No existen perros con ese id");

  const breed = {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    life_span: data.life_span,
    image: `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`,
    temperaments: data.temperament,
  };
  return breed;
};

const getBreedByIdDb = async (id) => {
  const buscarBreed = await Dog.findByPk(id, {
    include: Temperament,
  });

  if (!buscarBreed) throw Error("No existen perro con ese id");

  const breed = {
    id: buscarBreed.id,
    name: buscarBreed.name,
    height: { metric: buscarBreed.height },
    weight: { metric: buscarBreed.weight },
    life_span: buscarBreed.life_span,
    image: buscarBreed.image,
    temperaments: buscarBreed.dataValues.temperaments
      .map((e) => e.name)
      .join(", "),
  };

  return breed;
};
module.exports = { getBreedByIdApi, getBreedByIdDb };
