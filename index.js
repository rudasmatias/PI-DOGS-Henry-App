require("dotenv").config();

const app = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = process.env;

app.listen(PORT, async () => {
  await conn.sync({ force: false });
  console.log("listening at", PORT);
});
