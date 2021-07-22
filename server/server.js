
const express = require("express");
const app = express();
const cors = require("cors");
// This will fire our mongoose.connect statement to initialize our database connection
require("./configs/mongoose.config");

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors());

// This is where we import the users routes function from our user.routes.js file
const AllPlayerRoutes = require("./routes/players.routes");
AllPlayerRoutes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
