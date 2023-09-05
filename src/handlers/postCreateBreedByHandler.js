const postCreateDogController = require("../controllers/postCreateDogControllers");

module.exports = async (req, res) => {
  const props = req.body;
  try {
    const newDog = await postCreateDogController(props);
    res.status(200).json(newDog);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
