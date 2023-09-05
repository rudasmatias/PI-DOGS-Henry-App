module.exports = (data) => {
  let guarderia = [];
  for (const perro of data) {
    let temperamentos = perro.temperament;
    if (temperamentos) {
      guarderia.push(temperamentos.split(", "));
    }
  }
  guarderia = guarderia.flat();

  let obj = {};
  for (elemento of guarderia) {
    if (!obj[elemento]) {
      obj[elemento] = 1;
    } else {
      obj[elemento]++;
    }
  }

  return Object.keys(obj);
};
