const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");

const getBreedByNameApi = async (name) => {
  const { data } = await axios(
    `https://api.thedogapi.com/v1/breeds/search?q=${name}`
  );

  let dogApi = data.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      temperament: dog.temperament,
      image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
    };
  });

  if (!name) throw new Error("No existen perros");

  return dogApi;
};

const getBreedByNameDb = async (name) => {
  const data = await Dog.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: Temperament,
  });

  if (!data) return [];

  const allDogsByName = data.map((dog) => {
    return {
      id: dog.dataValues.id,
      name: dog.dataValues.name,
      height: dog.dataValues.height,
      weight: { metric: dog.dataValues.weight },
      life_span: dog.dataValues.life_span,
      temperament:
        dog.dataValues.temperaments &&
        dog.dataValues.temperaments.map((e) => e.name).join(", "),
      image: dog.dataValues.image,
    };
  });

  return allDogsByName;
};
module.exports = { getBreedByNameApi, getBreedByNameDb };
