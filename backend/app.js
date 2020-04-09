const  express =  require('express');
const  mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

var cors = require('cors')

const app = express();
const router = express.Router();


mongoose.connect(
  "mongodb+srv://Admin:Admin@123@cluster0-uwias.mongodb.net/covid?retryWrites=true&w=majority",  { useNewUrlParser: true })
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000}));

app.use(cors());
// app.use( (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");


//   next();
// });

app.use("/user", userRoutes);

module.exports = app;
