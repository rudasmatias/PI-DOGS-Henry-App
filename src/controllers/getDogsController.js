const axios = require("axios");
const { Dog, Temperament } = require("../db");

const findDogsApi = async () => {
  const { data } = await axios("https://api.thedogapi.com/v1/breeds");

  let dogApi = data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperament: dog.temperament && dog.temperament,
      image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
    };
  });

  return dogApi;
};

const findDogsBd = async () => {
  const data = await Dog.findAll({
    include: Temperament,
  });

  const dogsBs = data.map((perro) => {
    return {
      id: perro.id,
      name: perro.name,
      height: perro.height,
      weight: { metric: perro.weight },
      life_span: perro.life_span,
      temperament: perro.dataValues.temperaments.map((e) => e.name).join(", "),
      image: perro.image,
    };
  });

  return dogsBs;
};

module.exports = {
  findDogsApi,
  findDogsBd,
};
