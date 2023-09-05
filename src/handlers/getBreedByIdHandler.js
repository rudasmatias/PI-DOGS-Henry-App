const {
  getBreedByIdApi,
  getBreedByIdDb,
} = require("../controllers/getBreedByIdController");

module.exports = async (req, res) => {
  const { id } = req.params;
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  try {
    if (Number(id)) {
      const breedApi = await getBreedByIdApi(id);
      return res.status(200).json(breedApi);
    } else if (regexExp.test(id)) {
      const breedbs = await getBreedByIdDb(id);
      res.status(200).json(breedbs);
    } else {
      throw Error("No existe perros con ese id");
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
};
