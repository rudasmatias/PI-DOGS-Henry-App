const {
  getBreedByNameApi,
  getBreedByNameDb,
} = require("../controllers/getBreedByNameController");

module.exports = async (req, res) => {
  const { name } = req.query;
  try {
    const dogsByNameApi = await getBreedByNameApi(name);
    const dogsByNameDb = await getBreedByNameDb(name);
    if (dogsByNameApi.length === 0 && dogsByNameDb.length === 0) {
      throw Error("No existen perros con ese nombre");
    } else {
      const dogs = [...dogsByNameApi, ...dogsByNameDb];
      return res.status(200).json(dogs);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
