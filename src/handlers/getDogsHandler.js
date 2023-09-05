const { findDogsApi, findDogsBd } = require("../controllers/getDogsController");

module.exports = async (req, res) => {
  try {
    const data = await findDogsApi();
    const dogsBd = await findDogsBd();
    const allDogs = [...data, ...dogsBd];
    res.status(200).send(allDogs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
