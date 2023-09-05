const axios = require("axios");
const { Temperament } = require("../db");
const auxObtenerTemp = require("../util/auxObtenerTemp");

module.exports = async () => {
  const mostrarTemperamentos = await Temperament.findAll();

  if (mostrarTemperamentos.length === 0) {
    const { data } = await axios(`https://api.thedogapi.com/v1/breeds`);
    let temperamentos = auxObtenerTemp(data);

    for (const temp of temperamentos) {
      //console.log(temp);
      await Temperament.findOrCreate({
        where: {
          name: temp,
        },
      });
    }
  }

  return mostrarTemperamentos;
};
