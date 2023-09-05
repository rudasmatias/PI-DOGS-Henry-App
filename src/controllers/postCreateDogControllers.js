const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");

module.exports = async ({
  name,
  image,
  height,
  weight,
  life_span,
  temperaments,
}) => {
  //Creo perro en la tabla Dog
  const newBreed = await Dog.create({
    image,
    name,
    height,
    weight,
    life_span,
  });

  //Recorro el array que envíe por body (donde estan uno o varios temperamentos, por array)
  for (const temperamento of temperaments) {
    const temperamentoEncontrado = await Temperament.findOne({
      where: {
        name: {
          [Op.iLike]: temperamento,
        },
      },
    });

    if (temperamentoEncontrado) {
      await newBreed.addTemperament(temperamentoEncontrado);
    } else {
      const nuevoTemperamento = await Temperament.create({
        name: temperamento,
      });
      await newBreed.addTemperament(nuevoTemperamento);
    }
  }
  return newBreed;
};
