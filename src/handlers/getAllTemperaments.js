const getAllTemperamentsController = require("../controllers/getAllTemperamentsController");

module.exports = async (req, res) => {
  try {
    const mostrarTemperamentos = await getAllTemperamentsController();
    res.status(200).json(mostrarTemperamentos);
  } catch (error) {
    res.status(404).send(error.message);
  }
};
