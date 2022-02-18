const express = require("express");


const expressLayouts = require("express-ejs-layouts");
const userRouter = require("./controllers/users")

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")
app.set("views", `${__dirname}/views`);
app.set("layout", "layouts/layout")
app.use(expressLayouts);

app.use("/users", userRouter);


app.listen(3000, () => {
    console.log("server up and running on port 3000");
})